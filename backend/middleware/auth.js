const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const result = dotenv.config();

 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, `${process.env.AUTH_TOKEN_JWT}`);
       console.log("FROM ./MIDDLEWARE/AUTH.JS ---  Notre token : ", token);
       
       const userId = decodedToken.userId;
       console.log("FROM ./MIDDLEWARE/AUTH.JS ---  decodedToken : ", decodedToken);
       
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};


