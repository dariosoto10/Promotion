var mysql = require('mysql')
var config = require('./database/config')
var productos = require('./libs/obtener_productos')
var proveedor = require('./libs/proveedor_contenido')
var actualizar = require('./libs/comprobar_actualizacion')

var db = mysql.createConnection(config)

db.connect()

setPromotion(db).then((doc) => {
  // console.log(doc.length)
  db.end()
}).catch((e) => {
  console.log(e)
  db.end()
})

async function setPromotion(db) {
  var producto = await productos.getProductos(db)
  var proveedores = await proveedor.getProveedores(db, producto)
  var actualizados = await actualizar.getProducts(db, proveedores)
  // console.log(actualizados)
  // console.log(actualizados.length)
  return actualizados
}
