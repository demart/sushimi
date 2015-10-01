Ext.define('SushimiConsole.store.order.ClientAddressStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.order.ClientAddressModel',
    autoLoad: false,
    proxy: {
	    type: 'ajax',
        api: {
            read: '/rest/client/address/store/read',
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