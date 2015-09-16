Ext.define('SushimiConsole.model.IntegrationManyAddressClientsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'addressId',
    fields: [
		{ name: 'addressId', type: 'int' },
		{ name: 'mainAddress'},
		
	],
	belongsTo: [
        { 
        	model: 'SushimiConsole.model.InfoClientsAddresModel', 
        	associationKey: 'id',
        	primaryKey: 'addressId',
        	foreignKey: 'id',
		}
    ],
});