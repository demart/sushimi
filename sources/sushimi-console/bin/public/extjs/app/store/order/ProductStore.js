Ext.define('SushimiConsole.store.order.ProductStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.order.OrderProductModel',
    autoLoad: false,
    proxy: {
	    type: 'ajax',
        api: {
            read: '/rest/dictionary/product/forOrder/store/read',
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