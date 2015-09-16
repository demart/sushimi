Ext.define('SushimiConsole.model.DeliveryExtraPriceModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'name'},
		{ name: 'price', type: 'int'}
	],
});