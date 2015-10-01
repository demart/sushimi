Ext.define('SushimiConsole.store.CategoryStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.CategoryModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/category/store/read',
            create: 'rest/dictionary/category/store/create',
            update: 'rest/dictionary/category/store/update',
            destroy: 'rest/dictionary/category/store/destroy'
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