Ext.define('SushimiConsole.model.CategoryModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'code'},
		{ name: 'name'},
		{ name: 'parentCategoryId', type: 'int'},
		{ name: 'parentCategoryName'},
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'}, 
		{ name: 'modifiedDate', type: 'date'},
	],
});