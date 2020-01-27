require('dotenv').config();
const express = require('express'),
  mysql = require('mysql'),
  cors = require('cors'),
  PORT = process.env.PORT || 4000,
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
  }),
  app = express(),
  routes = require('./routes/router');

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySql');
  
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).send({ url:req.originalUrl + ' not found'});
});

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});