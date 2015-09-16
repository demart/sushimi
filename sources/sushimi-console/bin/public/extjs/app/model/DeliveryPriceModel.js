Ext.define('SushimiConsole.model.DeliveryPriceModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'name'},
		{ name: 'price', type: 'int'}
	],
});