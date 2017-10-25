const utils = require('../libs/obtener_productos.js')
const utilsPr = require('../libs/proveedor_contenido.js')
const config = require('../database/config')
const expect = require('expect')
const mysql = require('mysql')

/* Conexión MySQL */
var db = mysql.createConnection(config)
db.connect()

it('Retornar todos los productos', (done) => {
  utils.getProductos(db).then((response) => {
    try {
      expect(response).toBeA('object')
      expect(response.length).toBe(36)
      expect(response[0].product_id).toBe(860)
      expect(response[response.length-1].product_id).toBe(9783211)
      done()
    } catch(err) {
      done(err)
    }
  }, done)
})
// db.end()