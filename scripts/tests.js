QUnit.module("DataStore Test");

/* ===================== DataStore code ===================== */
(function(window) {
    'use strict';

    //loads var App with windwo.App object or empty object
    //whichever one loads first
    var App = window.App || {};

    //contstructor
    function DataStore() {
        console.log('running the DataStore function');
        this.data = {};
    }

    DataStore.prototype.add = function(key, val) {
        this.data[key] = val;
    };

    DataStore.prototype.get = function(key) {
        return this.data[key];
    };

    DataStore.prototype.getAll = function() {
        return this.data;
    };

    DataStore.prototype.remove = function(key) {
        delete this.data[key];
    };

    App.DataStore = DataStore;
    window.App = App;
})(window);


var ds = new App.DataStore();


/* ===================== DataStore TESTS ===================== */
QUnit.test("DataStore test", function(assert) {
    ds.add('m@bond.com', 'tea');
    assert.ok(ds.get('m@bond.com') == "tea", "Passed!");

    ds.add('james@bond.com', 'eshpressho');
    assert.ok(ds.get('james@bond.com') == "eshpressho", "Passed!");

    assert.deepEqual(ds.getAll(), {
        "james@bond.com": "eshpressho",
        "m@bond.com": "tea"
    }, "Passed! GetAll:Two values in object");

    ds.remove('james@bond.com');

    assert.deepEqual(ds.getAll(), {
        "m@bond.com": "tea"
    }, "Passed! GetAll:One value left after remove");

    assert.ok(ds.get('m@bond.com') == "tea", "Passed!");

    assert.ok(ds.get('james@bond.com') == undefined, "Passed! Get removed value");
});




QUnit.module("Truck Test");

/* ===================== TRUCK CODE ===================== */
/* Unable to test code due to the functions not returning any values and no method to confirm if
values are added correctly, other than the console logs. Needed to add ShowOrder method to show
the customer email and order after createOrder and deliverOrder methods are called to confirm correct storage and deletion of values. */

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
    };

    //removes item from db using custeomer's email add
    //customerId = emailAddress
    Truck.prototype.deliverOrder = function(customerId) {
        //console.log('Delivering order for' + customerId);
        this.db.remove(customerId);

    };

    //I tried passing each value of the customerIdArray and
    // this.db.get(id) to a function to return the value and test it
    // but it kept returned Undefined.
    // I just returned the array by using Object.values(this.db.getAll())
    Truck.prototype.printOrders = function() {

        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
        }.bind(this));

        return Object.values(this.db.getAll());
    };

    App.Truck = Truck;
    window.App = App;

})(window);


//To recieve the window object for use inside the function body and retrieves
//the constructors you defines as part of the window.App namespace
(function(window) {
    'use strict';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;

    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;


})(window);


/* ===================== TRUCK TESTS ===================== */
QUnit.test("Trucktest", function(assert) {


    var expValues = [{
            "coffee": "double mocha",
            "emailAddress": "me@goldfinger.com"
        },

        {
            "coffee": "decaf",
            "emailAddress": "dr@no.com"
        },

        {
            "coffee": "earl grey",
            "emailAddress": "m@bond.com"
        }

    ];


    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    var printedOrders = myTruck.printOrders();

    assert.deepEqual(printedOrders, expValues, "Passed!");


});
