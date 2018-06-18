var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req, res){
    var hotelId = req.params.hotelId;
    console.log("Get HotelId : " + hotelId);
    
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
        var response = {
            status : 200,
            message : doc.reviews
        }
        if(err){
            console.log("Error finding Reviews");
            response.status = 500;
            response.message = err;
        }else if(!doc){
            response.status = 404;
            response.message = {
                "message" : "reviews not found!"
            };
        }
            res
            .status(response.status)
            .json(response.message);
 
    });
};

module.exports.reviewsGetOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get ReviewId : " + reviewId + " for the HotelId : "+ hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
        var review = hotel.reviews.id(reviewId);
        console.log(review);

        var response = {
            status : 200,
            message : review
        }
        if(err){
            console.log("Error finding review");
            response.status = 500;
            response.message = err;
        }else if(!hotel){
            response.status = 404;
            response.message = {
                "message" : "HotelId not found!"
            };
        }else if(!review){
            response.status = 404;
            response.message = {
                "message" : "reviewID not found!"
            };
        }
            res
            .status(response.status)
            .json(response.message);
 
    });
};

var _addReview = function(req, res, hotel){

    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });

    hotel.save(function(err, hotelUpdated){
        if(err){
            console.log("Adding review got an error!");
            res
            .status(500)
            .json(err);
        }else{
            
        res
        .status(201)
        .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }

    });

};

module.exports.reviewsAddOne = function(req, res){

    var hotelId = req.params.hotelId;
    console.log("Get HotelId : " + hotelId);
    
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
        var response = {
            status : 200,
            message : doc.reviews
        }
        if(err){
            console.log("Error finding Reviews");
            response.status = 500;
            response.message = err;
        }else if(!doc){
            response.status = 404;
            response.message = {
                "message" : "HotelId not found!"
            };
        }

        if(doc){
            _addReview(req, res, doc);
        }else{
            res
            .status(response.status)
            .json(response.message);
        }
            
 
    });

};

module.exports.reviewsUpdateOne = function(req, res){
    
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get ReviewId : " + reviewId + " for the HotelId : "+ hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
        var review = hotel.reviews.id(reviewId);
        console.log(review);

        var response = {
            status : 200,
            message : review
        }
        if(err){
            console.log("Error finding review");
            response.status = 500;
            response.message = err;
        }else if(!hotel){
            response.status = 404;
            response.message = {
                "message" : "HotelId not found!"
            };
        }else if(!review){
            response.status = 404;
            response.message = {
                "message" : "reviewID not found!"
            };
        }

        if(response.status !==200){
            res
            .status(response.status)
            .json(response.message);
        }else{
            
            review.name = req.body.name;
            review.rating = parseInt(req.body.rating);
            review.review = req.body.review;

            hotel.save(function(err, hotelUpdated){
                if(err){
                    console.log("Updating review got an error!");
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

module.exports.reviewsDeleteOne = function(req, res){
    
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get ReviewId : " + reviewId + " for the HotelId : "+ hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
        var review = hotel.reviews.id(reviewId);
        var response = {
            status : 200,
            message : review
        }
        if(err){
            console.log("Error finding review");
            response.status = 500;
            response.message = err;
        }else if(!hotel){
            response.status = 404;
            response.message = {
                "message" : "HotelId not found!"
            };
        }else if(!review){
            response.status = 404;
            response.message = {
                "message" : "reviewID not found!"
            };
        }

        if(response.status !==200){
            res
            .status(response.status)
            .json(response.message);
        }else{
            
           hotel.reviews.id(reviewId).remove();

            hotel.save(function(err, hotelUpdated){
                if(err){
                    console.log("Deleting review got an error!");
                    res
                    .status(500)
                    .json(err);
                }else{    
                    console.log("Review Deleted"); 
                res
                .status(204)
                .json();
                }
            });
        }
            
 
    });
};