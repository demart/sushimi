Ext.define('SushimiConsole.store.PromotionStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.PromotionModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/promotion/store/read',
            create: 'rest/dictionary/promotion/store/create',
            update: 'rest/dictionary/promotion/store/update',
            destroy: 'rest/dictionary/promotion/store/destroy'
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