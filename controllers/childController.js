const childService = require('../services/childService');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/loginStatus');

const signUp = (isNotLoggedIn, async (req, res, next) => {
  const { userId, password, name, kakaoId } = req.body;

  if(!userId || !password || !name) {
    const error = new Error('KEY_ERROR')
    error.statusCode = 400;

    throw error
}
await childService.signUp(req, res, next);
});

module.exports = {
	signUp
}