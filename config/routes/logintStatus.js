function isLoggedIn(req, res, next) {
  req.user ? next() : res.json({authenticated:false});
}

module.exports = isLoggedIn;
