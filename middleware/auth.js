const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
	try {
		const token = await req.headers.authorization;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.decoded = decoded
    if(decoded){
      next(); 
    }
	} catch (err) {
		res.status(401).json({ message: 'INVALID_TOKEN' })
	}
};

module.exports = {
	validateToken
}