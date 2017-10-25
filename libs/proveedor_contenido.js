let fs = require('fs')

var getProveedores = (db, array) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM insignia_suscripciones.proveedor_de_contenido WHERE id_producto IN (?)"
    let sameSql = "SELECT * FROM insignia_suscripciones.proveedor_de_contenido WHERE id_producto IN ("
    array.map(element => {
      sameSql += element.product_id + ','
    })
    sameSql = sameSql.substr(0, sameSql.length-1)
    sameSql += ')'
    fs.writeFile('proveedor.txt', sameSql, (err) => {
      if(err) {
        console.log('error: ', err)
      } 
    })
    
    db.query(sameSql, (err, result) => {
      if(err) reject(err)
      else {
        fs.writeFile('./test/proveedorData.json', JSON.stringify(result), (err) => {
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
  getProveedores
} 