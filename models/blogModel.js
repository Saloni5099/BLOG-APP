const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        requires:[true,"title is required"],
    },
    description:{
        type:String,
        requires:[true,"description is required"],
    },
    image:{
        type:String,
        requires:[true,"image is required"],
    },
},
{timestamps:true}
);

const blogModel = mongoose.model("Blog",blogSchema);

module.exports = blogModel;