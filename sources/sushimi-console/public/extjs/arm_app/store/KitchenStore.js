Ext.define('SushimiConsoleARM.store.KitchenStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsoleARM.model.KitchenModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/order/kitchen/store/read',
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
