/**
 * Created by DavidHong on 2015. 6. 22..
 */

angular.module('app')

    .controller('PostsCtrl',function ($scope, PostsSvc){

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

