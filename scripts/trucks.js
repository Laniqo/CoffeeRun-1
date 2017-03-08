

(function(window){
	'use strict';
	var App = window.App || {};

	//constructor
	//truckId is identifier
	//db holds the customer's email address and coffee order
	function Truck(truckId, db){
		this.truckId = truckId;
		this.db = db;
	}


	//order = {emailAddress: 'x@y.com', coffee: 'coffeeType'}
	Truck.prototype.createOrder = function(order){
		console.log('Adding order for ' + order.emailAddress);
		this.db.add(order.emailAddress, order);
		return this;
	};

	//removes item from db using custeomer's email add
	//customerId = emailAddress
	Truck.prototype.deliverOrder = function(customerId){
		console.log('Delivering order for' + customerId);
		this.db.remove(customerId);
	};

	Truck.prototype.printOrders = function() {
		var customerIdArray = Object.keys(this.db.getAll());

		console.log('Truck #' + this.truckId + ' has pending orders:');
		customerIdArray.forEach(function(id){
			console.log(this.db.get(id));
		}.bind(this));
	};

	//ADDED FUNCTIONS
		Truck.prototype.OrderInfo = function(info2){
		return this;
	};
	
	Truck.prototype.showOrder = function(customerId){
		return this.db.get(customerId);
	};

	App.Truck = Truck;
	window.App = App;

})(window);