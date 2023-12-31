const errorHandler = require("./error");
const jwt = require('jsonwebtoken')
module.exports = {
  verifyToken: async (req, res , next) => {
    const token = req.cookies.token;

    if(!token) return next(errorHandler(401, "Unauthorized"))
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=> {
      if(err) return next(errorHandler(403,'Forbidden'))
      req.user = user; 
    next()
    })
  }
}