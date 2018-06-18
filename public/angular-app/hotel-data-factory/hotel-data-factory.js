angular.module("meanhotel").factory("HotelFactory", HotelFactory);

function HotelFactory($http){
    return{
        hotelList : hotelList,
        hotelDisplay : hotelDisplay,
        addReview : addReview
    };

    function hotelList(){
        return $http.get('/api/hotels?count=10').then(complete).catch(failed);
    }

    function hotelDisplay(id){
        return $http.get('/api/hotels/' + id).then(complete).catch(failed);
    }

    function addReview(id, review){
        return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        console.log(error.statusText);
    }
}