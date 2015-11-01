/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SushimiConsole.view.main.Main', {
    extend: 'Ext.container.Container',
    
    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    requires: [
        'Ext.window.Toast',
        //'Ext.window.Toast',
    	'SushimiConsole.view.order.window.NewOrderWindow',
    ],
    
    id: 'mainViewportId',
    
    layout: {
        type: 'border'
    },
    
    items: [
        {
	        region:'north',
	        floatable: false,
	        margin: '0 0 0 0',
	        tbar : [
	                //Начало: кнопки для операторской
	    	        {
	    	        	id: 'currentOrdersBtn',
	    	            text:'Текущие заказы',
	    	            iconCls: null,
	    	            scale: 'small',
	    	            hidden: true,
	    	            listeners : {click : 'onCurrentOrdersClick', },
	    	            
	    	        },
	    	        {
	    	        	id: 'newOrderBtn',
	    	            text:'Новый заказ',
	    	            iconCls: null,
	    	            scale: 'small',
	    	            hidden: true,
	    	            listeners : {click : 'onNewOrderOperatorClick', },
	    	            
	    	        },
	    	        {
	    	        	id: 'deliveredOrdersBtn',
	    	            text:'Выполненные заказы',
	    	            iconCls: null,
	    	            scale: 'small',
	    	            hidden: true,
	    	            listeners : {click : 'onDeliveredOrdersClick', },
	    	            
	    	        },
	    	        {
	    	        	id: 'courierListBtn',
	    	            text:'Информация по курьерам',
	    	            iconCls: null,
	    	            scale: 'small',
	    	            hidden: true,
	    	            listeners : {click : 'onCourierListClick', },
	    	            
	    	        },
	    	        {
	    	        	id: 'mapsBtn',
	    	            text:'Карта',
	    	            iconCls: null,
	    	            scale: 'small',
	    	            hidden: true,
	    	            listeners : {click : 'onMapsClick', },
	    	            
	    	        },

	    	        //конец: кнопки для операторской
	                
	                {
	        	id: 'menuOrdersBtn',
	            xtype:'button',
	            text:'Управление заказами',
	            iconCls: null,
	            glyph: 61,
	            scale: 'small',
	            menu:[
	                  {
	                	  text:'Новый заказ',
	                	  listeners: { click : 'onNewOrderClick', }
	                  },
	                  {
	                	  text:'Просмотр заказов',
	                	  listeners: { click : 'onOrderClick', },
	                  }
                  ]
	        	}, '-',  {
	            iconCls: null,
	            id: 'menuDictionariesBtn',
	            text:'Справочники',
	            scale: 'small',
	            hidden: true,
	            menu:[
                  {
                	  text:'Справочник: Городов',
                	  listeners: { click : 'onCityDicClick', },
                  }, 
                  {
                	  text:'Справочник: Районов доставки',
                	  listeners: { click : 'onDeliveryPriceDicClick', },
                  }, 
                  {
                	  text:'Справочник: Акций',
                	  listeners: { click : 'onPromotionDicClick', },
                  }, 
                  {
            	  	  text:'Справочник: Категорий',
            	  	  listeners: { click : 'onCategoryDicClick', },            	  	  
                  }, 
                  {
                	  text:'Справочник: Продуктов',
                	  listeners: { click : 'onProductDicClick', },    
	              }, 
                  {
                	  text:'Справочник: Ингредиентов',
                	  listeners: { click : 'onIngredientDicClick', },
	              }, 
                  {
                	  text:'Справочник: Единиц измерений',
                	  listeners: { click : 'onUnitDicClick', },
	              }
	            ]
	        },              
	        '-',  {
	            iconCls: null,
	            id: 'menuClientsBtn',
	            text:'Управление клиентами',
	            scale: 'small',
	            hidden: true,
	            menu:[
                  {
                	  text:'Информация о клиентах',
                	  listeners: { click : 'onInfoClientsClick', },
                  },
                  {
                	  text:'Объединение клиентов',
                	  listeners: { click : 'onIntegrationClientsClick', },
                  },
                  {
                	  text:'Объединение адресов клиента',
                	  listeners: { click : 'onIntegrationAddressClientsClick', },
                  }
                  ]
	        },             
	        {
	        	id: 'menuWarehouseBtn',
	            text:'Склад',
	            iconCls: null,
	            //glyph: 70,
	            scale: 'small',
	            hidden: true,
	            listeners : {click : 'onWarehouseClick', },
	            
	        }, {
	        	id: 'menuStatsBtn',
	            text:'Статистика',
	            iconCls: null,
	            margin: '0 30 0 0',
	            scale: 'small',
	            hidden: true,
	            listeners : {click : 'onReportClick', },
	            
	        },'-',  {
	        	id: 'newSiteOrdersCountField',
	            text:'Идет проверка...',
	            iconCls: null,
	            margin: '0 0 0 20',
	            alignTarget: 'right',
	            scale: 'small',
	        },{
	        	id: 'newSiteOrdersCountLastTimeField',
	        	xtype: 'textfield',
	            iconCls: null,
	            alignTarget: 'right',
	            scale: 'small',
	            value: 0,
	            hidden: true,
	        },
	        '-',  {
	        	id: 'deliveredOrdersCountField',
	            text:'Идет проверка...',
	            iconCls: null,
	            margin: '0 0 0 20',
	            alignTarget: 'right',
	            scale: 'small',
	        },
	        

	        
	        ]
        },
        
        {
        	region:'center',
        	floatable: false,
	        margin: '0 0 0 0',
	        id: 'mainBody',
	        layout: 'fit',
        }
    ],
    
    initComponent: function() {
    	//create the delayed task instance with our callback
    	var view = this;
    	var task = Ext.create('Ext.util.DelayedTask', function() {
    		Ext.Ajax.request({
    		    url: '/rest/order/new?lastCheck=' + Ext.getCmp('newSiteOrdersCountLastTimeField').getValue(),		    
    		    success: function(response){
    		    	response = Ext.decode(response.responseText);
		    		Ext.getCmp('newSiteOrdersCountLastTimeField').setValue(response.lastCheck);
    		    	if (response.count > 0) {
    		    		Ext.getCmp('newSiteOrdersCountField').setText('<span style="font-weight:bold;">Новые заказы</span> <span style="color:red; font-weight:bold; text-decoration: blink;">' + response.count + ' шт.</span>');
    		    		Ext.getCmp('newSiteOrdersCountLastTimeField').setValue(response.lastCheck);
    		    		if (response.newCount > 0) {
	    		    		Ext.toast({
	    		                html: '<span style="color: red; font-weight: bold;">Поступили новые заказы. ' + response.newCount + ' шт.</span>',
	    		                closable: false, align: 't', slideInDuration: 400, minWidth: 240
	    		            });
    		    			var mySound = soundManager.createSound({ url: '/music/Temple.wav'});
    		    			mySound.play();
    		    			var store = Ext.getCmp('ordersAll');
    		    			store.getStore().reload();
    		    		}
    		    	} else {
    		    		Ext.getCmp('newSiteOrdersCountField').setText('Нет заказов с сайта');	
    		    	}
    		    },
    		    failure: function(batch) {
    		    	Ext.getCmp('newSiteOrdersCountField').setText('<span style="color:red; font-weight:bold;">Ошибка!</span>');
    			}
    		});
          
    		Ext.Ajax.request({
        	    url: 'rest/order/delivery/count/store/read',
        	    method: 'POST',
        	    //jsonData: data,
        	    
        	    success: function(response, conn, options, eOpts) {
        	    	var json = Ext.util.JSON.decode(response.responseText);
        	    	if (json.success == true) {
        	    		Ext.getCmp('deliveredOrdersCountField').setText(json.message);
        	    		
        	    	} 
        	    }, 

        	    failure: function(batch) {
        	    	Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
        		}
        	});
    		
            Ext.Ajax.request({
            	url: '/rest/order/state?lastUpdateTime=' + Ext.getCmp('newSiteOrdersCountLastTimeField').getValue(),		    
        	    method: 'POST',
        	    //jsonData: data,
        	    
        	    success: function(response, conn, options, eOpts) {
        	    	var store = Ext.getCmp('ordersAll');
        	    	store.getStore().load();
        	    	var json = Ext.util.JSON.decode(response.responseText);
        	    	if (json.success == true) {
    		    		Ext.toast({
    		                html: json.message,
				            autoCloseDelay: 8000,
    		                closable: false, align: 'tr', slideInDuration: 400, minWidth: 240
    		            });
    		    		
        	    		
        	    	} 
        	    }, 

        	    failure: function(batch) {
        	    	Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
        		}
        	});
    	    task.delay(10000);
    	}, this);

    	//The function will start after 0 milliseconds - so we want to start instantly at first
    	task.delay(10000);
    	
        this.callParent(arguments);
    },
    

    listeners : {
    	beforerender: function(viewport, eOpts) {
    		var role = document.getElementById('console_user_role').innerHTML;
        	console.log(role);
        	if (role == 'DIRECTOR') {
        		Ext.getCmp('menuStatsBtn').setVisible(true);
        		Ext.getCmp('menuWarehouseBtn').setVisible(true);
        		Ext.getCmp('menuDictionariesBtn').setVisible(true);
        		Ext.getCmp('menuClientsBtn').setVisible(true);
        		Ext.getCmp('currentOrdersBtn').setVisible(false);
        		Ext.getCmp('deliveredOrdersBtn').setVisible(false);
        		Ext.getCmp('mapsBtn').setVisible(false);
        		Ext.getCmp('newOrderBtn').setVisible(false);
        		//Ext.getCmp('newSiteOrdersBtn').setVisible(false);
        		Ext.getCmp('courierListBtn').setVisible(false);
        	//	Ext.getCmp('deliveredOrdersMoneyCountField').setVisible(false);
        		Ext.getCmp('deliveredOrdersCountField').setVisible(false);
        	}
        	
        	if (role == 'OPERATOR') {
        		Ext.getCmp('menuOrdersBtn').setVisible(false);
        		Ext.getCmp('menuStatsBtn').setVisible(false);
        		Ext.getCmp('menuWarehouseBtn').setVisible(false);
        		Ext.getCmp('menuDictionariesBtn').setVisible(false);
        		Ext.getCmp('menuClientsBtn').setVisible(false);
        		Ext.getCmp('currentOrdersBtn').setVisible(true);
        		Ext.getCmp('deliveredOrdersBtn').setVisible(true);
        		Ext.getCmp('mapsBtn').setVisible(true);
        		Ext.getCmp('newOrderBtn').setVisible(true);
        		//Ext.getCmp('newSiteOrdersBtn').setVisible(false);
        		Ext.getCmp('courierListBtn').setVisible(false);
        		//Ext.getCmp('deliveredOrdersMoneyCountField').setVisible(true);
        		Ext.getCmp('deliveredOrdersCountField').setVisible(true);
        		window.document.location = "#operator/orders";
        	}
    	}
    },
    
});
