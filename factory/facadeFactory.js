app.service('facadeFactory',['lazyAppConstants',

  function(lazyAppConstants){
    var self = this;
    self.cartList = [];
    self.cartItemCount = 0;
    self.homeCoordinates = [];
    self.cartPage = false;
    self.selectedTab = lazyAppConstants.ProductTab;
    self.heading = lazyAppConstants.ProductHeading;
    self.preferredStore = lazyAppConstants.PrefferedStore;
    self.isLoading = lazyAppConstants.IsLoading;
    self.addedOrderItemURI = [];
    self.orderId = '';
  	
    self.setActiveTab = function(newTab){
       self.selectedTab = newTab;
    };

    self.setTitle = function(newTitle){
       self.heading = newTitle;
    };

    self.setCartPage = function(isCartPage){
        self.cartPage = isCartPage;
    };

    self.setPreferredStore = function(prefLoc){
        self.preferredStore = prefLoc;
    };

    self.setIsLoading = function(loading){
        self.isLoading = loading;
    };
  	return self;
  }]);