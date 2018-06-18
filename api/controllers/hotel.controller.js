//var dbconn = require("../data/dbconnect.js");
//var ObjectId = require('mongodb').ObjectId;
//var hotelsData = require('../data/hotel-data.json');

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    var point = {
        type : "Point",
        coordinates : [lng, lat]
    };

    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };

    Hotel.geoNear(point, geoOptions, function(err, result, stats){
        console.log("Geo Result : ", result);
        console.log("Geo Stats : ", Stats);
        res
        .status('200')
        .json(result);
    });
}

module.exports.hotelsGetAll = function(req, res){
    
    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    console.log("requested by : " + req.user);
    var offset = 0;
    var count = 5;
    var maxCount = 10;

    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req, res);
        return;
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }

    
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }

    if(isNaN(offset) || isNaN(count)){
        res
        .status(400)
        .json({
            "messsage" : "If supplied in querystring count and offset should be number"
        });

        return;
    }

    if(count > maxCount){
        res
        .status(400)
        .json({
            "message" : "Count limit of " + maxCount + "exceeds"
        });

        return;
    }

    Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels){
        if(err){
            console.log("Error finding Hotels");
            res
            .status(500)
            .json(err);
        }else{
            console.log("No. of Hotels are : "  + hotels.length);
            res
            .status('200')
            .json(hotels);
        }
        
    });

    // collection
    // .find()
    // .skip(offset)
    // .limit(count)
    // .toArray(function(err, docs){
    //     console.log("found : ",docs);
    //     res
    //     .status('200')
    //     .json(docs);
    // });
};

module.exports.hotelsGetOne = function(req, res){
    // var db = dbconn.get();
    // var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    console.log("Get HotelId : " + hotelId);

    Hotel
    .findById(hotelId)
    .exec(function(err, hotel){
        var response = {
            status : 200,
            message : hotel
        }
        if(err){
            console.log("Error finding Hotels");
            response.status = 500;
            response.message = err;
        }else if(!hotel){
            response.status = 404;
            response.message = {
                "message" : "HotelId not found!"
            };
        }
            res
            .status(response.status)
            .json(response.message);
 
    });
   
    // collection
    // .findOne({
    //     _id : ObjectId(hotelId)
    // }, function(err, docs){
    //     res
    //     .status('200')
    //     .json(docs); 
    // });

    
    
    
};

var _splitsArray = function(input){
    var output;
    if(input && input.length >0){
        output = input.split(";");
    }else{
        output = [];
    }

    return output;
};

module.exports.hotelsAddOne = function(req, res){

    Hotel
    .create({
        name : req.body.name,
        description : req.body.description,
        stars : parseInt(req.body.stars, 10),
        services : _splitsArray(req.body.services),
        photos : _splitsArray(req.body.photos),
        currency : req.body.currency,
        location : {
            address : req.body.address,
            coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        }
    }, function(err, hotel){
        if(err){
            console.log("Error Finding Hotels");
            res
            .status(400)
            .json(err);
        }else{
            console.log("new Hotel added ", hotel);
            res
            .status(201)
            .json(hotel);
        }
    });

 /*  // it is native driver code
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;

    console.log("POST new Hotel");
    if(req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars);
        collection.insertOne(newHotel, function(err ,response){
            console.log(response.ops);
            res
            .status('201')
            .json(response.ops);
        });
        
    }else{
        console.log("Data missing from the body");
        res
        .status('400')
        .json({ message : "Required data missing from the body"});
    } */
    
};

module.exports.hotelsUpdateOne = function(req, res){

    var hotelId = req.params.hotelId;
    console.log("Get HotelId : " + hotelId);

    Hotel
    .findById(hotelId)
    .select("-reviews -rooms")
    .exec(function(err, doc){
        var response = {
            status : 200,
            message : doc
        }
        if(err){
            console.log("Error finding Hotels");
            response.status = 500;
            response.message = err;
        }else if(!doc){
            response.status = 404;
            response.message = {
                "message" : "HotelId not found!"
            };
        }
        if(response.status !== 200){
            res
            .status(response.status)
            .json(response.message); 
        }else{
            doc.name = req.body.name;
            doc.stars = parseInt(req.body.stars, 10);
            doc.services = _splitsArray(req.body.services),
            doc.photos = _splitsArray(req.body.photos),
            doc.description = req.body.description;
            doc.currency = req.body.currency;
            doc.location = {
                address : req.body.address,
                coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            };

            doc.save(function(err, hotelUpdated){
                if(err){
                    console.log("Updating hotel got an error!");
                    res
                    .status(500)
                    .json(err);
                }else{     
                res
                .status(204)
                .json();
                }
            });
        }
            
    });
   
};

 module.exports.hotelsDeleteOne = function(req, res){

    var hotelId = req.params.hotelId;

    Hotel
    .findByIdAndRemove(hotelId)
    .exec(function(err, doc){
        if(err){
            res
            .status(500)
            .json(err);
        }else{
            console.log("Hotel Deleted!");
            res
            .status(204)
            .json();
        }
    });
 };