Ext.define('SushimiConsole.model.ProductCostingModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		
		{ name: 'productId'},
		{ name: 'productName'},
		
		{ name: 'warehouseItemId'},
		{ name: 'warehouseItemName'},
		
		{ name: 'ingredientId'},
		{ name: 'ingredientName'},
		
		{ name: 'unitId'},
		{ name: 'unitName'},
		
		{ name: 'amount'},
		
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'}, 
		{ name: 'modifiedDate', type: 'date'},
	],
});