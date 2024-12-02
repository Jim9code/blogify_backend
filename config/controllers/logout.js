const db = require("./db");
// require('../routes/auth')

exports.logout = (req, res) => {
  req.session.regenerate((err) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong during logout!");
    }
  });

  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong during logout!");
    }
  });

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong during logout!");
    }
  });

  res.status(200).json({success:'Logout successful'});
};
