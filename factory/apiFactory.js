app.factory('apiFactory', function(lazyAppConstants, $resource, $http, $q) {

  var serviceInstance = {};
  serviceInstance.PageNumber = "";
  serviceInstance.PageSize = "";
  serviceInstance.Sort = false;
 
  
  
  serviceInstance.productList = [
      {
          id:"prod001",
          name:"Nescafe-Coffee",
          rating:3,
          price:50,
          imgSrc:"img/nescafe.jpg",
          noOfItemsinCart:0,
          isAddedToCart:false
      },
      {
         id:"prod002",
          name:"Kitkat-ChocoBar",
          rating:3,
          price:150,
          imgSrc:"img/kitkat.jpg",
          noOfItemsinCart:0,
          isAddedToCart:false
      },
      {
          id:"prod003",
          name:"Cerelac-BabyFood",
          rating:3,
          price:50,
          imgSrc:"img/cerelac.jpg",
          noOfItemsinCart:0,
          isAddedToCart:false
      }
  ];
  
 serviceInstance.cartList = [
      {
          id:"prod004",
          name:"Kellogs-Cereals",
          rating:3,
          price:50,
          imgSrc:"img/kellogs.jpg",
          noOfItemsinCart:1,
          isAddedToCart:true
      },
      {
         id:"prod005",
          name:"Nestle Milk",
          rating:3,
          price:20,
          imgSrc:"img/milk.jpg",
          noOfItemsinCart:2,
          isAddedToCart:true
      }
  ];
  
  var productDetail = {};

  serviceInstance.getProductList = function(){
      var deferred = $q.defer();
        deferred.resolve(serviceInstance.productList);
    return deferred.promise;
  };
  serviceInstance.getCartList = function(){
      var deferred = $q.defer();
        deferred.resolve(serviceInstance.cartList);
    return deferred.promise;
  };
  serviceInstance.createOrder = function(createOrderUrl){
      var deferred = $q.defer();
        deferred.resolve({code:"111234"});
      return deferred.promise;
    };
  
  serviceInstance.getProductDetail = function(prodDetailUrl){
    var deferred = $q.defer();
    $http({
          method: 'GET',
          url: prodDetailUrl, /*TODO: need to pass product id*/
        }).then(function(response){
          deferred.resolve(response.data);
        })  
    return deferred.promise;
  }
  serviceInstance.getProfileInfo = function(){
    var deferred = $q.defer();
    $http({
          method: 'GET',
          url: lazyAppConstants.url+"customers", /*TODO: need to pass product id*/
        }).then(function(response){
            deferred.resolve(response.data._embedded.customers);
        })  
    return deferred.promise;
  };

  serviceInstance.addOrderItemToCart = function(addToCartUrl,orderItemUri){
      var deferred = $q.defer();
      $http({
                  method: 'POST',
                  url: addToCartUrl,
                  data : orderItemUri,
                  headers : {
                              'Content-Type' : 'text/uri-list'
                           },
            }).then(function(response){
                  deferred.resolve(response.status);
      })  
  return deferred.promise;
};

 serviceInstance.getStoreList = function(){
    return $http({
          method: 'GET',
          url: lazyAppConstants.url+"stores", /*TODO: need to pass product id*/
        }).then(function(response){
            return response;
        });
  };

  serviceInstance.sendPOST = function(){
     return $http({
                  method: 'POST',
                  url: "http://jsfiddle.net/echo/html",
                  data : {html:"input"},
                  
            }).then(function(response){
                 return response
      });  
};
  return serviceInstance;
});