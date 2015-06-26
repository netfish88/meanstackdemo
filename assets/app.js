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
            $http.defaults.headers.common['X-Auth'] = val.data

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJsb2dpbi5jdHJsLmpzIiwicG9zdHMuY3RybC5qcyIsInBvc3RzLnN2Yy5qcyIsInJlZ2lzdGVyLmN0cmwuanMiLCJyb3V0ZXMuanMiLCJ1c2VyLnN2Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBLElBQUEsTUFBQSxRQUFBLE9BQUEsTUFBQTtJQUNBOzs7Ozs7O0FDREEsUUFBQSxPQUFBO0tBQ0EsV0FBQSw4QkFBQSxTQUFBLFFBQUE7UUFDQSxPQUFBLElBQUEsU0FBQSxTQUFBLEdBQUEsS0FBQTtZQUNBLE9BQUEsY0FBQTs7Ozs7OztBQ0hBLFFBQUEsT0FBQTtLQUNBLFdBQUEsbUNBQUEsU0FBQSxRQUFBLFNBQUE7UUFDQSxPQUFBLFFBQUEsVUFBQSxVQUFBLFVBQUE7WUFDQSxRQUFBLE1BQUEsVUFBQTtpQkFDQSxLQUFBLFVBQUEsTUFBQTtvQkFDQSxRQUFBLElBQUE7b0JBQ0EsT0FBQSxNQUFBLFNBQUE7Ozs7Ozs7Ozs7O0FDTkEsUUFBQSxPQUFBOztLQUVBLFdBQUEsbUNBQUEsVUFBQSxRQUFBLFNBQUE7O0lBRUEsT0FBQSxVQUFBLFdBQUE7UUFDQSxHQUFBLE9BQUEsVUFBQTtZQUNBLFNBQUEsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLE1BQUEsT0FBQTs7ZUFFQSxRQUFBLFVBQUEsTUFBQTtnQkFDQSxPQUFBLE1BQUEsUUFBQTtnQkFDQSxPQUFBLFdBQUE7OztZQUdBLE9BQUEsV0FBQTs7OztJQUlBLFNBQUEsUUFBQSxRQUFBLFVBQUEsT0FBQTtRQUNBLE9BQUEsUUFBQTs7Ozs7Ozs7OztBQ3BCQSxRQUFBLE9BQUE7O0tBRUEsUUFBQSxzQkFBQSxTQUFBLE9BQUE7O1FBRUEsS0FBQSxRQUFBLFdBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQTs7O1FBR0EsS0FBQSxTQUFBLFNBQUEsTUFBQTtZQUNBLE9BQUEsTUFBQSxLQUFBLGFBQUE7Ozs7Ozs7OztBQ1RBLFFBQUEsT0FBQTs7S0FFQSxXQUFBLHFDQUFBLFVBQUEsT0FBQSxRQUFBOztRQUVBLE9BQUEsV0FBQSxTQUFBLFVBQUEsVUFBQSxrQkFBQTtZQUNBLEdBQUEsYUFBQTtZQUNBO2dCQUNBLFFBQUEsSUFBQSxVQUFBLFNBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBOzs7WUFHQSxRQUFBLFNBQUEsU0FBQTtpQkFDQSxLQUFBLFVBQUEsVUFBQTtvQkFDQSxRQUFBLElBQUE7Ozs7Ozs7Ozs7O0FDZEEsUUFBQSxPQUFBO0NBQ0EsMEJBQUEsU0FBQSxlQUFBO1FBQ0E7YUFDQSxLQUFBO1lBQ0E7b0JBQ0EsWUFBQTtvQkFDQSxhQUFBOzthQUVBLEtBQUE7WUFDQTtnQkFDQSxZQUFBO2dCQUNBLGFBQUE7O2FBRUEsS0FBQTtZQUNBO2dCQUNBLFlBQUE7Z0JBQ0EsYUFBQTs7Ozs7Ozs7QUNoQkEsUUFBQSxPQUFBLE9BQUEsUUFBQSxxQkFBQSxTQUFBLE9BQUE7O0lBRUEsSUFBQSxNQUFBOztJQUVBLElBQUEsVUFBQSxZQUFBO1FBQ0EsT0FBQSxNQUFBLElBQUEsYUFBQTtZQUNBLFNBQUEsQ0FBQSxVQUFBLEtBQUE7Ozs7SUFJQSxJQUFBLFFBQUEsVUFBQSxVQUFBLFVBQUE7UUFDQSxPQUFBLE1BQUEsS0FBQSxpQkFBQTtZQUNBLFVBQUEsVUFBQSxVQUFBO1dBQ0EsS0FBQSxTQUFBLEtBQUE7WUFDQSxJQUFBLFFBQUEsSUFBQTtZQUNBLE1BQUEsU0FBQSxRQUFBLE9BQUEsWUFBQSxJQUFBOztZQUVBLE9BQUEsSUFBQTs7OztJQUlBLElBQUEsV0FBQSxVQUFBLFVBQUEsVUFBQTtRQUNBLE9BQUEsTUFBQSxLQUFBLGNBQUE7WUFDQSxVQUFBLFVBQUEsVUFBQTtXQUNBLEtBQUEsU0FBQSxLQUFBO1lBQ0EsSUFBQSxRQUFBLElBQUE7WUFDQSxPQUFBLElBQUE7Ozs7QUFJQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRGF2aWRIb25nIG9uIDIwMTUuIDYuIDIyLi5cbiAqL1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsW1xuICAgICduZ1JvdXRlJ1xuXSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgRGF2aWRIb25nIG9uIDIwMTUuIDYuIDI3Li5cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignQXBwbGljYXRpb25DdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS4kb24oJ2xvZ2luJywgZnVuY3Rpb24oXywgdXNlcil7XG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyO1xuICAgICAgICB9KVxuICAgIH0pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IERhdmlkSG9uZyBvbiAyMDE1LiA2LiAyNS4uXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlclN2Yykge1xuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICBVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2xvZ2luJywgdXNlcilcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgRGF2aWRIb25nIG9uIDIwMTUuIDYuIDIyLi5cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcblxuICAgIC5jb250cm9sbGVyKCdQb3N0c0N0cmwnLGZ1bmN0aW9uICgkc2NvcGUsIFBvc3RzU3ZjKXtcblxuICAgICRzY29wZS5hZGRQb3N0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCRzY29wZS5wb3N0Qm9keSkge1xuICAgICAgICAgICAgUG9zdHNTdmMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2hvbmdkYWU4OCcsXG4gICAgICAgICAgICAgICAgYm9keTogJHNjb3BlLnBvc3RCb2R5XG5cbiAgICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3QpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucG9zdEJvZHkgPSBudWxsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNjb3BlLnBvc3RCb2R5ID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBQb3N0c1N2Yy5mZXRjaCgpLnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3RzKSB7XG4gICAgICAgICRzY29wZS5wb3N0cyA9IHBvc3RzXG4gICAgfSk7XG5cbn0pO1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgRGF2aWRIb25nIG9uIDIwMTUuIDYuIDIyLi5cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcblxuICAgIC5zZXJ2aWNlKCdQb3N0c1N2YycsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICAgICAgdGhpcy5mZXRjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9wb3N0cycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24ocG9zdCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvcG9zdHMnLHBvc3QpXG4gICAgICAgIH1cbn0pO1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgRGF2aWRIb25nIG9uIDIwMTUuIDYuIDIyLi5cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcblxuICAgIC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLGZ1bmN0aW9uICgkc2NvcGUsVXNlclN2Yyl7XG5cbiAgICAgICAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZF9jb25maXJtKSB7XG4gICAgICAgICAgICBpZihwYXNzd29yZCAhPT0gcGFzc3dvcmRfY29uZmlybSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXNzd29yZCArXCIgIT0gXCIgKyBwYXNzd29yZF9jb25maXJtKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2sgdGhlIHBhc3N3b3JkIGNvbmZpcm1cIilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFVzZXJTdmMucmVnaXN0ZXIodXNlcm5hbWUscGFzc3dvcmQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJuYW1lKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgRGF2aWRIb25nIG9uIDIwMTUuIDYuIDI1Li5cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpe1xuICAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAgICAgLndoZW4oJy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUG9zdHNDdHJsJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwb3N0cy5odG1sJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aGVuKCcvcmVnaXN0ZXInLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIuaHRtbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAud2hlbignL2xvZ2luJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnXG4gICAgICAgICAgICB9KVxuXG4gICAgfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgRGF2aWRIb25nIG9uIDIwMTUuIDYuIDI1Li5cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuc2VydmljZSgnVXNlclN2YycsIGZ1bmN0aW9uKCRodHRwKSB7XG5cbiAgICB2YXIgc3ZjID0gdGhpcztcblxuICAgIHN2Yy5nZXRVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJyx7XG4gICAgICAgICAgICBoZWFkZXJzOiB7J1gtQXV0aCc6IHRoaXMudG9rZW4gfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN2Yy5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgc3ZjLnRva2VuID0gdmFsLmRhdGE7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1BdXRoJ10gPSB2YWwuZGF0YVxuXG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldFVzZXIoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN2Yy5yZWdpc3RlciA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgc3ZjLnRva2VuID0gdmFsLmRhdGE7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldFVzZXIoKTtcbiAgICAgICAgfSlcbiAgICB9XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9