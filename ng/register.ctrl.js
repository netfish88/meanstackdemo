/**
 * Created by DavidHong on 2015. 6. 22..
 */

angular.module('app')

    .controller('RegisterCtrl',function ($scope,UserSvc){

        $scope.register = function(username, password, password_confirm) {
            if(password !== password_confirm)
            {
                console.log(password +" != " + password_confirm)
                console.log("check the password confirm")
                return;
            }

            UserSvc.register(username,password)
                .then(function (username) {
                    console.log(username)
                })
        }

    });

