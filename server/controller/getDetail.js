const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
});

const get_detail = (req, res) => {
  let sql = `SELECT * FROM latestNews WHERE id = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
}

module.exports = {
  get_detail
};