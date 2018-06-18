angular.module("meanhotel").controller("registerController", registerController);

function registerController($http){
    var vm = this;
    
    vm.register = function(){
        var user = {
            username : vm.username,
            password : vm.password
        }
    
        if(!vm.username || !vm.password){
            vm.error = "Please check the Username and Password";
        }else{
            if(vm.password !== vm.passwordRepeat){
                vm.error = "Password not matched";
            }else{
                $http.post('/api/users/register', user).then(function(result){
                    console.log(result);
                    vm.message = "Successful Register please login";
                    vm.error = "";
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
    }
    
}