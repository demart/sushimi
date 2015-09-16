Ext.define('SushimiConsole.model.UserModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'}, 
		{ name: 'name'}, 
		{ name: 'login'},
		{ name: 'password'},
		{ name: 'role'},
		{ name: 'user'},
		{ name: 'createdDate', type: 'date'},
		{ name: 'modifiedDate', type: 'date'},
	],
});