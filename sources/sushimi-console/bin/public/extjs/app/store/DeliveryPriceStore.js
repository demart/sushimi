Ext.define('SushimiConsole.store.DeliveryPriceStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.DeliveryPriceModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/deliveryprice/store/read',
            create: 'rest/dictionary/deliveryprice/store/create',
            update: 'rest/dictionary/deliveryprice/store/update',
            destroy: 'rest/dictionary/deliveryprice/store/destroy'
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