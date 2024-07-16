exports.homepage=(req,res,next)=>{
    res.render("index",{user:req.user})
 }
 exports.userlogin = (req,res,next)=>{
    res.render("login")
 }