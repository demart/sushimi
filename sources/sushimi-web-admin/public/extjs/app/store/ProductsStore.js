Ext.define('SushimiWebAdmin.store.ProductsStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiWebAdmin.model.ProductsListModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/products/store/read',
            create: 'rest/products/store/create',
            update: 'rest/products/store/update',
            destroy: 'rest/products/store/destroy'
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