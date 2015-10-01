Ext.define('SushimiConsole.model.InfoClientsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'email'},
		{ name: 'currentTotalOrderSum', type: 'int'},
		{ name: 'phoneNumber'},
		{ name: 'name'},
		{ name: 'type'},
		{ name: 'status'},
		],
});