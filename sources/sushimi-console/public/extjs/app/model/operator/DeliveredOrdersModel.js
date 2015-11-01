Ext.define('SushimiConsole.model.operator.DeliveredOrdersModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'orderNumber'},
		{ name: 'clientName'}, 
		{ name: 'clientPhone'},
		{ name: 'clientAddress'},
		{ name: 'sum'},
		{ name: 'state'},
		{ name: 'source'},
		{ name: 'type'},
		{ name: 'reason'},
		{ name: 'orderDate', type: 'date'},
		{ name: 'deliveryDateKitchen'},
		{ name: 'timer'},
	],
});