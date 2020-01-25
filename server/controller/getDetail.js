const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8wy177640',
  database: 'test'
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