Ext.define('SushimiConsole.model.PromotionModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'name'},
		{ name: 'type'},
		{ name: 'valueType'},
		{ name: 'discount', type: 'float'},
		{ name: 'orderSum', type: 'int'},
		{ name: 'isPublished'},
		{ name: 'productIdName'},
		{ name: 'productCount'},
		{ name: 'fromTime'},
		{ name: 'toTime'},
	],
});