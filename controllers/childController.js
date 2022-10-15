const passport = require('passport');

const childService = require('../services/childService');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/loginStatus');

const signUp = (isNotLoggedIn, async (req, res, next) => {
  const { userId, password, name, kakaoId } = req.body;

  if(!userId || !password || !name) {
    return res.status(400).json({ message : 'KEY_ERROR' });
  };
  await childService.signUp(req, res, next);
});

const login = (isNotLoggedIn, async (req, res) => {
  const { userId, password } = req.body;
  
  if (!userId || !password) {
    return res.status(400).json({ message : 'KEY_ERROR' });
  };
  await childService.login(req, res);
});

const kakaoLogin = (isNotLoggedIn, async (req, res) => {
  await childService.kakaoLogin(req, res);
});

const getInfo = (isLoggedIn, async (req, res) => {
  await childService.getInfo(req, res);
});

const updateInfo = (isLoggedIn, async (req, res) => {
  await childService.updateInfo(req, res);
});

module.exports = {
	signUp,
  login,
  kakaoLogin,
  getInfo,
  updateInfo,
};