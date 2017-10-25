var mysql       = require('mysql')
var config      = require('./database/config')
var productos   = require('./libs/obtener_productos')
var proveedor   = require('./libs/proveedor_contenido')
var actualizar  = require('./libs/comprobar_actualizacion')
var numero      = require('./libs/obtener_numeros')
var comprobados = require('./libs/numeros_comprobados')
var mt          = require('./libs/obtener_mt')

var db = mysql.createConnection(config)

db.connect()

setPromotion(db).then((doc) => {
  db.end()
}).catch((e) => {
  console.log(e)
  db.end()
})

async function setPromotion(db) {
  var producto           = await productos.getProductos(db)
  var proveedores        = await proveedor.getProveedores(db, producto)
  var actualizados       = await actualizar.getProducts(db, proveedores)
  var numeros            = await numero.getNums(db, actualizados)
  var numerosComprobados = await comprobados.getCount(db, numeros)
  var mtEnviado          = await mt.getMt(db, numerosComprobados)
}
