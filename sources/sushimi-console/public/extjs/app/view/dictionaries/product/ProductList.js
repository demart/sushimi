Ext.define('SushimiConsole.view.dictionaries.product.ProductList' ,{
    extend: 'Ext.panel.Panel',
    controller: 'dictionaries.product',
    alias: 'widget.dictionaries.ProductList',

    requires: [
   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   	    
   		'SushimiConsole.view.dictionaries.product.ProductListController',
   	    'SushimiConsole.view.dictionaries.product.ProductEditWindow',
   	    
   	    'SushimiConsole.view.dictionaries.product.ProductCostingListController',
   	    'SushimiConsole.view.dictionaries.product.ProductCostingEditWindow',
	],
	
	layout: 'border',
	bodyBorder: true,
	defaults: {
        collapsible: true,
        split: true,
        bodyPadding: '0 0 0 0'
    },
    
    items: [ 
     {
    	title: 'Справочник продуктов',
        collapsible: false,
        region: 'center',
        margin: '0 0 0 0',
        items: [{
        	viewConfig: {
                stripeRows: true
            },
            
            id: 'dictionaryProductStoreId',
            xtype: 'grid',
            store: 'ProductStore',
        	stateful: false,
        	controller: 'dictionaries.product',
        	height: 650,
        	scroll: true,
        	tbar: [{ text: 'Добавить', handler: 'showAddWindow' }, 
        	       { text: 'Изменить', handler: 'showEditWindow' },
        	       { text: 'Удалить',  handler: 'onDeleteRecord', },
        	       { text: 'Обновить', handler: 'onRefreshStore', },
	        ],
        	
        	columns: [
        			{text: "№", dataIndex: 'id', width: 50},
                    {text: "Артикул", dataIndex: 'code' , width: 75},
                    {text: "Наименование", dataIndex: 'name' , flex: 4},
                    {text: "Описание", dataIndex: 'description' , flex: 2},
                    {text: "Категория", dataIndex: 'categoryName' , flex: 2},
                    {text: "Тип", dataIndex: 'type', width: 100,
                    	renderer : function(val) {
                            if (val == 'NONE') return 'Не указано';
                            if (val == 'SUSHI') return 'Суши';
                            if (val == 'PIZZA') return 'Пицца';
                            if (val == 'SOY') return 'Соевый соус';
                            if (val == 'VASABI') return 'Васаби';
                            if (val == 'IMBIR') return 'Имбирь';
                            
                            if (val == 'STICKS') return 'Палочки для еды';
                            if (val == 'CHEWING_GUM') return 'Жевательная резинка';

                            if (val == 'PACKAGING') return 'Упаковка';
                            if (val == 'SMALL_SAUCE_CONTAINER') return 'Маленький контейнер';
                            if (val == 'BIG_SAUCE_CONTAINER') return 'Большой контейнер';
                        },	
                    },
                    {text: "Чей", dataIndex: 'owner', width: 150,
                    	renderer : function(val) {
                            if (val == 'SUSHIMI') return 'Продукция Сушими';
                            if (val == 'ORHER') return 'Продукция бара';
                        },		
                    },
                    
                    {text: "Себестоимость", dataIndex: 'costPrice', width: 100},
                    {text: "Цена", dataIndex: 'cost', width: 100},
                    {text: "Цена Бар", dataIndex: 'barCost', width: 100},
        	],
        	
        	listeners: {
        	    viewready: function(){
        	       this.store.load();
        	       this.view.refresh();
        	    },
            	selectionchange: function(model, records) {
            		var productCostingGrid = Ext.getCmp('productCostingGridId');
            		var record = records[0];
            		if (record != null && record.getData() != null) {
						productCostingGrid.store.proxy.api.read = 'rest/dictionary/product/costing/store/read?productId=' + record.getData().id;
						productCostingGrid.store.proxy.api.create = 'rest/dictionary/product/costing/store/create?productId=' + record.getData().id;
						productCostingGrid.store.proxy.api.update = 'rest/dictionary/product/costing/store/update?productId=' + record.getData().id;
						productCostingGrid.store.proxy.api.destroy = 'rest/dictionary/product/costing/store/destroy?productId=' + record.getData().id;            		
					}
            		productCostingGrid.getStore().reload();
            	},
        	 },
        }]
    }, {
    	title: 'Калькуляция продукта',
        region: 'south',
        height: 300,
        minHeight: 100,
        maxHeight: 250,
        items: [{
        	id: 'productCostingGridId',
        	viewConfig: { stripeRows: true },
            xtype: 'grid',
            store: 'ProductCostingStore',
        	stateful: false,
        	controller: 'dictionaries.productCosting',
        	
        	tbar: [{ text: 'Добавить', handler: 'showAddWindow' }, 
        	       { text: 'Изменить', handler: 'showEditWindow' },
        	       { text: 'Удалить',  handler: 'onDeleteRecord', },
        	       { text: 'Обновить', handler: 'onRefreshStore', },
	        ],
        	
        	columns: [
        			{text: "№", dataIndex: 'id', width: 50},
                    {text: "Позиция на складе", dataIndex: 'warehouseItemName' , flex: 2},
                    {text: "Ингридиент", dataIndex: 'ingredientName' , flex: 2},
                    {text: "Кол-во", dataIndex: 'amount', width: 100},
                    {text: "Единица измерения", dataIndex: 'unitName' , flex: 2},
        	],
        }]
    }],
		
    initComponent: function() {
        this.callParent(arguments);
    },
    
});