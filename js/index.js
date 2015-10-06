
var app = angular.module('AngularUIBucketApp', [
    "ngRoute",
     "mobile-angular-ui",
     "ui.bootstrap",
     "ngResource"
  ]);

    app.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/',{
        templateUrl:"template/myProfile.html",
        controller:'myProfileController',
        controllerAs:'ctrl'
    }).
    when('/product',{
        templateUrl:"template/products.html",
        controller:'productController',
        controllerAs:'ctrl'
        }).
    when('/productDetail',{
        templateUrl:"template/productDetail.html",
        controller:'productDetailController',
        controllerAs:'ctrl'
        }).
    when('/map',{
        templateUrl:"template/map.html",
        controller:'mapController',
         controllerAs:'ctrl'
        }).
    when('/cart',{
        templateUrl:"template/cart.html",
         controller:'cartController',
         controllerAs:'ctrl'
        }).
    when('/profile',{
        templateUrl:"template/myProfile.html",
         controller:'myProfileController',
        controllerAs:'ctrl'
        }).
    when('/orderStatus',{
        templateUrl:"template/orderStatus.html",
         controller:'orderStatusController',
           controllerAs:'ctrl'
        });

});

app.constant("lazyAppConstants",
  (function() {
    var  url = "https://karma-demo.futureworkplace.in/vdelivery/api/v1/"; 
    return {
      "url": url,
      "imgBase64Str" : "data:image/png;base64,",
  	  "ProductTab" : "Product",
  	  "OrderTab" : "Order",
  	  "ProfileTab" : "Profile",
       "CartTab" : "Cart",
      "ProductHeading": "Products",
      "ProductDetailsHeading" : "Product Details",
      "OrderStatusHeading" : "Order Status",
      "ProfileHeading" : "My Profile",
      "MapHeading" : "Preferred Store",
      "CartHeading" : "Cart",
      "PrefferedStore":"My Shop Chenyes,WA 6328",
      "IsLoading":false
    }
  })()
);


      

 