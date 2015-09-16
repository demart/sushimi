Ext.define('SushimiConsole.store.CityStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.CityModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/city/store/read',
            create: 'rest/dictionary/city/store/create',
            update: 'rest/dictionary/city/store/update',
            destroy: 'rest/dictionary/city/store/destroy'
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