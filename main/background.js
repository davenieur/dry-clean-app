

const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path'); 

var crypto = require('crypto')



const dbmgr = require("./helpers/database.js")
const db = dbmgr.db

const {printTicket} = require("./helpers/Tickets.js")

//GLOBAL Windows
let win;
let winlogin;


app.whenReady().then(createWindow)

const isProd = process.env.NODE_ENV === 'production'


// ------------
//    WINDOWS
// ------------
async function createWindow () {
  win = new BrowserWindow({
   
   fullscreen:true,
   maximize: true,
   titleBarStyle: 'hidden',
   titleBarOverlay: true,
   webPreferences: {
     //  nodeIntegration: true,
    // contextIsolation:true,
     devTools:true,
     
   preload:path.join(__dirname, 'preload-index.js')
   }

 })

  //win.loadFile(path.join(__dirname,'../FrontEnd/pages/notas/ver_notas.html'))
  // win.loadFile(path.join(__dirname,'../FrontEnd/index.html'))
  win.maximize(true)
  win.webContents.openDevTools();
  
  if (isProd) {
    await win.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await win.loadURL(`http://localhost:${port}/home`)
    win.webContents.openDevTools()
  }
}

function loginWindow () {
  winlogin = new BrowserWindow({
   width: 800,
   height: 600,
   webPreferences: {
    // nodeIntegration: true,
    // contextIsolation:true,
     devTools:true,
     preload:path.join(__dirname, 'preload-login.js')
     
   }
 })

//  winlogin.loadFile(path.join(__dirname,'../login.html'));
 winlogin.webContents.openDevTools();

}

// -------------------
//    APP EVENTS
//-------------------
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    db.close()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// --------------------------------
//            HANDLERS
//---------------------------------
ipcMain.handle('validate', (event, obj) => {
  validatelogin(obj)
});
ipcMain.handle('Sucursal:get_list', handleSucursalGetList)
ipcMain.handle('Sucursal:get_list_precios', handleSucursalGetListPrecios)
ipcMain.handle('Sucursal:update_list_precios', handleSucursalUpdateListPrecios)
ipcMain.handle('Sucursal:save_prenda', handlerSavePrendaPrecio)

ipcMain.handle('Notas:save_nota', handlerSaveNota)
ipcMain.handle('Notas:get_list_notas', handlerGetListNotas)
ipcMain.handle('Notas:imprimir_ticket', handlerPrintTicket)
ipcMain.handle('Notas:eliminar_nota',handlerDeleteNota)

// handlers Functions
function  validatelogin(obj) {
  const { email, password } = obj 
  // Connection
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));

  //Query
  let sql = `SELECT password  from Usuario u WHERE username = ? ;`;
  const row = db.prepare(sql).get(email);
  
  // Manage data
  if(row){
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if (row.password == hash){
      console.log('Success validation')
      createWindow ()
      win.show()
      winlogin.close()
    }else{
      winlogin.webContents.send('error',`password isn't correct`)
    }
  }else{
    winlogin.webContents.send('error',`Username doesn't exist`)
  }
}


function handleSucursalGetList() {
  // Connection
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));

    
  //Query
  let sql = `SELECT sucursal_id as id,nombre  from Sucursal ;`; 
  let data=db.prepare(sql).all();
  return data
}

function handleSucursalGetListPrecios(event,sucursal_id, registrado=false) {
  // Connection
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  let sql 
  
  //Query
  sql= `SELECT ${registrado?'lp.listas_precios_id':'p.prenda_id'} as id,p.nombre,p.tipo_servicio as servicio,lp.precio  FROM Prenda p
  ${registrado?'inner':'left'} join (
    SELECT listas_precios_id,prenda_id,sucursal_id,precio from Listas_Precios lp 
    WHERE prenda_id is not null
      and is_active is TRUE  
      and sucursal_id = ?
  ) lp
  on p.prenda_id =lp.prenda_id `; 

  let data=db.prepare(sql).all(sucursal_id);
  

  return data
}

function handleSucursalUpdateListPrecios(event,list_precios){
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  list_precios.forEach(obj_precio => {
    const {id_prenda,id_sucursal,precio} = obj_precio
    // checar que existe el elemento en la lista de precio
    
    let sql = `SELECT prenda_id,sucursal_id,precio from Listas_Precios lp 
                WHERE prenda_id = ? and sucursal_id =? and is_active is TRUE`; 
    let data=db.prepare(sql).get([id_prenda,id_sucursal]);
    
    // si existe, revisar si es un precio lleno o vacio
    if(data != null){
      // si cambio el precio, update and insert new precio
      if(precio.length > 0){
        if (data.precio != precio){ // Actualiza y agrega solo cuando cambia el precio
          // se desactiva el precio actual
          const queryUpdate=`UPDATE Listas_Precios 
          SET is_active = FALSE
          WHERE prenda_id = ? and sucursal_id = ?  `
          const resultUpd= db.prepare(queryUpdate).run(id_prenda,id_sucursal);
          
          // Se agrega el nuevo precio activo
          const queryInsertNew=`INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
                              VALUES (?,?,?)`
          const resultIn= db.prepare(queryInsertNew).run(id_prenda,id_sucursal,precio);
          
          console.log('UPDATE price',resultUpd,resultIn)
        }
        
      }else{
        // si no hay precio, desactivar solamente
        const queryUpdate=`UPDATE Listas_Precios 
                    SET is_active = FALSE
                    WHERE prenda_id = ? and sucursal_id = ?  `
        const resultUpd= db.prepare(queryUpdate).run(id_prenda,id_sucursal);
        console.log('UPDATE to false',resultUpd)
      }
    }else{
       //sino existe, revisar si tiene precio
      // si tiene precio -> insert precio
      if(precio.length > 0){
        
        const queryInsert=`INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
                      VALUES (?,?,?)`
        const result= db.prepare(queryInsert).run(id_prenda,id_sucursal,precio);
        
      }
    }
  });
  

}

function handlerSavePrendaPrecio(event,dataPrenda){
  console.log(dataPrenda)
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  const queryInsertNewPrenda=`INSERT INTO Prenda (nombre,tipo_servicio)
  VALUES (?,?);`
  const resultInPrenda= db.prepare(queryInsertNewPrenda).run(dataPrenda['nombre'],dataPrenda['tipo_servicio']);
  console.log('Prenda agregada... ',resultInPrenda)
  id_prenda=resultInPrenda.lastInsertRowid
  // Se agrega el nuevo precio activo
  const queryInsertNewLP=`INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
  VALUES (last_insert_rowid(),?,?)`
  const resultInLP= db.prepare(queryInsertNewLP).run(dataPrenda['id_sucursal'],dataPrenda['precio']);
  
  console.log('Prenda agregada en LP... ',resultInLP)
  return id_prenda
}

function handlerSaveNota(event,dataNota){
  
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  const {num_nota,cliente,id_sucursal,fecha_recepcion,fecha_entrega,prendas}=dataNota
  const num_nota_int=parseInt(num_nota)
  const id_sucursal_int=parseInt(id_sucursal)
  const FE_dia=parseInt(fecha_entrega.split('/')[0])
  const FE_mes=parseInt(fecha_entrega.split('/')[1])
  const FE_anio=parseInt(fecha_entrega.split('/')[2])
  const FE_date=FE_anio+'-'+FE_mes+'-'+FE_dia
  const FR_dia=parseInt(fecha_recepcion.split('/')[0])
  const FR_mes=parseInt(fecha_recepcion.split('/')[1])
  const FR_anio=parseInt(fecha_recepcion.split('/')[2])
  const FR_date=FR_anio+'-'+FR_mes+'-'+FR_dia
  let cliente_id
  if(Boolean(cliente)){
    const queryInsertCliente=`
    INSERT INTO cliente (nombre,sucursal_id,is_owner_sucursal)
    VALUES 	(?,?,False);
    `
    const cliente_info=db.prepare(queryInsertCliente).run(cliente,id_sucursal_int)
    cliente_id=cliente_info.lastInsertRowid
  }else{
    const queryGetCliente=`
    SELECT c.cliente_id  from cliente c
    where c.sucursal_id = ? and c.is_owner_sucursal = TRUE 
    limit 1;
    `
    const cliente_info=db.prepare(queryGetCliente).get(id_sucursal_int)
    cliente_id=cliente_info.cliente_id
  }
  console.log("cliente agregado... ",Boolean(cliente),cliente_id)
  // Obtener ids de prendas
  let reg_prendas=[]
  let precioTotal=0
  prendas.forEach(prenda_obj=>{
    let prenda_id
    if (prenda_obj.is_comodin){ //registro de prenda comodin
      const queryInsertPrendaComodin=`
      INSERT INTO Listas_Precios(prenda_id,sucursal_id,precio,nombre_comodin)
      Values		(null,?,?,?);`
      let prenda_comodin_res=db.prepare(queryInsertPrendaComodin).run(id_sucursal_int,parseInt(prenda_obj.precio),prenda_obj.prenda_id)
      prenda_id=prenda_comodin_res.lastInsertRowid

      precioTotal+=(parseInt(prenda_obj.precio)*prenda_obj.num_prendas)
    }else{ // La prenda ya está registrada, obtener id
      const queryGetListasPreciosId=`
        select l.listas_precios_id,l.precio  from Listas_Precios l
        WHERE l.prenda_id = ?
        and l.sucursal_id = ?
        and l.is_active  is TRUE
        limit 1;`
      let listas_precios_res=db.prepare(queryGetListasPreciosId).get(parseInt(prenda_obj.prenda_id),id_sucursal_int)
      prenda_id=listas_precios_res.listas_precios_id
      precioTotal+=(listas_precios_res.precio*prenda_obj.num_prendas)
    }
    for (let index = 0; index < prenda_obj.num_prendas; index++) { // agregamos el numero de prendas
      if(prenda_obj.colores[index]){
        reg_prendas.push({'prenda_listas_precios_id':prenda_id,'color':prenda_obj.colores[index]})
      }else{ // si no se registraron más colores, se utiliza el ultimo, las veces necesarias
        let last_id=prenda_obj.colores.length-1
        reg_prendas.push({'prenda_listas_precios_id':prenda_id,'color':prenda_obj.colores[last_id]})
      }
    }
  })
  console.log('Prendas registradas')
  console.log(reg_prendas)
  console.log('Precio total:',precioTotal)
  // Registro de Nota
  const queryInsertNewNota=`
  INSERT INTO Nota (num_nota,cliente_id,fecha_recepcion,fecha_entrega,precio_total)
    VALUES 	(?,?,?,?,?);`;

  const resPrenda= db.prepare(queryInsertNewNota).run(num_nota_int,cliente_id,FR_date,FE_date,precioTotal);
 
  const nota_id=resPrenda.lastInsertRowid;
  console.log("Nota_id",nota_id)
  // Registro de Nota_Ropa por prenda
  reg_prendas.forEach(prenda=>{
    const queryInsertNotaRopa=`
      INSERT INTO Nota_Ropa (nota_id,prenda_lista_precios_id,color,detalles)
      values	(?,?,?,null);`;
    db.prepare(queryInsertNotaRopa).run(nota_id,prenda.prenda_listas_precios_id,prenda.color);
  })
  
  return "success"
  


}


function handlerGetListNotas(event,dataNota){
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  const {sucursal_id,num_nota,cliente_name,fecha_desde,fecha_hasta}=dataNota
  const num_nota_int=parseInt(num_nota)
  const id_sucursal_int=parseInt(sucursal_id)
  console.log(sucursal_id,id_sucursal_int,Boolean(id_sucursal_int))

  //Query
  sql= `SELECT n.nota_id,n.num_nota,
          c.nombre as nombre_cliente,
          s.nombre  as nombre_sucursal,
          n.precio_total,
          n.fecha_registro,
          n.fecha_recepcion,
          n.fecha_entrega,
          lp.listas_precios_id as prenda_id ,
          ifnull(p.nombre,lp.nombre_comodin) as nombre_prenda,
          nr.color,
          p.tipo_servicio,
          lp.precio
        FROM Nota n 
        INNER JOIN Nota_Ropa nr 
        ON n.nota_id =nr.nota_id 
        INNER JOIN Listas_Precios lp 
        ON nr.prenda_lista_precios_id =lp.listas_precios_id 
        LEFT join Prenda p 
        ON lp.prenda_id =p.prenda_id
        LEFT JOIN Cliente c
        ON n.cliente_id =c.cliente_id
        LEFT JOIN Sucursal s 
        ON c.sucursal_id  =s.sucursal_id  
        WHERE TRUE `; 

  let bindParameters=[]
  if(id_sucursal_int){
    sql+=` AND s.sucursal_id = ? `;
    bindParameters.push(id_sucursal_int)
  }
  if(num_nota_int){
    sql+=` AND n.num_nota = ? `;
    bindParameters.push(num_nota_int)
  }
  if(cliente_name){
    sql+=` AND lower(c.nombre) like ? `;
    bindParameters.push('%'+cliente_name.toLowerCase()+'%')
  }
  if(fecha_desde){
    const Fecha_desde_dia=fecha_desde.split('/')[0]
    const Fecha_desde_mes=fecha_desde.split('/')[1]
    const Fecha_desde_anio=parseInt(fecha_desde.split('/')[2])
    const Fecha_desde_date=Fecha_desde_anio+'-'+Fecha_desde_mes+'-'+Fecha_desde_dia

    sql+=` AND fecha_registro  >= ? `;
    bindParameters.push(Fecha_desde_date)

  }
  if(fecha_hasta){
    const Fecha_hasta_dia=(parseInt(fecha_hasta.split('/')[0])+1).toString().padStart(2, '0')
    const Fecha_hasta_mes=fecha_hasta.split('/')[1]
    const Fecha_hasta_anio=parseInt(fecha_hasta.split('/')[2])
    const Fecha_hasta_date=Fecha_hasta_anio+'-'+Fecha_hasta_mes+'-'+Fecha_hasta_dia

    sql+=` AND fecha_registro  <= ? `;
    bindParameters.push(Fecha_hasta_date)
  }
  console.log(sql)
  console.log(bindParameters)
  let data=db.prepare(sql).all(bindParameters);
  
  let d_notas={}
  
  data.forEach(row=>{
    let name_prenda=row['tipo_servicio']!=null?row['nombre_prenda']:row['nombre_prenda'].split('-')[0]
    let name_service=row['tipo_servicio']!=null?row['tipo_servicio']:row['nombre_prenda'].split('-').length>1?row['nombre_prenda'].split('-')[1]:null
    if(row['nota_id'] in d_notas){
      d_notas[row['nota_id']]['prendas'].push({
        id_prenda:row['prenda_id'],
        nombre_prenda: name_prenda,
        color: row['color'],
        tipo_servicio: name_service,
        precio: row['precio']
      })
    }else{
      d_notas[row['nota_id']]={
        num_nota: row['num_nota'],
        nombre_cliente : row['nombre_cliente'],
        nombre_sucursal : row['nombre_sucursal'],
        precio_total : row['precio_total'],
        fecha_registro : row['fecha_registro'],
        fecha_recepcion : row['fecha_recepcion'],
        fecha_entrega : row['fecha_entrega'],
        prendas : [{
          id_prenda:row['prenda_id'],
          nombre_prenda: name_prenda,
          color: row['color'],
          tipo_servicio: name_service,
          precio: row['precio']
        }]
      }
    }
  })

  
  return d_notas

}

function get_prendas_cuenta(prendas){
  prendas_cuenta={}
  prendas.forEach(prenda=>{
    if(prenda['id_prenda'] in prendas_cuenta){
      prendas_cuenta[prenda['id_prenda']]['num_prendas']++
      prendas_cuenta[prenda['id_prenda']]['colores'].push(prenda['color'])
    }else{
      prendas_cuenta[prenda['id_prenda']]={
        num_prendas:1,
        nombre_prenda:prenda['nombre_prenda'],
        tipo_servicio:prenda['tipo_servicio'],
        colores:[prenda['color']],
        precio:prenda['precio']
      }
    }
  })
  return prendas_cuenta
}

function handlerPrintTicket(event,dataNotas,nombre_cliente){
  
  let notas=[]
  let precio_cuenta_total=0
  Object.entries(dataNotas).forEach(([nota_id, nota_obj]) => {
    let nota_desc={
      text_num_nota:nota_obj['num_nota']!=null?nota_obj['num_nota']:"Sin Número",
      fecha_registro:nota_obj['fecha_registro'].split(" ")[0],
      nombre_cliente:nota_obj['nombre_cliente'],
      num_prendas:0,
      precio_total:0,
      prendas: []
    }
    
    let prendas_cuenta=get_prendas_cuenta(nota_obj['prendas'])
    Object.entries(prendas_cuenta).forEach(([prenda_id,prenda_obj])=>{
      // let colores=prenda_obj['colores'].join(',')
      nota_desc.prendas.push([prenda_obj['num_prendas'],
                              prenda_obj['nombre_prenda'],
                              prenda_obj['tipo_servicio'],
                              // colores,
                              //"$"+String(prenda_obj['precio']),
                              "$"+String(parseFloat(prenda_obj['precio'])*parseInt(prenda_obj['num_prendas']))
                            ])
      
      nota_desc.precio_total+=parseFloat(prenda_obj['precio'])*parseInt(prenda_obj['num_prendas'])
    })
    
    precio_cuenta_total+=nota_desc.precio_total
    notas.push(nota_desc)
  });

  printTicket(nombre_cliente,notas,precio_cuenta_total)

}


function handlerDeleteNota(event,nota_id){
  const deleteNotaRopa=`
  DELETE FROM Nota_Ropa WHERE nota_id = ?; `
  db.prepare(deleteNotaRopa).run(nota_id);
  const deleteNota=`
  DELETE FROM Nota WHERE nota_id = ?;`
  db.prepare(deleteNota).run(nota_id);

  return {res:"success"}
}

// ipcMain.handle('get', () => {
//    getProducts()
// });


// ipcMain.handle('add', (event, obj) => {
//   addProduct(obj)
// });


// ipcMain.handle('get_one', (event, obj) => {
//   getproduct(obj)    
// });


// ipcMain.handle('remove_product', (event, obj) => {
//   deleteproduct(obj)
// });


// ipcMain.handle('update', (event, obj) => {
//   updateproduct(obj)    
// });


// function getProducts()
// {
  
//   db.query('SELECT * FROM product', (error, results, fields) => {
//     if (error){
//       console.log(error);
//     }
    
//     win.webContents.send('products', results)
//   });  
// }


// function addProduct(obj)
// {
//   const sql = "INSERT INTO product SET ?";  
//   db.query(sql, obj, (error, results, fields) => {
//     if(error) {
//        console.log(error);
//     }
//     getProducts()  
//  });
// }


// function deleteproduct(obj)
// {
//   const { id }  = obj
//   const sql = "DELETE FROM product WHERE id = ?"
//   db.query(sql, id, (error, results, fields) => {
//     if(error) {
//        console.log(error);
//     }
//     getProducts()  
//   });
// }


// function getproduct(obj)
// {
//   let { id } = obj 
//   let sql = "SELECT * FROM product WHERE id = ?"
//   db.query(sql, id, (error, results, fields) => {
//     if (error){
//       console.log(error);
//     }
//     console.log(results)
//     win.webContents.send('product', results[0])
//   });
// }


// function updateproduct(obj) 
// {
//    let { id, name, price } = obj
//    const sql = "UPDATE product SET name=?, price=? WHERE id=?";  
//    db.query(sql, [name, price, id], (error, results, fields) => {
//      if(error) {
//         console.log(error);
//      }
//      getProducts()  
//    });
// }


