Ext.define('SushimiConsole.model.operator.CourierModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'ordersOnDelivery'},
		{ name: 'name'},
		{ name: 'date', type: 'date'},
		{ name: 'addressesOnDelivery'},
		{ name: 'geoLongitude'},
		{ name: 'geoLatitude'},
		{ name: 'status', type: 'int'},
		{ name: 'timeActive'},
		{ name: 'pointsCount', type: 'int'}
	],
	
	hasMany: {
	    model: 'SushimiConsole.model.operator.CourierManyModel',
	    name: 'geoPosition',
	    primaryKey: 'id',
		foreignKey: 'ownerId',
	},
	
});