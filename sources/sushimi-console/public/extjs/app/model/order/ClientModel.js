Ext.define('SushimiConsole.model.order.ClientModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int' },
		{ name: 'name'},
		{ name: 'iin'},
		{ name: 'phoneNumber'},
		{ name: 'birthdate', type: 'date' },
		{ name: 'email'},
		{ name: 'comment'},
		{ name: 'status'},
		{ name: 'type'},
		
		{ name: 'currentTotalOrderSum'},
		{ name: 'currentDiscountPercent'},
		{ name: 'nextDiscountSum'},
		{ name: 'nextDiscountPercent'},
	],
});