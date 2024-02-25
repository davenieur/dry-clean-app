
const path = require('path'); 
const Database = require('better-sqlite3');
// let dbPath =
//     process.env.NODE_ENV === "development"
//         ? path.join(__dirname,'../../db/dry_clean_six_stars.db')
//         : path.join(process.resourcesPath, "./db/dry_clean_six_stars.db")

let dbPath = path.join(__dirname,'./db/dry_clean_six_stars.db')



const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');



module.exports.db = db