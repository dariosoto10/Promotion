let fs = require('fs')
var moment  = require('moment')
var hoy     = moment().format("YYYY-MM-DD")

var getCount = (db, array) => {
  return new Promise((resolve, reject) => {
let query = ''
  array.map(element => {
    element.numeros = element.numeros.split("@")
    element.numeros.map(numero => {
      query += `\n SELECT * FROM insignia_suscripciones.notifications_control WHERE
                recipient = '${numero}' AND product_id = '${element.product_id}'; `
    })
  })
  fs.writeFile('numerosCount.txt', query, (err) => {
    if(err) {
      console.log('error: ', err)
    } 
  })
    db.query(query, (err, result) => {
      if(err) reject(err)
      else {
        data = []
        result.map(element => {
          if(element != '') data.push(element)
        })
        fs.writeFile('./test/numerosComprobadosData.json', JSON.stringify(data), (err) => {
        if(err) {
          console.log('error: ', err)
          } 
        })
        resolve(data)
      }
    })
  })
}

module.exports = {
  getCount
} 