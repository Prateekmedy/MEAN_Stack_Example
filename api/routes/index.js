var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotel.controller');
var ctrlReviews = require('../controllers/reviews.controllers');
var ctrlUser = require('../controllers/users.controller');

router
    .route('/hotels')
    .get( ctrlHotels.hotelsGetAll) //.get(ctrlUser.authenticate, ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);
   


    //review routes

router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUser.authenticate, ctrlReviews.reviewsAddOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

    //Authontication

router
    .route('/users/register')
    .post(ctrlUser.register);
    
router
    .route('/users/login')
    .post(ctrlUser.login);

module.exports = router;