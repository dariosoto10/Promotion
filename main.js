var mysql = require('mysql')
var config = require('./database/config')
var productos = require('./libs/obtener_productos')

var db = mysql.createConnection(config)

db.connect()

setPromotion(db).then((doc) => {
  console.log(doc.length)
}).catch((e) => {
  console.log(e)
})

db.end()

async function setPromotion(db) {
  var producto = await productos.getProductos(db)
  console.log(typeof(producto))
  return producto
}


// const getUser = async(userId) => {
//   return userId
// }

// const getStatus = async(userId) => {
//     const user = await getUser(userId)
//     return user
// }

// getStatus({name: 'dario'}).then((doc) => {
//   console.log(doc)
// })