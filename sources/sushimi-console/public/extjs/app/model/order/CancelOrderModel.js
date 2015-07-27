Ext.define('SushimiConsole.model.order.CancelOrderModel', {
    extend: 'Ext.data.Model',
    idProperty: 'orderId',
    fields: [
        { name: 'orderId'},
		{ name: 'state'},
		{ name: 'reason'},
	],
});