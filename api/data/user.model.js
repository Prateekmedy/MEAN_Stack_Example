var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true
    },
    name : {
        type : String
    },
    password : {
        type : String,
        required : true
    }
});

mongoose.model("User", userSchema);