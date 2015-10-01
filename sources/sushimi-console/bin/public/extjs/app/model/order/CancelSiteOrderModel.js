Ext.define('SushimiConsole.model.order.CancelSiteOrderModel', {
    extend: 'Ext.data.Model',
    idProperty: 'siteOrderId',
    fields: [
        { name: 'siteOrderId'},
		{ name: 'state'},
		{ name: 'reason'},
	],
});