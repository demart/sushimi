Ext.define('SushimiConsole.model.reports.OrderPeriodStatModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'name'},
		{ name: 'amount', type: 'int'},
		{ name: 'revenue', type: 'int'},
		{ name: 'deliveryCost', type: 'int'},
		{ name: 'deliveryExtraCost', type: 'int'},
		{ name: 'netCost'},
		{ name: 'income', type: 'int'},
		{ name: 'percent', type: 'float'},
	],
});