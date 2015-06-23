/**
 * Created by DavidHong on 2015. 6. 22..
 */

angular.module('app')

    .service('PostsSvc', function($http) {

        this.fetch = function() {
            return $http.get('/api/posts');
        };

        this.create = function(post) {
            return $http.post('/api/posts',post)
        }
});

