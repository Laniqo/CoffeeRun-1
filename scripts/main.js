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
