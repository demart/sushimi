Ext.define('SushimiConsole.model.CityModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'}, 
		{ name: 'code'},
		{ name: 'name'}, 
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'},
		{ name: 'modifiedDate', type: 'date'},
	],
});