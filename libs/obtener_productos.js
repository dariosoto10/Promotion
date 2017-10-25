const fs = require('fs')

var getProductos = (db) => {
  return new Promise((resolve, reject) => {
    sql = `SELECT product_id FROM notifications_control WHERE product_id NOT LIKE 0 group by product_id`
    db.query(sql, (err, result) => {
      if(err) {
        reject(err)
      } else {
        fs.writeFile('./test/productosData.json', JSON.stringify(result), (err) => {
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
  getProductos
}