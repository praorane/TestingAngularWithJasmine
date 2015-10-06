/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
describe('LazyApp - mainController', function () {
    var $rootScope, $scope, $controller, _apiService, _userProfileService, _facadeService;
    beforeEach(module("AngularUIBucketApp")); 
    beforeEach(inject(['$rootScope','apiFactory','userProfileService','facadeFactory','lazyAppConstants',
        function(_$rootScope_,apiFactory, userProfileService, facadeFactory,lazyAppConstants){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        _apiService = apiFactory;
        _userProfileService = userProfileService;
        _facadeService = facadeFactory;
         $scope.facade = _facadeService;
         $scope.constants = lazyAppConstants;   
    }]));
     describe("Profile Details", function() {
         var deferred, _$q;
         beforeEach(inject(['$controller','$q',function(_$controller_,$q){
            _$q = $q;
            $controller =  _$controller_('myProfileController', 
             {'$scope': $scope, 'apiFactory' : _apiService,'userProfileService' : _userProfileService, 'facadeFactory' : _facadeService});
         }]))
         it('Title of the page to be set as: My Profile', function() {
            expect( $scope.facade.heading).toBe("My Profile");
        });
         it('Active tab of the page to be set as: Profile', function() {
            expect( $scope.facade.selectedTab).toBe("Profile");
        });
         it("On my profile page expect IsCartPage flag to be set 'false'", function() {
            expect( $scope.facade.cartPage).toBe(false);
        });
         it("Get profile details of the logged-in customer", function(){
            var userObj = {name:"abc", email:"abc@corp.in", mobile:"123456", address:"mumbai"};
            deferred = _$q.defer();
            spyOn(_userProfileService, "getUserProfileInfo").and.returnValue(deferred.promise);
            deferred.resolve(userObj);
            $controller.getProfileInfo();
            $scope.$apply();
             
            expect($controller.userName).toBe("abc");
            expect($controller.email).toBe("abc@corp.in");
            expect($controller.mobNum).toBe("123456");
            expect($controller.address).toBe("mumbai");
            
        });
     });
    });


