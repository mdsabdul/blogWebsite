

var express = require('express');
var router = express.Router();
// const{signup} = require("../controllers/usercontroller")
const { homepage, userlogin, getregister, signup, signin } = require("../controllers/usercontroller")

/* GET users listing. */
router.get("/", homepage)
router.get('/login', userlogin);
router.get("/register", signup)
router.post("/register", getregister)
router.post("/login", signin)


module.exports = router;
