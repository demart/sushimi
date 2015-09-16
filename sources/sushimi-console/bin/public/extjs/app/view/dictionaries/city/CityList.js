Ext.define('SushimiConsole.view.dictionaries.city.CityList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'dictionaries.city',
    alias: 'widget.dictionaries.CityList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.dictionaries.city.CityListController',
   	    'SushimiConsole.view.dictionaries.city.CityEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Справочник городов',
    store: 'CityStore',
	stateful: false,
	
	tbar: [{
        text: 'Добавить',
        handler: 'showAddWindow'
    }, {
        text: 'Изменить',
        handler: 'showEditWindow'
    },{
        text: 'Удалить',
        handler: 'onDeleteRecord',
    },{
        text: 'Обновить',
        handler: 'onRefreshStore',
    }],
	
	columns: [
			{text: "№", dataIndex: 'id', width: 50},
			{text: "Код", dataIndex: 'code' , width: 80},
			{text: "Наименование", dataIndex: 'name' , flex: 3},
            {text: "Пользователь", dataIndex: 'user', width:150},
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