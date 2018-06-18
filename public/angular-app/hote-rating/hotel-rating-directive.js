// angular.module("meanhotel").directive("hotelRating", hotelRating);

// function hotelRating(){
//     return{
//         restrict : 'E',
//         template : "<i ng-repeat='star in vm.stars track by $index' class='fa fa-star'></i>",
//         bindToController : true,
//         controller : 'HotelController',
//         controllerAs : 'vm',
//         scope : {
//             stars : "@"
//         }
//     }
// }

angular.module("meanhotel").component("hotelRating", {
    bindings : {
        star : '='
    },
    template : "<i ng-repeat='star in vm.stars track by $index' class='fa fa-star'></i>",
    controller : 'HotelController',
     controllerAs : 'vm'
});