app.controller('MainController', ['$scope','$http', function($scope,$http) { 

	$scope.title = 'Client Rest Token'; 

  	var url = "http://localhost:3000/users/me";
  	var token = localStorage.getItem("token");
  	
  	$http({
	  method: 'POST',
	  url: url,
	  headers: {"Authorization":"Bearer "+token},
	  data : {
	  	token : token
	  }
	}).then(function successCallback(response) {
	    $scope.content = 'Olá ' + response.data.data.email;
	  	}, 
	  	function errorCallback(response) {
		   $scope.content = 'forbidden'; 
  	});

}]);