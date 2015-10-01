Ext.define('SushimiConsole.store.clients.IntegrationAddressClientsStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.InfoClientsModel',
    autoLoad: false,
    pageSize: 500,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/clients/information/store/read',
            create: 'rest/clients/information/store/create',
            update: 'rest/clients/information/store/update',
            destroy: 'rest/clients/information/store/destroy'
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