app.controller('LoginController', ['$scope','$http','$window', function($scope,$http,$window) { 
	
	$scope.title = 'Client Rest Token'; 
	$scope.page = 'Login'; 
  	$scope.user = {email: '', password: ''};

	$scope.login = function(){
	  	var url = "http://localhost:3000/users/login";
	  	$http({
			method: 'POST',
			url: url,
			data : {
				email: $scope.user.email, 
				password: $scope.user.password
			}
		}).then(
			function successCallback(response) {
		    	if(response.data.type==true){
					localStorage.setItem("token", response.data.token);
					$window.location.href = "index.html";
				}else{
					$scope.content = response.data.data;
				}
		  	}, 
		  	function errorCallback(response) {
			   $scope.content = response; 
	  	});
	};
}]);