Ext.define('SushimiWebAdmin.model.ProductsListModel', {
    extend: 'Ext.data.Model',
    
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'name'},
		{ name: 'code'},
		{ name: 'categoryName'},
		{ name: 'cost'},
		{ name: 'description'},
		{ name: 'categoryId'},
		{ name: 'isPublished'},
		{ name: 'type'},
		{ name: 'itemCount'}

		],

});
