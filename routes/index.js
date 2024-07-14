var express = require('express');
var router = express.Router();
const {isLoggedIn}= require("../controllers/usercontroller")
const {homepage,userlogin} = require("../controllers/indexcontroller")

/* GET home page. */
router.get("/", homepage) 

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'Express' });
});
router.get('/profile',isLoggedIn,function (req, res, next) {
  res.render('profile', { title: 'Express' });
});
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Express' });
});
router.get("/logout", function (req, res, next) {
  req.logOut((error) => {
      if(error) return console.log(err.message);
      console.log("hiii");
      res.redirect("/users/login")
  })
})
module.exports = router;
