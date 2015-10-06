app.service('userProfileService',  function($http,$q){
	var self = this;
    self.userProfile = {
        name:"Mark H.",
        email:"mark@abc.corp",
        mobile:"+1-12345687",
        address:"Atlanta, USA",
        location:{coordinates:''},
        
    };

    self.getUserProfileInfo = function(){
        var deferred = $q.defer();
        deferred.resolve(self.userProfile);
        return deferred.promise;
    }
 
});