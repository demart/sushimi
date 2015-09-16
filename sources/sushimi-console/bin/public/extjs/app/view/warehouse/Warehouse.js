Ext.define('SushimiConsole.view.warehouse.Warehouse' ,{
    extend: 'Ext.tab.Panel',
    controller: 'warehouse.warehouse',
    alias: 'widget.warehouse.Warehouse',

    requires: [
   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   	    
   		'SushimiConsole.view.warehouse.WarehouseController',
   		
   		'SushimiConsole.view.warehouse.WarehouseItemListController',
   	    'SushimiConsole.view.warehouse.WarehouseItemEditWindow',
   	    
   	    'SushimiConsole.view.warehouse.WarehouseIncomeListController',
  	    'SushimiConsole.view.warehouse.WarehouseIncomeEditWindow',
   	    
   	    'SushimiConsole.view.warehouse.WarehouseOutcomeListController',
   	    'SushimiConsole.view.warehouse.WarehouseOutcomeEditWindow',
	],
	
	bodyBorder: true,
	
	defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    
    listeners: {
        tabchange: function(tabs, newTab, oldTab) {
        	newTab.items.items[0].store.load();
        	newTab.items.items[0].view.refresh();       	    	
        }
    },
    
    items: [ 
     {
    	title: 'Склад',
        margin: '0 0 0 0',
        items: [{
        	viewConfig: {
                stripeRows: true
            },
            border: false,
            xtype: 'grid',
            store: 'WarehouseItemStore',
        	stateful: false,
        	controller: 'warehouse.warehouseItem',
        	
        	tbar: [{ text: 'Добавить', handler: 'showAddWindow' }, 
        	       { text: 'Изменить', handler: 'showEditWindow' },
        	       { text: 'Удалить',  handler: 'onDeleteRecord', },
        	       { text: 'Обновить', handler: 'onRefreshStore', },
	        ],
        	
        	columns: [
        			{text: "№", dataIndex: 'id', width: 50},
                    {text: "Наименование", dataIndex: 'ingredientName' , flex: 4},
                    {text: "Кол-во", dataIndex: 'amount' , width:100},
                    {text: "Ед. изм.", dataIndex: 'unitName' , width: 100},
        	],
        	
        	listeners: {
        	    viewready: function(){
        	       this.store.load();
        	       this.view.refresh();
        	    },
        	 },
        }]
    }, {
    	title: 'Приходы на склад',
        items: [{
        	viewConfig: { stripeRows: true },
            xtype: 'grid',
            store: 'WarehouseIncomeStore',
        	stateful: false,
        	controller: 'warehouse.warehouseIncome',
        	
        	tbar: [{ text: 'Добавить', handler: 'showAddWindow' }, 
        	       { text: 'Изменить', handler: 'showEditWindow' },
        	       { text: 'Удалить',  handler: 'onDeleteRecord', },
        	       { text: 'Обновить', handler: 'onRefreshStore', },
	        ],
        	
        	columns: [
        			{text: "№", dataIndex: 'id', width: 50},
                    {text: "Позиция на складе", dataIndex: 'warehouseItemName' , flex: 3},
                    
                    /*
                    {text: "Номер ордера", dataIndex: 'invoiceNumber' , width: 110},
                    */
                    
                    {text: "Тип прихода", dataIndex: 'type' , flex: 2,
                    	renderer : function(val) {
                            if (val == 'NONE') return 'Не указано';
                            if (val == 'PURCHASE') return 'Закуп';
                            return val;
                        },
                    },
                    {text: "Закуп (брутто)", dataIndex: 'grossWeight' , width: 100, align:'right'},
                    {text: "Закуп (брутто)", dataIndex: 'grossUnitName',  width: 100},
                    
                    {text: "Приход (нетто)", dataIndex: 'netWeight' , width: 80, align:'right'},
                    {text: "Приход (нетто)", dataIndex: 'netUnitName' , width: 100},
                    {text: "Цена", dataIndex: 'price' , width: 80},
                    /*{text: "Дата закупа", dataIndex: 'incomeDate', xtype: 'datecolumn', format: 'd.m.Y', width:100},*/
                    {text: "Дата создания", dataIndex: 'createdDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width:130},
                    {text: "Закупщик", dataIndex: 'purchaseUserName' , flex: 2},
                    
        	],
        	
        	listeners: {
        	    viewready: function(){
        	       this.store.load();
        	       this.view.refresh();
        	    }
        	 },
        }]
    }, {
    	title: 'Списания со склада',
        items: [{
        	viewConfig: { stripeRows: true },
            xtype: 'grid',
            store: 'WarehouseOutcomeStore',
        	stateful: false,
        	controller: 'warehouse.warehouseOutcome',
        	
        	tbar: [{ text: 'Добавить', handler: 'showAddWindow' }, 
        	       { text: 'Изменить', handler: 'showEditWindow' },
        	       { text: 'Удалить',  handler: 'onDeleteRecord', },
        	       { text: 'Обновить', handler: 'onRefreshStore', },
	        ],
        	
        	columns: [
        			{text: "№", dataIndex: 'id', width: 50},
        			
        			{text: "Тип расхода", dataIndex: 'type' , flex: 2, 
        				renderer : function(val) {
                            if (val == 'NONE') return 'Не указано';
                            if (val == 'OUTCOME') return 'Продукция';
                            if (val == 'WRITEOFF') return 'Списание';
                            return val;
                        },
        			},
                    {text: "Позиция на складе", dataIndex: 'warehouseItemName' , flex: 2},
                    {text: "Кол-во", dataIndex: 'amount', width:100},
                    {text: "Ед. изм.", dataIndex: 'unitName', width:100},
                    
                    /*{text: "Дата", dataIndex: 'outcomeDate' , flex: 2},*/
                    {text: "Дата создания", dataIndex: 'createdDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width:150},
                    {text: "Причина", dataIndex: 'outcomeReason' , flex: 2},
                    
        	],
        	
        	listeners: {
        	    viewready: function(){
        	       this.store.load();
        	       this.view.refresh();
        	    },
        	 },
        }]
    }],
		
    initComponent: function() {
        this.callParent(arguments);
    },
    
});