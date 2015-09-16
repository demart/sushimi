Ext.define('SushimiConsole.model.order.OrderProductModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'code'},
		{ name: 'name'},
		
		{ name: 'amount', type: 'int'},
		{ name: 'sum', type: 'int'},
		
		{ name: 'categoryId', type: 'int'},
		{ name: 'categoryName'},
		
		{ name: 'cost', type: 'int'},
		{ name: 'barCost', type: 'int'},
		
		{ name: 'type'},
		{ name: 'owner'},
	],
});