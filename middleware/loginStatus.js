exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({'message' : 'LOGIN_IS_REQUIRED'});
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({'message' : 'YOU_ARE_ALREADY_LOGGED_IN'});
  }
};