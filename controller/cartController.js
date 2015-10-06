app.controller('cartController', ['$scope','$modal','$q','userProfileService','apiFactory',
 function($scope, $modal, $q, userProfileService,apiFactory){
	
    $scope.facade.setTitle($scope.constants.CartHeading);
    $scope.facade.setActiveTab($scope.constants.CartTab);
    $scope.facade.setCartPage(true);

    var self = this;
    self.cartListItems = [];
    self.cartItemsUriQuantity = [];
    self.createOrderDetails = "";

    function evaluateTotalCost() {
    var total = 0;
    angular.forEach(self.cartListItems, function(item) {
       total += item.noOfItemsinCart * item.price;
       });
    return total;
    };

    self.getCartList = function(){
        $scope.facade.setIsLoading(true);
        if(self.cartListItems.length == 0){
        apiFactory.getCartList().then(function(cartList){
            $scope.facade.cartItemCount = cartList.length;                
            self.cartListItems = cartList; 
            self.totalCost = evaluateTotalCost();
        });
      }
      $scope.facade.setIsLoading(false); 
    };

    self.decrementNoIfCartItems = function(product){
      if(product.noOfItemsinCart > 1){
          $scope.facade.setIsLoading(true);
          product.noOfItemsinCart = product.noOfItemsinCart -1 ;
          self.totalCost = evaluateTotalCost();
          $scope.facade.setIsLoading(false);

       }	  
    };

    self.incrementNoOfCartItems = function(product){
        $scope.facade.setIsLoading(true);
          product.noOfItemsinCart = product.noOfItemsinCart +1 ;
          self.totalCost = evaluateTotalCost();
          $scope.facade.setIsLoading(false);
    };

    self.removeItem = function(productToBeRemoved, idx) {
        $scope.facade.setIsLoading(true);
        productToBeRemoved.noOfItemsinCart = 1;
        productToBeRemoved.isAddedToCart = false;
        apiFactory.productList.push(productToBeRemoved);
        self.cartListItems.splice(idx,1);
        $scope.facade.cartItemCount =  self.cartListItems.length;
        self.totalCost = evaluateTotalCost();
        $scope.facade.setIsLoading(false);
    };

    self.createOrder = function(){
        $scope.facade.setIsLoading(true);
        apiFactory.createOrder().then(function(resp){
            $scope.facade.orderId = resp.code;
            self.cartListItems = [];
            $scope.facade.cartItemCount =  self.cartListItems.length;
            $scope.facade.setIsLoading(false);
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl as instanceCtrl'
            });  
        });
    };
  }]);



// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($modalInstance,facadeFactory) {
  var self=this;
  self.createOrderDetails = facadeFactory.orderId;
  self.ok = function () {
            $modalInstance.dismiss('cancel');
            window.location.href="index.html#/orderStatus"; 
  };
});

