Ext.define('SushimiWebAdmin.model.CategoryListModel', {
    extend: 'Ext.data.Model',
    
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'name'},
		{ name: 'code'},
		{ name: 'parentId'},
		{ name: 'parentName'},
		{ name: 'type'},
		{ name: 'published'},
		{ name: 'deleted'},
		{ name: 'topMenu'},

		],

});
