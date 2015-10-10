Ext.define('SushimiConsole.store.operator.CurrentOrdersStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.operator.CurrentOrdersModel',
    autoLoad: false,
    pageSize: 30,
    
    sorters: [{
        property: 'deliveryDate',
        direction: 'ASC'
    }],
    

    
    
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/operator/order/store/read',
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