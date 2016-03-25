var app = angular.module('thumbnail',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/thumbnail',{
        templateUrl: '/static/views/images.html',
        controller: 'thumbnailCtrl'
    })
    .otherwise({
        redirectTo:'/'
    })
});

app.factory('service',['$http','$q',function($http,$q){
    return{
        thumbnailprocess : function(url){
            var deferred = $q.defer();
            $http.post('/api/thumbnail/process',{url:url})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject();
            })
            return deferred.promise;
            
        }
    }
}]);

app.controller('thumbnailCtrl',['$scope','service',function($scope,service){
    
    $scope.sendurl = function(url){
        console.log(url);
        if ((url.indexOf('www.')>=0)){
            $scope.url = "http://" + url;
        }
        else{
            $scope.url = "http://www." + url;
        }
        service.thumbnailprocess($scope.url)
        .then(function(data){
           $scope.imagelist = data;
        });
        
    }
}])