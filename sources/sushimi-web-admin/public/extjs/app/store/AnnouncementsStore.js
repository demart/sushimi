Ext.define('SushimiWebAdmin.store.AnnouncementsStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiWebAdmin.model.AnnouncementsListModel',
    autoLoad: false,
    pageSize: 300,
    proxy: {
	    type: 'ajax',
        api: {
            read: 'rest/announcements/store/read',
            create: 'rest/announcements/store/create',
            update: 'rest/announcements/store/update',
            destroy: 'rest/announcements/store/destroy'
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