var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        required : true
    }, 
    review : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        "default" : Date.now
    },
});

var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    discription : String,
    photos : [String],
    price : Number
});

var geoSchema = new mongoose.Schema({
    type:{
        type : String,
        default : "Point"
    },
    address : String,
    coordinates : {
        type : [Number],
        index : "2dsphere"
    }
});

var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    stars : {
        type : Number,
        min : 0,
        max : 5,
        "default" : 0
    },
    services : [String],
    description : String,
    photos : [String],
    currency : String,
    reviews : [reviewSchema],
    rooms : [roomSchema],
    //always stores coordinates longitude (E/W), latitutde (N/S)
    location : geoSchema
});

mongoose.model('Hotel', hotelSchema);