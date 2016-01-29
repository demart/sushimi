Ext.define('SushimiWebAdmin.store.CategoryComboStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiWebAdmin.model.CategoryListModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/category/combo/store/read',
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