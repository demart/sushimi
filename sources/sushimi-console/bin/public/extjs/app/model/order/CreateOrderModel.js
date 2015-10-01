Ext.define('SushimiConsole.model.order.CreateOrderModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
		{ name: 'clientId', type: 'int' },
		{ name: 'clientAddressId', type: 'int'},
		{ name: 'promotionId', type: 'int'},
		{ name: 'siteId', type: 'int'},
		{ name: 'personCount'},
		{ name: 'personCash'},
		{ name: 'type'},
		{ name: 'toTime', type: 'date' },
		{ name: 'comment' },
	],
	hasMany: {
	    model: 'SushimiConsole.model.order.CreateOrderItemModel',
	    name: 'items',
	    primaryKey: 'id',
		foreignKey: 'ownerId',
	},
	

});