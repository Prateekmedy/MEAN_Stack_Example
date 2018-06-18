angular.module("meanhotel").controller("HotelsController", HotelsController);

function HotelsController(HotelFactory){
    var vm = this;
    vm.title = "Hotel MEAN App";

    HotelFactory.hotelList().then(function(response){
        vm.hotels = response;
    });
}