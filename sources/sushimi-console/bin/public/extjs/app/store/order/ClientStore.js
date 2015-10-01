Ext.define('SushimiConsole.store.order.ClientStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.order.ClientModel',
    autoLoad: false,
    proxy: {
	    type: 'ajax',
        api: {
            read: '/rest/client/store/read',
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