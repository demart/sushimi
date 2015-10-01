Ext.define('SushimiConsole.model.IntegrationManyClientsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'clientId',
    fields: [
		{ name: 'clientId', type: 'int' },
		{ name: 'mainClient'},
		{ name: 'orderSum', type: 'int' },

	],
	belongsTo: [
        { 
        	model: 'SushimiConsole.model.IntegrationClientsModel', 
        	associationKey: 'id',
        	primaryKey: 'clientId',
        	foreignKey: 'id',
		}
    ],
});