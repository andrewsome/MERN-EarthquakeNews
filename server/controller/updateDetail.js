const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8wy177640',
  database: 'test'
});

const update_detail = (req, res) => {
  let data = req.body
  let sql = `UPDATE latestNews SET place = '${data.tempPlace}', mag = ${data.tempMag}, lat = ${data.tempLat}, lon = ${data.tempLon} WHERE id = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result)
  });
}

module.exports = {
  update_detail
};