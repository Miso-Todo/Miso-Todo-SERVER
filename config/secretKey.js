const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  secretKey : process.env.JWT_SECRET_KEY,
  option : {
      algorithm : process.env.JWT_ALGORITHM,
      expiresIn : process.env.JWT_EXPIRES_IN,
      issuer : process.env.JWT_ISSUER,
  }
}