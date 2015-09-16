Ext.define('SushimiConsole.model.order.ClientAddressModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'address'},
		
		{ name: 'clientId', type: 'int'},
		{ name: 'addressType'},
		{ name: 'phoneNumber'},
		{ name: 'cityId'},
		{ name: 'cityName'},
		{ name: 'streetName'},
		{ name: 'house'},
		{ name: 'corpus'},
		{ name: 'building'},
		{ name: 'flat'},
		{ name: 'porch'},
		{ name: 'doorCode'},
		{ name: 'floor'},
		{ name: 'room'},
		{ name: 'office'},
		{ name: 'geoLatitude', type: 'float'},
		{ name: 'geoLongitude', type: 'float'},
		{ name: 'comment'},			
		
	],
});