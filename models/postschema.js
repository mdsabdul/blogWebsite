const mongoose = require("mongoose")
const postschema = mongoose.Schema({
    title:String,
    image:String,
    description:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref: "user"},
    comments :[{
      type:mongoose.Schema.Types.ObjectId, ref:"comment"
    }]
})
module.exports = mongoose.model("post",postschema)