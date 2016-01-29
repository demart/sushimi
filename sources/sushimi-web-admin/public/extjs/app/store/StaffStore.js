Ext.define('SushimiWebAdmin.store.StaffStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiWebAdmin.model.StaffListModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/staff/information/store/read',
            create: 'rest/staff/information/store/create',
            update: 'rest/staff/information/store/update',
            destroy: 'rest/staff/information/store/destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success',
            totalProperty: 'totalCount',
            idProperty: 'id'
        }
	},    
	root: {
		text: 'root',
		id: 'root'
	},
});