const { name } = require("ejs")
const mongoose = require("mongoose")
const commemodel = mongoose.Schema({
    title:String,
    createdby:{
        type:mongoose.Schema.Types.ObjectId ,ref:"user"
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId, ref:"post"
    }

})
module.exports = mongoose.model("comment",commemodel)