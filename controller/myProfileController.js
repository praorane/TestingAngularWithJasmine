app.controller('myProfileController', ['$scope','apiFactory','userProfileService','facadeFactory',
 function($scope,apiFactory,userProfileService,facadeFactory){

    $scope.facade.setTitle($scope.constants.ProfileHeading);
    $scope.facade.setActiveTab($scope.constants.ProfileTab);
    $scope.facade.setCartPage(false);
 	var self = this;
	self.getProfileInfo = function(){
		$scope.facade.setIsLoading(true);
	  userProfileService.getUserProfileInfo().then(function(resp){
	        self.userName = resp.name;
        	self.email = resp.email;
        	self.mobNum = resp.mobile;
		self.address = resp.address;
                $scope.facade.cartItemCount = apiFactory.cartList.length;
                $scope.facade.setIsLoading(false);
          });
       };
    }]);