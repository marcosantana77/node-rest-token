app.controller('RegisterController', ['$scope','$http','$window', function($scope,$http,$window) { 
	
	$scope.title = 'Client Rest Token'; 
	$scope.page = 'Register'; 
  	$scope.user = {email: '', password: ''};

  	$scope.register = function(){
	  	var url = "http://localhost:3000/users/signin";
	  	$http({
		  method: 'POST',
		  url: url,
		  data :{
	          email: $scope.user.email, 
	          password: $scope.user.password
	        }
		}).then(function successCallback(response) {			
			if(response.data.type==true){
				localStorage.setItem("token", response.data.token);
				$window.location.href = "./";
			}else{
			    $scope.content = response.data.data;
			}
	  	}, 
	  	function errorCallback(response) {
		   $scope.content = 'error'; 
	  	});
	}
}]);