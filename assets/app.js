/**
 * Created by DavidHong on 2015. 6. 21..
 */

var app = angular.module('app',[]);

app.controller('PostsCtrl',function ($scope, PostsSvc){

    $scope.addPost = function() {
        if($scope.postBody) {
            PostsSvc.create({
                username: 'hongdae88',
                body: $scope.postBody

            }).success(function (post) {
                $scope.posts.unshift(post);
                $scope.postBody = null
            })
        }
        $scope.postBody = "";
    };

    PostsSvc.fetch().success(function (posts) {
        $scope.posts = posts
    });

});

app.service('PostsSvc', function($http) {
    this.fetch = function() {
        return $http.get('/api/posts');
    };

    this.create = function() {
        return $http.post('/api/posts',post)
    }
});

