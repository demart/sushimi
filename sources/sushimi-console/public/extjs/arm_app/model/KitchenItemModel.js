Ext.define('SushimiConsoleARM.model.KitchenItemModel', {
    extend: 'Ext.data.Model',
    idProperty: 'productId',
    fields: [
		{ name: 'productId', type: 'int' },
		{ name: 'count', type: 'int'},
		{ name: 'orderId', type: 'int'},
	],
	belongsTo: [
        { 
        	model: 'SushimiConsoleARM.model.KitchenItemModel', 
        	associationKey: 'orderId',
        	primaryKey: 'productId',
        	foreignKey: 'orderId',
		}
    ],
});