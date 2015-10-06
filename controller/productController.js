app.controller('productController', ['$scope','$rootScope','apiFactory','userProfileService',
  function($scope,$rootScope,apiFactory,userProfileService){
    
	//$rootScope.heading = constants.ProductHeading;
	//$rootScope.cartPage = false;
	//facadeService.selectedTab = constants.ProductTab;
  $scope.facade.setTitle($scope.constants.ProductHeading);
  $scope.facade.setActiveTab($scope.constants.ProductTab);
  $scope.facade.setCartPage(false);
  var self = this;
  self.productList = [];
  
  
   self.getProductList = function(){
       $scope.facade.setIsLoading(true);
         apiFactory.getProductList().then(function(products){
         self.productList = products; 
         $scope.facade.setIsLoading(false);
      });
   };

   self.getProductDetail = function(prod){
    $scope.facade.setIsLoading(true);
    apiFactory.getProductDetail(prod.detailLink).then(function(detailObj){   
        $rootScope.$broadcast('updateProductDetail', {message : detailObj});
    });
     $scope.facade.setIsLoading(false);
  };
 
   self.addToCart = function(itemTobeAdded){
    $scope.facade.setIsLoading(true);
    itemTobeAdded.isAddedToCart = true;
    itemTobeAdded.noOfItemsinCart ++;
    apiFactory.cartList.push(itemTobeAdded);
    apiFactory.productList.splice(apiFactory.productList.indexOf(itemTobeAdded), 1);
    $scope.facade.cartItemCount =  $scope.facade.cartItemCount + 1;
    $scope.facade.setIsLoading(false);  
    }; 
}]);
