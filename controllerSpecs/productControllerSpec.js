/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
describe('LazyApp - Product and Product Details Screen', function () {
    var $rootScope, $scope, $controller, _apiService, _userProfileService, _$q;
    beforeEach(module("AngularUIBucketApp")); 
    
    beforeEach(inject(['$rootScope','apiFactory','userProfileService','$q','facadeFactory','lazyAppConstants',
        function(_$rootScope_,apiFactory, userProfileService,$q,facadeFactory,lazyAppConstants){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        _$q = $q;
        _apiService = apiFactory;
        _userProfileService = userProfileService;
        
         $scope.facade = facadeFactory;
         $scope.constants = lazyAppConstants;   
        
    }]));
     describe("Product List Page", function() {
        var deferred;
        var cartList = [
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
         beforeEach(inject(['$controller',function(_$controller_){
           
            $controller =  _$controller_('productController', 
             {'$scope': $scope, 'apiFactory' : _apiService,'userProfileService' : _userProfileService, '$rootScope': $rootScope});
            $controller.cartListItems = cartList;
        }]));
         
         it('Title of the page to be set as: Products', function() {
            expect( $scope.facade.heading).toBe("Products");
         });
         it('Active tab of the page to be set as: Product', function() {
            expect( $scope.facade.selectedTab).toBe("Product");
        });
         it("On my profile page expect IsCartPage flag to be set 'false'", function() {
            expect( $scope.facade.cartPage).toBe(false);
        });
         it("Get product specifications on click of a product", function(){
            var prodObj = {detailLink:"testLink"};
            var prodDetailObj = {
                description:"abc",
                specification:"efg",
                photo:"jpg"
            };
            deferred = _$q.defer();
            spyOn(_apiService, "getProductDetail").and.returnValue(deferred.promise);
            _apiService.getProductDetail(prodObj.detailLink);
            deferred.resolve(prodDetailObj);
            
            spyOn($rootScope, '$broadcast').and.callThrough();
            $rootScope.$broadcast('updateProductDetail',  {message : prodDetailObj});

            $controller.getProductDetail(prodObj);
            $scope.$apply();
             
            expect($rootScope.$broadcast).toHaveBeenCalledWith('updateProductDetail',{message : prodDetailObj});
            
        });
        
        it("Add product to cart", function(){
            var prodObj = {
              id:"prod004",
              name:"Kellogs-Cereals",
              rating:3,
              price:50,
              imgSrc:"img/kellogs.jpg",
              noOfItemsinCart:0,
              isAddedToCart:false
            };
            $controller.addToCart(prodObj);
            expect( prodObj.noOfItemsinCart).toBe(1);
            expect( $scope.facade.cartItemCount).toBe(1); 
            expect( _apiService.cartList).toEqual([prodObj]);
        });
     });
    });

