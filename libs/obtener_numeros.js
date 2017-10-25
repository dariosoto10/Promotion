let fs = require('fs')
var moment  = require('moment')
var hoy     = moment().format("YYYY-MM-DD")

var getNums = (db, array) => {
  // console.log(array)
  var productos = []
    array.map(e => {
      try {
        // console.log(e[0].id_producto)
        productos.push(e[0].id_producto)
      } catch (error) {
      }
      
      // productos.push(e[0].id_producto)
    })
  return new Promise((resolve, reject) => {
    let sameSql = "SELECT product_id, id_cliente, group_concat(concat(prefix, recipient) SEPARATOR '@') as numeros FROM insignia_suscripciones.suscripcion WHERE product_id IN ("
    productos.map( element => {
      sameSql += element + ', '
    })
    sameSql = sameSql.substr(0, sameSql.length-2)
    sameSql += ') group by product_id'
    fs.writeFile('numeros.txt', sameSql, (err) => {
      if(err) {
        console.log('error: ', err)
      } 
    })
    db.query(sameSql, (err, result) => {
      if(err) reject(err)
      else {
        fs.writeFile('./test/numerosData.json', JSON.stringify(result), (err) => {
        if(err) {
          console.log('error: ', err)
          } 
        })
        resolve(result)
      }
    })
  })
}

module.exports = {
  getNums
} 