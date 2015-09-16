Ext.define('SushimiConsole.model.WarehouseIncomeModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		
		{ name: 'invoiceNumber'},
		{ name: 'type'},
		{ name: 'price', type:'float'},
		{ name: 'incomeDate', type: 'date', format:'d.m.Y H:i:s'},
		
		
		{ name: 'warehouseItemId', type: 'int'},
		{ name: 'warehouseItemName'},
		
		
		{ name: 'ingredientId', type: 'int'},
		{ name: 'ingredientName'},
		
		{ name: 'grossWeight', type:'float'},
		{ name: 'grossUnitId', type: 'int'},
		{ name: 'grossUnitName'},
		
		
		{ name: 'netWeight', type:'float'},
		{ name: 'netUnitId', type: 'int'},
		{ name: 'netUnitName'},
		
		{ name: 'purchaseUserId', type: 'int'},
		{ name: 'purchaseUserName'},
		
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'}, 
		{ name: 'modifiedDate', type: 'date'},
	],
});