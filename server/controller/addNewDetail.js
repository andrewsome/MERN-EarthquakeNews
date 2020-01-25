const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8wy177640',
  database: 'test'
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