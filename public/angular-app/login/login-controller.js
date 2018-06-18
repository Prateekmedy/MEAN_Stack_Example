angular.module("meanhotel").controller("LoginController", LoginController);

function LoginController( $http, $location, $window, AuthFactory, jwtHelper){
    var vm = this;
    console.log("navbar");

    vm.isLoggedIn = function(){
       // console.log("login : ", AuthFactory.auth);
        if(AuthFactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    }

    vm.login = function(){
        if( vm.username && vm.password){
            var user = {
                username : vm.username,
                password : vm.password
            }

            $http.post('/api/users/login', user).then(function(response){
                console.log(response.data);
                if(response.data.success){
                $window.sessionStorage.token = response.data.token;
                AuthFactory.isLoggedIn = true;
                var token = $window.sessionStorage.token;
                var decodedToken = jwtHelper.decodeToken(token);
                vm.loggedinUser = decodedToken.username;
                }
               
                
            }).catch(function(error){
                if(error.data===null){
                    console.log("no data found");
                    alert("Register First");
                    $location.path('/register');
                    vm.username = "";
                    vm.password = "";

                }else{
                    console.log("you entered password wrong");
                    alert("Password is incorrect");
                    vm.password = "";
                }
                
            });
        }
    }

    vm.logout = function(){
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
        vm.username = "";
        vm.password = "";
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path().split('/')[1];
        return ( url === currentPath ? 'active' : '');
    }
}