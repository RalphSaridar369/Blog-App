const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})

const UserModel = mongoose.model("user",UserSchema);

module.exports = UserModel;