Ext.define('SushimiConsole.model.OrderModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'clientName'}, 
		{ name: 'clientPhone'},
		{ name: 'clientAddress'},
		{ name: 'sum'},
		{ name: 'state'},
		{ name: 'type'},
		{ name: 'reason'},
		{ name: 'orderDate', type: 'date'},
		{ name: 'deliveryDate', type: 'date'},
	],
});