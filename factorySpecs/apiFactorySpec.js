/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
describe('LazyApp - Testing factory and service methods', function () {
    var $rootScope, $scope, lazyAppConstants, _$resource, _$http, _$q;
    beforeEach(module("AngularUIBucketApp")); 
    
    beforeEach(inject(['$rootScope','lazyAppConstants','$resource','$q','$http',
        function(_$rootScope_,lazyAppConstants, $resource, $q,$http){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        _$q = $q;
        _$http = $http;
        _$resource = $resource;
         $scope.constants = lazyAppConstants;   
        
    }]));
    it('can get an instance of apiFactory', inject(function(apiFactory) {
               expect(apiFactory).toBeDefined();
             }));
     describe("$httpbackend to test POST and GET methods", function() {
       var _$httpBackend, _apiService;
         beforeEach(inject(['apiFactory','$httpBackend',function(apiFactory,$httpBackend){
           _$httpBackend = $httpBackend;
           _apiService = apiFactory;
        }]));
         it('response should match result in case of proper GETrequest', function() {
             var lstStores = [{name:"store001", address:"mumbai"},{name:"store002", address:"delhi"}];
               _$httpBackend.expectGET('https://karma-demo.futureworkplace.in/vdelivery/api/v1/stores').respond(lstStores);
                var actualResult;
                _apiService.getStoreList().then(function(response) {
                  actualResult = response.data;
                });
                _$httpBackend.flush();
                expect(actualResult).toEqual(lstStores);
             });
             
         it('response should match result in case of proper POSTrequest',function() {
             var returnHtml = "<input></input>", actualResult;
                _$httpBackend.expectPOST('http://jsfiddle.net/echo/html',{html:"input"}).respond(returnHtml);
                 _apiService.sendPOST().then(function(response) {
                  actualResult = response.data;
                });
                _$httpBackend.flush();
                expect(actualResult).toEqual(returnHtml);
            });
        });
    });


