let fs = require('fs')
var moment  = require('moment')
var hoy     = moment().format("YYYY-MM-DD")

var getProducts = (db, array) => {
  return new Promise((resolve, reject) => {
    let query = ''
    array.map( element => {
      query += `\n SELECT * FROM analisis.r_multiple WHERE id_producto = '${element.id_producto}'
                     AND fecha BETWEEN '2012-10-25' AND '${hoy}' GROUP BY id_producto; `
    })
    query = query.substr(0, query.length-2)
    fs.writeFile('actualizacion.txt', query, (err) => {
      if(err) {
        console.log('error: ', err)
      } 
    })
    
    db.query(query, (err, result) => {
      if(err) reject(err)
      else {
        fs.writeFile('./test/actualizacionData.json', JSON.stringify(result), (err) => {
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
  getProducts
} 