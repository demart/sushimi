Ext.define('SushimiConsole.model.ProductModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'code'},
		{ name: 'name'},
		{ name: 'description'},
		
		{ name: 'imageLink'},
		{ name: 'smallImageLink'},
		{ name: 'iconImageLink'},
		
		{ name: 'categoryId', type: 'int'},
		{ name: 'categoryName'},
		{ name: 'itemCount', type: 'int'},
		
		{ name: 'cost', type: 'int'},
		{ name: 'barCost', type: 'int'},
		{ name: 'costPrice', type: 'int'},
		
		{ name: 'type'},
		{ name: 'owner'},
		
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'}, 
		{ name: 'modifiedDate', type: 'date'},
	],
});