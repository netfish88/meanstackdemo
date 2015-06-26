/**
 * Created by DavidHong on 2015. 6. 27..
 */

angular.module('app')
    .controller('ApplicationCtrl', function($scope) {
        $scope.$on('login', function(_, user){
            $scope.currentUser = user;
        })
    })