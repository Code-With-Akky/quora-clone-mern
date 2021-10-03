const jwt = require("jsonwebtoken");
const config = require("../config");
const { JWT_SECRET } = config;

module.exports = (req, res, next) => {
  if (!req.headers["authorization"]) {
    res.status(401).send({ message: "Unauthenticated" });
  } else {
    jwt.verify(req.headers["authorization"], JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(403).send({
          message: "Forbidden",
        });
      } else {
        req.userId = decoded.userId;
        req.role = decoded.role;
        req.email = decoded.email;
        next();
      }
    });
  }
};
