Ext.define('SushimiConsole.model.operator.CourierManyModel', {
    extend: 'Ext.data.Model',
    idProperty: 'courierId',
    fields: [
		{ name: 'courierId', type: 'int' },
		{ name: 'geoLongitude'},
		{ name: 'geoLatitude'},

	],
	belongsTo: [
        { 
        	model: 'SushimiConsole.model.operator.CourierModel', 
        	associationKey: 'id',
        	primaryKey: 'courierId',
        	foreignKey: 'id',
		}
    ],
});