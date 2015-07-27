Ext.define('SushimiConsole.store.OrderTreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'SushimiConsole.model.OrderTreeModel',
    autoLoad: true,
    folderSort: true,
    
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/order/tree/store/read',
        },
	},    
});