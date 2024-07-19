const express = require('express');
const router = express.Router();
const Post = require("../models/postschema");
const { isLoggedIn } = require("../controllers/usercontroller");
const { homepage, userlogin } = require("../controllers/indexcontroller");
const User = require("../models/userschema")

var imagekit = require("imagekit");

var image = new imagekit({
  publicKey: "public_Lp21aIjEIKn4DPARd1ySASCR4hI=",
  privateKey: "private_dkCcTPQc3B+3jJs8qPIFBHIxUs0=",
  urlEndpoint: "https://ik.imagekit.io/z1yejmwsj"
});
router.post("/upload", async function (req, res, next) {
  console.log(req.files);
  const user = req.user
  // console.log(user);
  const { url, fileId } = await image.upload({
    file: req.files.image.data,
    fileName: req.files.image.name
  })
  user.profile = url
  await user.save()
  res.redirect("/profile")
})




// GET home page
router.get("/", homepage);

// GET about page
router.get('/about', (req, res) => {
  res.render('about', { title: 'Express' });
});

// GET profile page
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
   
  //  console.log(user);
 
  // console.log(user.posts[0]);
  const user=  await User.findById(req.user._id).populate("posts")
  // console.log(posts);
   res.render("profile",{user})
  } catch (error) {
    res.send(error);
  }
});

router.get("/delete/:id", isLoggedIn, async function (req, res, next) {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect("/profile")
})

// GET contact page
router.get('/contact', isLoggedIn, (req, res) => {
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
router.get("/postdetail/:id", async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    res.render("postdetail", {user:req.user, post })
  } catch (error) {
    res.send(error)
  }
})


module.exports = router;

