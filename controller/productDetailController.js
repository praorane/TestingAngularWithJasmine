app.controller('productDetailController', ['$scope','$rootScope','apiFactory', 
function($scope,$rootScope,apiFactory){

  $scope.facade.setTitle($scope.constants.ProductDetailsHeading);
  $scope.facade.setActiveTab($scope.constants.ProductTab);
  $scope.facade.setCartPage(false);
  
  var self = this;
  self.productDetail = {};

   
  /*Accordion*/
    self.oneAtATime = true;
    self.groups = [
      {
        title: 'DESCRIPTION',
        content: '',
		isCollapsed:true
		
      },
      {
        title: 'SPECIFICATION',
        content: '',
		isCollapsed:true
      },
      {
        title: 'REVIEWS',
        content: 'Ok',
		isCollapsed:true
      }
    ];

$rootScope.$on('updateProductDetail', function (event, args) 
 {
      
   	self.productDetail = args.message;
  	self.groups[0].content = self.productDetail.description;
  	self.groups[1].content = self.productDetail.specification;
  	self.productDetail.imgSrc = $scope.constants.imgBase64Str + self.productDetail.photo;
  });

}]);

app.filter('reverseFilter', function() {
  return function(input, uppercase) {
    input = input || '';
    var out = "";
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
})
