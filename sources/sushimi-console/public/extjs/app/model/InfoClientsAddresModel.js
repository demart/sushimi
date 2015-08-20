Ext.define('SushimiConsole.model.InfoClientsAddresModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'cityName'},
		{name: 'streetName'},
		{name: 'house'},
		{name: 'flat'},
		

	],
});