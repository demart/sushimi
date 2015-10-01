Ext.define('SushimiConsole.view.dictionaries.promotion.PromotionList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'dictionaries.promotion',
    alias: 'widget.dictionaries.PromotionList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.dictionaries.promotion.PromotionListController',
   	    'SushimiConsole.view.dictionaries.promotion.PromotionEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Справочник акций',
    store: 'PromotionStore',
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
			{text: "Название акции", dataIndex: 'name' , flex: 3},
			{text: "Скидка", dataIndex: 'discount' , flex: 3},
			{text: "Тип акции", dataIndex: 'type' , flex: 3,
				renderer : function(val) {
                    if (val == 'PERIOD') return 'Время';
                    if (val == 'BIRTHDATE') return 'День рождение';
                },			
			
			},
			{text: "Тип подарка", dataIndex: 'valueType' , flex: 3,
				renderer : function(val) {
                    if (val == 'PRODUCT') return 'Продукт';
                    if (val == 'DISCOUNT') return 'Скидка';
                    if (val == 'DISCOUNT_ALL') return 'Скидка на все';
                    if (val == 'DP') return 'Скидка и продукт';
                },		
			},
			{text: "Сумма заказа", dataIndex: 'orderSum' , flex: 3},
			{text: "Подарок", dataIndex: 'productIdName' , flex: 3},
			{text: "Публикация", dataIndex: 'isPublished' , flex: 3, xtype:'booleancolumn', trueText:'Да', falseText:'Нет'},
			{text: "Количество", dataIndex: 'productCount' , flex: 3},
			{text: "Начало акции", dataIndex: 'fromTime', xtype: 'datecolumn', format: 'd.m.Y', width: 150},
			{text: "Конец  акции", dataIndex: 'toTime', xtype: 'datecolumn', format: 'd.m.Y', width: 150},
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