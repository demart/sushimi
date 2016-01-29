Ext.define('SushimiWebAdmin.store.CategoryStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiWebAdmin.model.CategoryListModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/category/store/read',
            create: 'rest/category/store/create',
            update: 'rest/category/store/update',
            destroy: 'rest/category/store/destroy'
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