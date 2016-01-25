Ext.define('SushimiConsole.store.CourierStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.operator.CourierModel',
    autoLoad: false,
    pageSize: 30,
    
    proxy: {
	    type: 'ajax',
        api: {
            read: '/rest/operator/courier/list/store/read',
            create: 'rest/operator/courier/store/create',
            update: 'rest/operator/courier/list/store/update',
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