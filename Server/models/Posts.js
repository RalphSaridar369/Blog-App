const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    user:{
        type:String
    }
})

const PostModel = mongoose.model("post",PostSchema);

module.exports = PostModel;