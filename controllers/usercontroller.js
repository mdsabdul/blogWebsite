
const passport = require("passport")
const LocalStretegy = require("passport-local")
const User = require("../models/userschema")
const Post = require("../models/postschema")

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

exports.createpost = (req,res,next)=>{
   res.render("postcreate")
}

exports.postcreatepage= async(req,res,next)=>{
  try {
   const newpost = new Post({
    title:req.body.title,
    description:req.body.description,
    image:req.body.image,
    user:req.user._id
   })
 req.user.posts.push(newpost._id)
   await newpost.save()
   await req.user.save()
   res.redirect("/profile")
  } catch (error) {
   res.send(error)
  }
}
