function isLoggedIn(req, res, next) {
  req.user ? next() : res.json({authenticated:true});
}

module.exports = isLoggedIn;
