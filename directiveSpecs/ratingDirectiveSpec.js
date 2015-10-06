/* 5489669 - OS Change CR
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
describe('LazyApp - Product Rating', function () {
    var $scope, _element;
    beforeEach(module("AngularUIBucketApp")); 
    
    beforeEach(inject(['$rootScope','$compile',
        function(_$rootScope_,$compile){
         $scope = _$rootScope_.$new();
         $scope.ratingValue = 5; //<-- Here
         $scope.max = 20,
         $scope.readonly = false,
         $scope.saveRatingToServer = function(r){
             $scope.newRating = r;
         };
        _element = angular.element('<div fundoo-rating rating-value="ratingValue" max="max" on-rating-selected="saveRatingToServer(rating)" readonly="false"></div>');
        $compile(_element)($scope);
        $scope.$digest();
    }]));
    it('should return appropriate class based on rating', function() {
        expect(_element.isolateScope().ratingValue).toBe(5);
        expect(_element.isolateScope().getRatingClass()).toBe('average rated');

    });
    it('should change the rating value on click of stars', function() {
        spyOn($scope, 'saveRatingToServer').and.callThrough();
        _element.isolateScope().toggle(3);
        expect(_element.isolateScope().ratingValue).toBe(4);
        expect($scope.newRating).toEqual(_element.isolateScope().ratingValue);
        expect($scope.saveRatingToServer).toHaveBeenCalled();
    });
  });


