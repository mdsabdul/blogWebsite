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
})
userschema.plugin(plm)
module.exports = mongoose.model("user",userschema)