Ext.define('SushimiConsole.view.dictionaries.deliveryprice.DeliveryPriceList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'dictionaries.deliveryprice',
    alias: 'widget.dictionaries.DeliveryPriceList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.dictionaries.deliveryprice.DeliveryPriceListController',
   	    'SushimiConsole.view.dictionaries.deliveryprice.DeliveryPriceEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Справочник городов',
    store: 'DeliveryPriceStore',
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
			{text: "Цена", dataIndex: 'price' , width: 80},
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