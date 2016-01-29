
Ext.define("SushimiWebAdmin.view.dictionaries.products.ProductsList",{
    extend: "Ext.panel.Panel",

    requires: [
        "SushimiWebAdmin.view.dictionaries.products.ProductsListController",
       // "SushimiWebAdmin.view.dictionaries.products.ProductsListModel"
        "SushimiWebAdmin.view.dictionaries.products.EditWindowProductList"
    ],

    controller: "dictionaries-products-productslist",
    
    layout: 'border',
	bodyBorder: true,
	defaults: {
       // collapsible: true,
        split: true,
        bodyPadding: '0 0 0 0'
    },
    
    items: [
            {
            	xtype: 'panel',
            	layout: 'fit',
            	region: 'north',
            	title: 'Справочник продуктов',
            	bodyPadding: 5,
            	items: [{
            		xtype: 'fieldcontainer',
            		fieldLabel: 'Название',
            		labelWidth: 130,
            		combineErrors: true,
            		msgTarget : 'side',
            		layout: 'hbox',
            		defaults: {
            			flex: 1,
            			hideLabel: false,
            			labelWidth: 60,
            		},
            		items: [{
            			xtype: 'textfield',
            			id:'textField',
            			name: 'textField',
            			margin: '0 15 0 0',
            			width: 150,
            			listeners:{
            				specialkey: function(f,o){
            					if(o.getKey()==13){
            						Ext.getCmp('searchProductsButton').fireEvent('click');
            					}
            				}
            			},  
            		}, 
            		{
            			region: 'center',
            			items: [{
            				id: 'searchProductsButton',
            				region: 'east',
                			margin: '0 15 0 0',
            				xtype: 'button',
            				text: 'Найти',
            				listeners: {
                				click : 'searchProduct' 
                			},
            			},

            			{
            				region: 'west',
            				xtype: 'button',
                			id: 'refreshSearhProductsButton',
            				text: 'Очистить фильтры',
            				listeners: {
                				click : 'onRefreshSearhProductsStore' 
                			},
                			}
            			        ]
            		},],
            	}],
    },
    {
    	viewConfig: {
            stripeRows: true
        },
        id: 'productsStoreId',
        xtype: 'grid',
        region: 'center',
    	store: 'ProductsStore',
    	scroll: true,
    	//stateful: false,
    	//controller: 'clients.information',
    	height: 650,
    	scroll: true,
        columnLines: true,
        enableLocking: true,
    	
        tbar: [
               { text: 'Изменить', handler: 'showEditWindow' },
              // { text: 'Удалить', handler: 'onDeleteRecord', },
               { text: 'Обновить', handler: 'onRefreshStore', },
               ],

         columns: [
                //{text: "№", dataIndex: 'id', width: 100},
                {text: "Код", dataIndex: 'code', width:50},
                {text: "Название продукта", dataIndex: 'name' , flex: 1},
                {text: "Категория", dataIndex: 'categoryName', width: 200},
                {text: "Цена", dataIndex: 'cost' , width: 70},
                {text: "Описание", dataIndex: 'description', flex: 2},
                {text: "Тип", dataIndex: 'type',renderer: function (value) {
                	if (value == "NONE") return "Не указан";
                	else if (value == "SUSHI") return "Суши";
                	else if (value == "PIZZA") return "Пицца";
                	else if (value == "VASABI") return "Вассаби";
                	else if (value == "SOY") return "Соя";
                	else if (value == "IMBIR") return "Имбирь";
                }, align: 'center', width: 100},
                {text: "Публикация", dataIndex: 'published', align: 'center', xtype:'booleancolumn', trueText:'Да', falseText:'Нет', width: 100},
                
                
                //{text: "Код", dataIndex: 'code', width:200},

                ],


            	listeners: {
            	    viewready: function(){
            	       this.store.load();
            	       this.view.refresh();
            	    },
            	 },


          
    }],
   
    initComponent: function() {
		this.callParent(arguments);
	},
    

});
