Ext.define('SushimiConsole.model.WarehouseItemModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		
		{ name: 'ingredientId', type: 'int'},
		{ name: 'ingredientName'},
	
		{ name: 'unitId', type: 'int'},
		{ name: 'unitName'},		
		
		{ name: 'amount', type: 'float'},
		
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'}, 
		{ name: 'modifiedDate', type: 'date'},
	],
});