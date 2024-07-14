const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.mongo_url).then(()=>console.log("connection done")).catch((error)=>console.log(error))