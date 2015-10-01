Ext.define('SushimiConsole.store.OrderStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.OrderModel',
    autoLoad: false,
    pageSize: 30,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/order/store/read',
            create: 'rest/order/store/create',
            update: 'rest/order/store/update',
            destroy: 'rest/order/store/destroy'
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