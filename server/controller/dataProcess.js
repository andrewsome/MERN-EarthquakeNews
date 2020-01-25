const fetch = require('node-fetch');
const moment = require('moment');
const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
});

const fetch_data = async (req, res, next) => {
  const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson');
  const data = await response.json();
  const currentDate = data.metadata.generated;
  console.log(moment(currentDate).format())
  const filtedData = [];
  data.features.filter(feature => {
    const { properties} = feature;
    const { time } = properties;
    if (moment(time).isBefore(currentDate)) {
      return filtedData.push(feature);
    }
    return null;
  });
  res.data = filtedData.slice(0, 100); 
  next();
}

const create_table = (req, res, next) => {
  const requiredDatas = res.data;
  db.query('SHOW TABLES LIKE "latestNews"', (error, results) => {
    if(error) return console.log(error);
    console.log(results);
    let sql = 'DROP TABLE IF EXISTS latestNews';
    db.query(sql, (err, result) => {
      if(error) return console.log(error);
      console.log(results);
      let sql = 'CREATE TABLE latestNews(id VARCHAR(20) NOT NULL, mag FLOAT NOT NULL, place VARCHAR(100) NOT NULL, time VARCHAR(40) NOT NULL, url VARCHAR(100) NOT NULL, lat FLOAT NOT NULL, lon FLOAT NOT NULL, PRIMARY KEY(id, mag))'
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.data = requiredDatas;
        console.log(result);
        next();
      });
    });
  });
}

const save_data = (req, res) => {
  const requiredDatas = res.data;
  requiredDatas.map(requiredData => {
    let latest = {
      id: requiredData.id,
      mag: requiredData.properties.mag,
      place: requiredData.properties.place,
      time: moment(requiredData.properties.time).format(),
      url: requiredData.properties.url,
      lat: requiredData.geometry.coordinates[0],
      lon: requiredData.geometry.coordinates[1],
    }
    let sql = 'INSERT INTO latestNews SET ?';
    let query = db.query(sql, latest, (err, result) => {
    if (err) {
      if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {   
        req.flash('message','The entry already exist.'); 
        
      } else {
        throw err;
        db.end();
      }
    };
    console.log(result);
  });
  });
    res.json(requiredDatas);
}

module.exports = {
  fetch_data,
  create_table,
  save_data
};