const Post = require("../models/postschema")

exports.homepage=async (req,res,next)=>{
   const blogs = await Post.find().populate("user")
    res.render("index",{user:req.user,blogs})
 }
 exports.userlogin = (req,res,next)=>{
    res.render("login")
 }