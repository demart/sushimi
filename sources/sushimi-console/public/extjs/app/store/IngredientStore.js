Ext.define('SushimiConsole.store.IngredientStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.IngredientModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/dictionary/ingredient/store/read',
            create: 'rest/dictionary/ingredient/store/create',
            update: 'rest/dictionary/ingredient/store/update',
            destroy: 'rest/dictionary/ingredient/store/destroy'
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