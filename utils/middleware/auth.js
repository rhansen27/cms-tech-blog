const auth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    console.log(req.session);
  } else {
    next();
  }
};

module.exports = auth;
