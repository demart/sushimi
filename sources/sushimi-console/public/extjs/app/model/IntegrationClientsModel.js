Ext.define('SushimiConsole.model.IntegrationClientsModel', {
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
		hasMany: {
		    model: 'SushimiConsole.model.IntegrationManyClientsModel',
		    name: 'clients',
		    primaryKey: 'id',
			foreignKey: 'ownerId',
		},
});