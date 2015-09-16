Ext.define('SushimiConsole.store.SiteOrderStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.SiteOrderModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/order/site/store/read',
            create: 'rest/order/site/store/create',
            update: 'rest/order/site/store/update',
            destroy: 'rest/order/site/store/destroy'
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