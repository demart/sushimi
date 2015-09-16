Ext.define('SushimiConsoleARM.model.KitchenModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'}, 
		{ name: 'deliveryDate'},
		{ name: 'comment'},
		{ name: 'clientAddress'},
	],
	
	hasMany: {
	    model: 'SushimiConsoleARM.model.KitchenItemModel',
	    name: 'items',
	    primaryKey: 'id',
		foreignKey: 'ownerId',
	},
});