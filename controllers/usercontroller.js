
const passport = require("passport")
const LocalStretegy = require("passport-local")
const User = require("../models/userschema")

passport.use(new LocalStretegy(User.authenticate()))


exports.homepage = (req, res, next) => {
   res.render("index")
}
exports.userlogin = (req, res, next) => {
   res.render("login")
}
exports.signup = (req, res, next) => {
   res.render("register")
}
exports.getregister = async (req, res, next) => {
   try {
      const { name, username, email, password } = req.body
      const newuser = await User.register({ name, username, email }, password)

      res.redirect("/users/login")
   } catch (error) {
      res.send(error)
   }
}
exports.signin=(passport.authenticate("local",{
successRedirect:"/profile",
failureRedirect:"/users/login"
}))

exports.isLoggedIn=(req,res,next)=>{
   if(req.isAuthenticated()){
      return next()
   }else{
      res.redirect("/users/login")
   }
}