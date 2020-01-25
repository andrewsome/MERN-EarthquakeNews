const jwt = require('jsonwebtoken');

const log_in = (req, res) => {
  const user = {
    username: 'ad',
  }
  jwt.sign({user}, 'secret', (err, token) => {
    res.json({
      token
    })
  });
}

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}