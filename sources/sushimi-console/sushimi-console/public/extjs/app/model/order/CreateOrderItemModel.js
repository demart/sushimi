Ext.define('SushimiConsole.model.order.CreateOrderItemModel', {
    extend: 'Ext.data.Model',
    idProperty: 'productId',
    fields: [
		{ name: 'productId', type: 'int' },
		{ name: 'count', type: 'int'},
		{ name: 'orderId', type: 'int'},
	],
	belongsTo: [
        { 
        	model: 'SushimiConsole.model.order.CreateOrderModel', 
        	associationKey: 'orderId',
        	primaryKey: 'productId',
        	foreignKey: 'orderId',
		}
    ],
});