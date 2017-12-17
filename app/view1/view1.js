'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, $interval) {
	

	// function to get the data from the api
    $scope.refreshData = function () {
    	$scope.labels = [];
  		$scope.data = [];
    	$http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
	    .then(function(response) {
	        $scope.myWelcome = response.data;
	        console.log($scope.myWelcome);
	        angular.forEach($scope.myWelcome, function(value, key){
	     		console.log(key + ': ' + value);
	     		$scope.labels.push(value.name);
	     		$scope.data.push(value.price_usd);
			});
	    });
	}


	// first time loading the data
	$scope.refreshData();
  	

  	// every five minute data is reloading
  	$interval($scope.refreshData, 300000);

});