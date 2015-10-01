Ext.define('SushimiConsole.model.reports.ProductPeriodStatModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'name'},
		{ name: 'amount', type: 'int'},
		{ name: 'netCost', type: 'int'},
		{ name: 'freeCount', type: 'int'},
		{ name: 'freeNetCost', type: 'int'},
	],
});