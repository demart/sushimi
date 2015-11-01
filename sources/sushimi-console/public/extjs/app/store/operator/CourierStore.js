Ext.define('SushimiConsole.store.operator.CourierStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.operator.CourierModel',
    autoLoad: false,
    pageSize: 30,
    
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/operator/courier/store/read',
            create: 'rest/operator/order/store/create',
            update: 'rest/operator/order/store/update',
            destroy: 'rest/operator/order/store/destroy'
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