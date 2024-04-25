const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

module.exports = { authenticateToken };
