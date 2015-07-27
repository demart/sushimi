Ext.define('SushimiConsole.store.WarehouseItemStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.WarehouseItemModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/warehouse/item/store/read',
            create: 'rest/warehouse/item/store/create',
            update: 'rest/warehouse/item/store/update',
            destroy: 'rest/warehouse/item/store/destroy'
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