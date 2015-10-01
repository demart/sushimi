Ext.define('SushimiConsole.store.UnitStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.UnitModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/unit/store/read',
            create: 'rest/dictionary/unit/store/create',
            update: 'rest/dictionary/unit/store/update',
            destroy: 'rest/dictionary/unit/store/destroy'
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