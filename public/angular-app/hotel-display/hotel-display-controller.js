angular.module("meanhotel").controller("HotelController", HotelController);

function HotelController($window, $route, $routeParams, HotelFactory, AuthFactory, jwtHelper){
    var vm = this;
    var id = $routeParams.id;
    vm.isSubmitted = false;

    HotelFactory.hotelDisplay(id).then(function(response){
        vm.hotel = response;
        vm.stars = _getStarArray(response.stars);
        console.log(vm.stars);
    });

    function _getStarArray(star){
        return new Array(star);
    };

    vm.isLoggedIn = function(){
         if(AuthFactory.isLoggedIn){
             return true;
         }else{
             return false;
         }
     }
    
    vm.addReview = function(){
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);

        var postData = {
            name : decodedToken.username,
            rating : vm.rating,
            review : vm.review
        }

        if(vm.reviewForm.$valid){
            console.log("working");

            HotelFactory.addReview(id, postData).then(function(response){
                $route.reload();
            });

        }else{
            vm.isSubmitted = true;
        }
    };
}