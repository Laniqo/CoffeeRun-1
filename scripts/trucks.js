(function(window) {
    'use strict';
    var App = window.App || {};

    //constructor
    //truckId is identifier
    //db holds the customer's email address and coffee order
    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }


    //order = {emailAddress: 'x@y.com', coffee: 'coffeeType'}
    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
        return this;
    };

    //removes item from db using custeomer's email add
    //customerId = emailAddress
    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for' + customerId);
        this.db.remove(customerId);
    };

    //Rather than using this.db.get(id) to get the orders,
    //I am passing the indexed array at each iteration of the
    //forEach loop and pass it to the showOrder() function
    //which is already tested as working properly
    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id, index, arr) {
            //console.log(this.db.get(id));
            //console.log('showOrder');
            this.showOrder(arr[index]);
        }.bind(this));

        var newArr = Object.values(this.db.getAll());
        return newArr;
    };



    App.Truck = Truck;
    window.App = App;

})(window);
