Ext.define('SushimiConsole.store.IntegrationClientsAddresStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.InfoClientsAddresModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/clients/integration/addres/store/read',
            create: 'rest/clients/integration/addres/store/create',
           // update: 'rest/clients/information/addres/store/update',
            destroy: 'rest/clients/integration/addres/store/destroy'
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