const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
});

const update_detail = (req, res) => {
  let data = req.body
  let sql = `UPDATE latestNews SET place = '${data.tempPlace}', mag = ${data.tempMag}, lat = ${data.tempLat}, lon = ${data.tempLon} WHERE id = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if(err) console.log(err);
    console.log(result);
    res.send(result)
  });
}

module.exports = {
  update_detail
};