Ext.define('SushimiConsole.store.ProductCostingStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.ProductCostingModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/product/costing/store/read',
            create: 'rest/dictionary/product/costing/store/create',
            update: 'rest/dictionary/product/costing/store/update',
            destroy: 'rest/dictionary/product/costing/store/destroy'
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