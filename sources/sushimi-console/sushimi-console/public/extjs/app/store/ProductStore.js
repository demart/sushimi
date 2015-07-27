Ext.define('SushimiConsole.store.ProductStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.ProductModel',
    autoLoad: false,
    pageSize: 500,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/product/store/read',
            create: 'rest/dictionary/product/store/create',
            update: 'rest/dictionary/product/store/update',
            destroy: 'rest/dictionary/product/store/destroy'
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