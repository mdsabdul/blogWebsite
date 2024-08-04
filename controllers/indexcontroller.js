const Post = require("../models/postschema")
const comment = require("../models/commentModel")

exports.homepage=async (req,res,next)=>{


   const blogs = await Post.find().populate("user").populate({
      path:"comments",populate:{
          path: 'createdby',
          model: 'user'
      }
   })
  console.log(blogs);
    res.render("index",{user:req.user,blogs})
 }


 exports.userlogin = (req,res,next)=>{
    res.render("login")
 }
 