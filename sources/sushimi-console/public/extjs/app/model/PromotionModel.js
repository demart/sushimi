Ext.define('SushimiConsole.model.PromotionModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'name'},
		{ name: 'type'},
		{ name: 'valueType'},
		{ name: 'discount', type: 'float'},
		{ name: 'fromTime', type: 'date'},
		{ name: 'toTime', type: 'date'},
	],
});