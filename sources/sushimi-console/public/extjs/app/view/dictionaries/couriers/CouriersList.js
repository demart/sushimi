Ext.define('SushimiConsole.view.dictionaries.couriers.CouriersList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'dictionaries.couriers',
    alias: 'widget.dictionaries.CouriersList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.dictionaries.couriers.CouriersListController',
   	 'SushimiConsole.view.dictionaries.couriers.CouriersEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Справочник курьеров',
    store: 'CourierStore',
	stateful: false,
	
	tbar: [ {
        text: 'Изменить',
        handler: 'showEditWindow'
    }],
	
	columns: [
			{text: "№", dataIndex: 'id', width: 50},
            {text: "Имя", dataIndex: 'name' , flex: 4},
            {text: "Логин", dataIndex: 'login' , flex: 2},
            {text: "Пароль", dataIndex: 'password', width: 150},
			{text: "Дата создания", dataIndex: 'createdDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 150},
			{text: "Дата изменения", dataIndex: 'modifiedDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 150},
	],
		
    initComponent: function() {
        this.callParent(arguments);
    },

	listeners: {
	    viewready: function(){
	       this.store.load();
	       this.view.refresh();
	    }
	 },

});