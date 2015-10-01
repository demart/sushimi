Ext.define('SushimiConsole.store.WarehouseIncomeStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.WarehouseIncomeModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/warehouse/income/store/read',
            create: 'rest/warehouse/income/store/create',
            update: 'rest/warehouse/income/store/update',
            destroy: 'rest/warehouse/income/store/destroy'
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