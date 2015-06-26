/**
 * Created by DavidHong on 2015. 6. 22..
 */

var app = angular.module('app',[
    'ngRoute'
]);

/**
 * Created by DavidHong on 2015. 6. 27..
 */

angular.module('app')
    .controller('ApplicationCtrl', ["$scope", function($scope) {
        $scope.$on('login', function(_, user){
            $scope.currentUser = user;
        })
    }])
/**
 * Created by DavidHong on 2015. 6. 25..
 */

angular.module('app')
    .controller('LoginCtrl', ["$scope", "UserSvc", function($scope, UserSvc) {
        $scope.login = function (username, password) {
            UserSvc.login(username, password)
                .then(function (user) {
                    console.log(user)
                    $scope.$emit('login', user)

                })
        }
    }])


/**
 * Created by DavidHong on 2015. 6. 22..
 */

angular.module('app')

    .controller('PostsCtrl',["$scope", "PostsSvc", function ($scope, PostsSvc){

    $scope.addPost = function() {
        if($scope.postBody) {
            PostsSvc.create({
                username: 'hongdae88',
                body: $scope.postBody

            }).success(function (post) {
                $scope.posts.unshift(post);
                $scope.postBody = null
            });

            $scope.postBody = "";
        }
    };

    PostsSvc.fetch().success(function (posts) {
        $scope.posts = posts
    });

}]);


/**
 * Created by DavidHong on 2015. 6. 22..
 */

angular.module('app')

    .service('PostsSvc', ["$http", function($http) {

        this.fetch = function() {
            return $http.get('/api/posts');
        };

        this.create = function(post) {
            return $http.post('/api/posts',post)
        }
}]);


/**
 * Created by DavidHong on 2015. 6. 22..
 */

angular.module('app')

    .controller('RegisterCtrl',["$scope", "UserSvc", function ($scope,UserSvc){

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

    }]);


/**
 * Created by DavidHong on 2015. 6. 25..
 */

angular.module('app')
.config(["$routeProvider", function($routeProvider){
        $routeProvider
            .when('/',
            {
                    controller: 'PostsCtrl',
                    templateUrl: 'posts.html'
            })
            .when('/register',
            {
                controller: 'RegisterCtrl',
                templateUrl: 'register.html'
            })
            .when('/login',
            {
                controller: 'LoginCtrl',
                templateUrl: 'login.html'
            })
    }])
/**
 * Created by DavidHong on 2015. 6. 25..
 */

angular.module('app').service('UserSvc', ["$http", function($http) {

    var svc = this;
    svc.getUser = function () {
        return $http.get('/api/users',{
            headers: {'X-Auth': this.token }
        })
    }

    svc.login = function (username, password) {
        return $http.post('/api/sessions', {
            username: username, password: password
        }).then(function(val) {
            svc.token = val.data;
            return svc.getUser()
        })
    }

    svc.register = function (username, password) {
        return $http.post('/api/users', {
            username: username, password: password
        }).then(function(val) {
            svc.token = val.data;
            return svc.getUser();
        })
    }
}])

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJsb2dpbi5jdHJsLmpzIiwicG9zdHMuY3RybC5qcyIsInBvc3RzLnN2Yy5qcyIsInJlZ2lzdGVyLmN0cmwuanMiLCJyb3V0ZXMuanMiLCJ1c2VyLnN2Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBLElBQUEsTUFBQSxRQUFBLE9BQUEsTUFBQTtJQUNBOzs7Ozs7O0FDREEsUUFBQSxPQUFBO0tBQ0EsV0FBQSw4QkFBQSxTQUFBLFFBQUE7UUFDQSxPQUFBLElBQUEsU0FBQSxTQUFBLEdBQUEsS0FBQTtZQUNBLE9BQUEsY0FBQTs7Ozs7OztBQ0hBLFFBQUEsT0FBQTtLQUNBLFdBQUEsbUNBQUEsU0FBQSxRQUFBLFNBQUE7UUFDQSxPQUFBLFFBQUEsVUFBQSxVQUFBLFVBQUE7WUFDQSxRQUFBLE1BQUEsVUFBQTtpQkFDQSxLQUFBLFVBQUEsTUFBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsT0FBQSxNQUFBLFNBQUE7Ozs7Ozs7Ozs7O0FDTkEsUUFBQSxPQUFBOztLQUVBLFdBQUEsbUNBQUEsVUFBQSxRQUFBLFNBQUE7O0lBRUEsT0FBQSxVQUFBLFdBQUE7UUFDQSxHQUFBLE9BQUEsVUFBQTtZQUNBLFNBQUEsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLE1BQUEsT0FBQTs7ZUFFQSxRQUFBLFVBQUEsTUFBQTtnQkFDQSxPQUFBLE1BQUEsUUFBQTtnQkFDQSxPQUFBLFdBQUE7OztZQUdBLE9BQUEsV0FBQTs7OztJQUlBLFNBQUEsUUFBQSxRQUFBLFVBQUEsT0FBQTtRQUNBLE9BQUEsUUFBQTs7Ozs7Ozs7OztBQ3BCQSxRQUFBLE9BQUE7O0tBRUEsUUFBQSxzQkFBQSxTQUFBLE9BQUE7O1FBRUEsS0FBQSxRQUFBLFdBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQTs7O1FBR0EsS0FBQSxTQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsTUFBQSxLQUFBLGFBQUE7Ozs7Ozs7OztBQ1RBLFFBQUEsT0FBQTs7S0FFQSxXQUFBLHFDQUFBLFVBQUEsT0FBQSxRQUFBOztRQUVBLE9BQUEsV0FBQSxTQUFBLFVBQUEsVUFBQSxrQkFBQTtZQUNBLEdBQUEsYUFBQTtZQUNBO2dCQUNBLFFBQUEsSUFBQSxVQUFBLFNBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBOzs7WUFHQSxRQUFBLFNBQUEsU0FBQTtpQkFDQSxLQUFBLFVBQUEsVUFBQTtvQkFDQSxRQUFBLElBQUE7Ozs7Ozs7Ozs7O0FDZEEsUUFBQSxPQUFBO0NBQ0EsMEJBQUEsU0FBQSxlQUFBO1FBQ0E7YUFDQSxLQUFBO1lBQ0E7b0JBQ0EsWUFBQTtvQkFDQSxhQUFBOzthQUVBLEtBQUE7WUFDQTtnQkFDQSxZQUFBO2dCQUNBLGFBQUE7O2FBRUEsS0FBQTtZQUNBO2dCQUNBLFlBQUE7Z0JBQ0EsYUFBQTs7Ozs7OztBQ2hCQSxRQUFBLE9BQUEsT0FBQSxRQUFBLHFCQUFBLFNBQUEsT0FBQTs7SUFFQSxJQUFBLE1BQUE7SUFDQSxJQUFBLFVBQUEsWUFBQTtRQUNBLE9BQUEsTUFBQSxJQUFBLGFBQUE7WUFDQSxTQUFBLENBQUEsVUFBQSxLQUFBOzs7O0lBSUEsSUFBQSxRQUFBLFVBQUEsVUFBQSxVQUFBO1FBQ0EsT0FBQSxNQUFBLEtBQUEsaUJBQUE7WUFDQSxVQUFBLFVBQUEsVUFBQTtXQUNBLEtBQUEsU0FBQSxLQUFBO1lBQ0EsSUFBQSxRQUFBLElBQUE7WUFDQSxPQUFBLElBQUE7Ozs7SUFJQSxJQUFBLFdBQUEsVUFBQSxVQUFBLFVBQUE7UUFDQSxPQUFBLE1BQUEsS0FBQSxjQUFBO1lBQ0EsVUFBQSxVQUFBLFVBQUE7V0FDQSxLQUFBLFNBQUEsS0FBQTtZQUNBLElBQUEsUUFBQSxJQUFBO1lBQ0EsT0FBQSxJQUFBOzs7O0FBSUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IERhdmlkSG9uZyBvbiAyMDE1LiA2LiAyMi4uXG4gKi9cblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFtcbiAgICAnbmdSb3V0ZSdcbl0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IERhdmlkSG9uZyBvbiAyMDE1LiA2LiAyNy4uXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKF8sIHVzZXIpe1xuICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgICAgfSlcbiAgICB9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBEYXZpZEhvbmcgb24gMjAxNS4gNi4gMjUuLlxuICovXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJTdmMpIHtcbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgVXNlclN2Yy5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcilcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdsb2dpbicsIHVzZXIpXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IERhdmlkSG9uZyBvbiAyMDE1LiA2LiAyMi4uXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cbiAgICAuY29udHJvbGxlcignUG9zdHNDdHJsJyxmdW5jdGlvbiAoJHNjb3BlLCBQb3N0c1N2Yyl7XG5cbiAgICAkc2NvcGUuYWRkUG9zdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZigkc2NvcGUucG9zdEJvZHkpIHtcbiAgICAgICAgICAgIFBvc3RzU3ZjLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdob25nZGFlODgnLFxuICAgICAgICAgICAgICAgIGJvZHk6ICRzY29wZS5wb3N0Qm9keVxuXG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnBvc3RCb2R5ID0gbnVsbFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzY29wZS5wb3N0Qm9keSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgUG9zdHNTdmMuZmV0Y2goKS5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0cykge1xuICAgICAgICAkc2NvcGUucG9zdHMgPSBwb3N0c1xuICAgIH0pO1xuXG59KTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IERhdmlkSG9uZyBvbiAyMDE1LiA2LiAyMi4uXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cbiAgICAuc2VydmljZSgnUG9zdHNTdmMnLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgICAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvcG9zdHMnKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKHBvc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Bvc3RzJyxwb3N0KVxuICAgICAgICB9XG59KTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IERhdmlkSG9uZyBvbiAyMDE1LiA2LiAyMi4uXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cbiAgICAuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJyxmdW5jdGlvbiAoJHNjb3BlLFVzZXJTdmMpe1xuXG4gICAgICAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmRfY29uZmlybSkge1xuICAgICAgICAgICAgaWYocGFzc3dvcmQgIT09IHBhc3N3b3JkX2NvbmZpcm0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFzc3dvcmQgK1wiICE9IFwiICsgcGFzc3dvcmRfY29uZmlybSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoZWNrIHRoZSBwYXNzd29yZCBjb25maXJtXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBVc2VyU3ZjLnJlZ2lzdGVyKHVzZXJuYW1lLHBhc3N3b3JkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VybmFtZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IERhdmlkSG9uZyBvbiAyMDE1LiA2LiAyNS4uXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKXtcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC53aGVuKCcvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Bvc3RzQ3RybCcsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncG9zdHMuaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAud2hlbignL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmh0bWwnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLndoZW4oJy9sb2dpbicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJ1xuICAgICAgICAgICAgfSlcbiAgICB9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBEYXZpZEhvbmcgb24gMjAxNS4gNi4gMjUuLlxuICovXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5zZXJ2aWNlKCdVc2VyU3ZjJywgZnVuY3Rpb24oJGh0dHApIHtcblxuICAgIHZhciBzdmMgPSB0aGlzO1xuICAgIHN2Yy5nZXRVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJyx7XG4gICAgICAgICAgICBoZWFkZXJzOiB7J1gtQXV0aCc6IHRoaXMudG9rZW4gfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN2Yy5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgc3ZjLnRva2VuID0gdmFsLmRhdGE7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldFVzZXIoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN2Yy5yZWdpc3RlciA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgc3ZjLnRva2VuID0gdmFsLmRhdGE7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldFVzZXIoKTtcbiAgICAgICAgfSlcbiAgICB9XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9