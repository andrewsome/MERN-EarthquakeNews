const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
});

const add_new = (req, res) => {
  console.log(req.body)
  let data = req.body
  let sql = `INSERT INTO latestNews SET ?`;
  let query = db.query(sql, data, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result)
  });
}

module.exports = {
  add_new
};