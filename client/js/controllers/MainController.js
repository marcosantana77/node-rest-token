app.controller('MainController', ['$scope','$http','$window', function($scope,$http,$window) { 

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
	    $scope.content = 'Hello ' + response.data.data.email;
	  	}, 
	  	function errorCallback(response) {
		   $scope.content = 'forbidden'; 
  	});

  	$scope.logout = function()
  	{
  		localStorage.removeItem("token");
  		$window.location.href = "./";
  	};
}]);