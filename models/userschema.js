const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
const userschema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    posts:[{
        type:mongoose.Schema.Types.ObjectId,ref:"post"
    }],
    profile:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsIiUM3HC3dg7_Yok8d4ZOi1ca8h98q7mRw&s"
    }
})
userschema.plugin(plm)
module.exports = mongoose.model("user",userschema)