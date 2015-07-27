Ext.define('SushimiConsole.view.dictionaries.unit.UnitList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'dictionaries.unit',
    alias: 'widget.dictionaries.UnitList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.dictionaries.unit.UnitListController',
   	    'SushimiConsole.view.dictionaries.unit.UnitEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Справочник единиц измерений',
    store: 'UnitStore',
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
            {text: "Наименование", dataIndex: 'name' , flex: 3},
            {text: "Кр. наименование", dataIndex: 'shortName' , flex: 2},
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