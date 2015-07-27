Ext.define('SushimiConsole.model.WarehouseOutcomeModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		
		{ name: 'type'},		
		{ name: 'amount', type: 'float'},
		{ name: 'outcomeDate', type: 'date'},
		{ name: 'outcomeReason'},
		
		{ name: 'warehouseItemId', type: 'int'},
		{ name: 'warehouseItemName'},
		
		{ name: 'ingredientId', type: 'int'},
		{ name: 'ingredientName'},

		{ name: 'unitId', type: 'int'},
		{ name: 'unitName'},
		
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'}, 
		{ name: 'modifiedDate', type: 'date'},
	],
});