Ext.define('SushimiConsole.store.IntegrationClientsStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.IntegrationClientsModel',
    autoLoad: false,
    pageSize: 500,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/clients/integration/store/read',
            //create: 'rest/clients/integration/store/create',
            //update: 'rest/clients/integration/store/update',
        	destroy: '/rest/clients/integration/store/destroy',
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