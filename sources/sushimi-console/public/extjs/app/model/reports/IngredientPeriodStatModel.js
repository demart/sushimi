Ext.define('SushimiConsole.model.reports.IngredientPeriodStatModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'name'},
		{ name: 'unit'},
		{ name: 'amount', type: 'int'},
	],
});