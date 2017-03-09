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
