Ext.define('SushimiWebAdmin.model.StaffListModel', {
    extend: 'Ext.data.Model',
    
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'name'},
		{ name: 'password'},
		{ name: 'login'},
		{ name: 'code'},
		{ name: 'role'},
		{ name: 'enabled'}

		],

});
