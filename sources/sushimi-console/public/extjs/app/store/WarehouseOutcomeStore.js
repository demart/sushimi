Ext.define('SushimiConsole.store.WarehouseOutcomeStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.WarehouseOutcomeModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/warehouse/outcome/store/read',
            create: 'rest/warehouse/outcome/store/create',
            update: 'rest/warehouse/outcome/store/update',
            destroy: 'rest/warehouse/outcome/store/destroy'
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