const express = require('express');
const router = express.Router();
const Post = require("../models/postschema");
const { isLoggedIn } = require("../controllers/usercontroller");
const { homepage, userlogin } = require("../controllers/indexcontroller");

// GET home page
router.get("/", homepage);

// GET about page
router.get('/about', (req, res) => {
  res.render('about', { title: 'Express' });
});

// GET profile page
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const newpost = await Post.find().populate("user") || [];
    // console.log(newpost);
    res.render('profile', { user: req.user, newpost });
  } catch (error) {
    res.send(error);
  }
});

router.get("/delete/:id",isLoggedIn,async function(req,res,next){
  await Post.findByIdAndDelete(req.params.id)
  res.redirect("/profile")
})
// GET contact page
router.get('/contact',isLoggedIn, (req, res) => {
  res.render('contact', { title: 'Express' });
});

// GET logout route
router.get("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) return console.log(error.message);
    console.log("Logged out successfully");
    res.redirect("/users/login");
  });
});
router.get("/postdetail/:id",async function(req,res,next){
try {
  const post =await Post.findById(req.params.id)
  res.render("postdetail",{post})
} catch (error) {
  res.send(error)
}
})

module.exports = router;
