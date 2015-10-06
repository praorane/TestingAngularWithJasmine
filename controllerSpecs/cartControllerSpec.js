/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
describe('LazyApp - Cart Screen', function () {
    var $rootScope, $scope, $controller, _apiService, _userProfileService, _$q, modalInstance, modalOptions;
    beforeEach(module("AngularUIBucketApp")); 
    
    beforeEach(inject(['$rootScope','apiFactory','userProfileService','$q','facadeFactory','lazyAppConstants',
        function(_$rootScope_,apiFactory, userProfileService, $q,facadeFactory,lazyAppConstants){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        _$q = $q;
        
        // Create a mock object using spies
        modalInstance =   modalInstance = {
        open: jasmine.createSpy('modalInstance.open'),
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
        };
        modalOptions = {
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl as instanceCtrl',
            };
        _apiService = apiFactory;
        _userProfileService = userProfileService;
        
         $scope.facade = facadeFactory;
         $scope.constants = lazyAppConstants;   
        
    }]));
     describe("Cart Page", function() {
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
           
            $controller =  _$controller_('cartController', 
             {'$scope': $scope, 'apiFactory' : _apiService,'userProfileService' : _userProfileService, '$modal':modalInstance, '$q':_$q});
            $controller.cartListItems = cartList;
             }]))
         it('Title of the page to be set as: Cart', function() {
            expect( $scope.facade.heading).toBe("Cart");
         });
         it('Active tab of the page to be set as: Cart', function() {
            expect( $scope.facade.selectedTab).toBe("Cart");
        });
         it("On my profile page expect IsCartPage flag to be set 'true'", function() {
            expect( $scope.facade.cartPage).toBe(true);
        });
         it("On login, get existing added items in the cart of user", function(){
            $controller.cartListItems = [];
           
            deferred = _$q.defer();
            spyOn(_apiService, "getCartList").and.returnValue(deferred.promise);
            deferred.resolve(cartList);
            $controller.getCartList();
            $scope.$apply();
             
            expect($controller.cartListItems.length).toBe(2);
            expect($controller.totalCost).toBe(90);
            
        });
        
         it("Increment number of items of a product & check the total order cost", function() {
            
             var product = {id:"prod005",
                  name:"Nestle Milk",
                  rating:3,
                  price:20,
                  imgSrc:"img/milk.jpg",
                  noOfItemsinCart:2,
                  isAddedToCart:true};
              $controller.incrementNoOfCartItems(product);
             expect(product.noOfItemsinCart).toBe(3);
             
        });
         it("Decrement number of items of a product & check the total order cost", function() {
            
             var product = {id:"prod005",
                  name:"Nestle Milk",
                  rating:3,
                  price:20,
                  imgSrc:"img/milk.jpg",
                  noOfItemsinCart:2,
                  isAddedToCart:true};
              $controller.decrementNoIfCartItems(product);
             expect(product.noOfItemsinCart).toBe(1);
            
        });
        
         it("Remove the product from cart of user & check the total order cost", function() {
            
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
             
             var productList = [
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
            var productTobeRemoved = {id:"prod005",
                  name:"Nestle Milk",
                  rating:3,
                  price:20,
                  imgSrc:"img/milk.jpg",
                  noOfItemsinCart:2,
                  isAddedToCart:true};
           $controller.removeItem(productTobeRemoved,2);
           expect(productTobeRemoved.noOfItemsinCart).toBe(1);
           expect(productTobeRemoved.isAddedToCart).toBe(false);
           expect(_apiService.productList.length).toBe(4);
           

        });
        
         it("Create the order invoice", function() {
            deferred = _$q.defer();
            spyOn(_apiService, "createOrder").and.returnValue(deferred.promise);
            deferred.resolve({code:"1111"});
            $controller.createOrder();
            $scope.$apply();
            
            expect(modalInstance.open).toHaveBeenCalledWith(modalOptions);     
        });
     });
    });


