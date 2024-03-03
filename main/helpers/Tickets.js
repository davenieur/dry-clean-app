import escpos from 'escpos';
import path from 'path';

// Install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');

function getDevice() {
  const devicePrinter = escpos.USB.findPrinter();
  if (devicePrinter.length > 0) {
    console.log("len", devicePrinter.length);
    let devicePrinterDesc = devicePrinter[0]['deviceDescriptor'];
    const vid = devicePrinterDesc['idVendor'];
    const pid = devicePrinterDesc['idProduct'];
    const device = new escpos.USB(vid, pid);
    return device;
  } else {
    return null;
  }
}

const printTicket = (nombre_cliente, arr_notas, precio_cuenta_total) => {
  const device = getDevice();
  if (device != null) {
    const options = { encoding: "CP1252", width: 36 };
    const printer = new escpos.Printer(device, options);
    console.log("Printing");
    console.log(arr_notas);
    const logo = path.join(__dirname, 'DRYlogo_orig_400w_90ppp_BW_8b_fit.png');

    escpos.Image.load(logo, "image/png", function(image) {
      device.open(function() {
        // Ticket header
        printer.setCharacterCodeTable(16)
          .align('ct')
          .image(image, 'D24').then(() => {
            printer.font("B")
              .size(0.05, 0.05)
              .text("SERVICIO DRY CLEAN SIX STARS")
              .text("TICKET DE PAGO POR SERVICIOS DE TINTORERIA Y LAVADO DE ROPA. ")
              .text("CLIENTE A PAGAR: " + nombre_cliente);

            // notas
            arr_notas.forEach(nota => {
              printer.align('LT')
                .style("BI")
                .text("#Nota: " + nota.text_num_nota + " " + nota.fecha_registro + " Total: $" + nota.precio_total)
                .style("NORMAL")
                .align("LT")
                .tableCustom([
                  { text: "#", align: "LEFT", width: 0.1 },
                  { text: "Prenda", align: "LEFT", width: 0.5 },
                  { text: "Servicio", align: "CENTER", width: 0.3 },
                  { text: "Total", align: "RIGHT", width: 0.2 }
                ]);
              nota.prendas.forEach(row_prenda => {
                return printer.tableCustom([
                  { text: row_prenda[0], align: "LEFT", width: 0.1 },
                  { text: row_prenda[1], align: "LEFT", width: 0.5 },
                  { text: row_prenda[2], align: "CENTER", width: 0.3 },
                  { text: row_prenda[3], align: "RIGHT", width: 0.2 }
                ]);
              });
              printer.drawLine();
            });

            printer.text("Cuenta Total: $" + String(precio_cuenta_total))
              .feed()
              .cut()
              .close();
          });
      });

    });

  } else {
    console.log("NULL DEVICE, NO PRINTING");
  }
};

export { printTicket };
