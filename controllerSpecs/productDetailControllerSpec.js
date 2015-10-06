/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
describe('LazyApp - Product Details & checking other Jasmine test cases', function () {
    var $rootScope, $scope, $controller, _apiService;
    beforeEach(module("AngularUIBucketApp")); 
    beforeEach(inject(['$rootScope','apiFactory','facadeFactory','lazyAppConstants',
        function(_$rootScope_,apiFactory,facadeFactory,lazyAppConstants){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        _apiService = apiFactory; 
        
        $scope.facade = facadeFactory;
        $scope.constants = lazyAppConstants;   
    }]));
     describe("Different jasmine Test cases", function() {
        var _$filter;
         beforeEach(inject(['$controller','$filter',function(_$controller_,_$filter_){
            $controller =  _$controller_('productDetailController', 
             {'$scope': $scope, 'apiFactory' : _apiService});
             _$filter = _$filter_;
         }]))
         it('$on- testing $on angular function', function() {
             var prodDetailObj = {
                description:"abc",
                specification:"efg",
                photo:"jpg"
            };
            $rootScope.$broadcast('updateProductDetail',  {message : prodDetailObj});
            expect($controller.productDetail).toEqual(prodDetailObj);
            expect($controller.groups[0].content).toEqual(prodDetailObj.description);
            
        });
         it('$watch- testing angular $watch - Not implemented', function() {
          
        });
         it("$filter- testing angular $filter - reverse input string", function() {
           var inputStr = 'hello', result;
            result = _$filter('reverseFilter')(inputStr, true);
            expect(result).toEqual('OLLEH');
        });
     });
    });


