let fs = require('fs')
var moment  = require('moment')
var hoy     = moment().format("YYYY-MM-DD")
var _       = require('lodash')

var getMt = (db, array) => {
  return new Promise((resolve, reject) => {
let sql = ''
  array.map(e => {
  sql += `\n SELECT count(*) count, id_producto, origen FROM sms.smsin WHERE origen = '${e[0].recipient}'
          AND id_producto = '${e[0].product_id}' AND data_arrive BETWEEN '${moment(e[0].date).format("YYYY-MM-DD")}'
          AND '${moment(e[0].date_notifications_r).format("YYYY-MM-DD")}'; `
  })
  fs.writeFile('ObtenerFechaMt.txt', sql, (err) => {
    if(err) {
      console.log('error: ', err)
    } 
  })
    db.query(sql, (err, result) => {
      if(err) reject(err)
      else {
        var data = []
        result.map((element, index) => {
          if(element[0].count != 0) {
            let a = _.find(array, { 'recipient': element[0].origen, 'product_id': element[0].id_producto });
            if(element[0].origen == array[index][0].recipient) {
              if(element[0].count > array[index][0].notifications_r) data.push(element)
            }
          }
        })
        fs.writeFile('./test/mtData.json', JSON.stringify(data), (err) => {
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
  getMt
} 