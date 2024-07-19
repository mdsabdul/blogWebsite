const Post = require("../models/postschema")

var express = require('express');
var router = express.Router();
// const{signup} = require("../controllers/usercontroller")
const { homepage, userlogin, getregister, signup, signin,createpost,postcreatepage ,isLoggedIn,update} = require("../controllers/usercontroller")

/* GET users listing. */
router.get("/", homepage)
router.get('/login', userlogin);
router.get("/register", signup)
router.post("/register", getregister)
router.post("/login", signin)
router.get("/postcreate",isLoggedIn,createpost)
router.post("/postcreate",postcreatepage)
router.get("/updateblogs/:id", async function(req,res,next){
try {
const post =await Post.findById(req.params.id)
  
  console.log(post);
    res.render("postUpdate",{id:req.params.id,post})
} catch (error) {
  res.send(error)
}
})

router.post("/update/:id",async function(req,res,next){
   try {
    await Post.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/")
   } catch (error) {
    res.send(error)
   }
})
module.exports = router;
