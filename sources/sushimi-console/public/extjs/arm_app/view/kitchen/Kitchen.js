var  KitchenModel = Ext.define('KitchenModel', {
        extend: 'Ext.data.Model',
        idProperty: 'id',
        fields: [
    		{ name: 'id', type: 'int'}, 
    		{ name: 'orderDate'},
    		{ name: 'comment'},
    		{ name: 'clientAddress'},
    		{ name: 'orderNumber'},
    		{ name: 'orderState'},
    		{ name: 'lastUpdateTime'},
    		{ name: 'status'},
    		{ name: 'deliveryDateKitchen'},
    		{ name: 'deliveryDate'},
    		{ name: 'clientCount'},
    		{ name: 'timer'},
    		{ name: 'statusType'},
    	],
		hasMany: {
		    model: 'KitchenItemModel',
		    name: 'items',
		    primaryKey: 'id',
			foreignKey: 'ownerId',
		},
    	
    });

var  KitchenItemModel = Ext.define('KitchenItemModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
             {name: 'id', type: 'int'},
     		{ name: 'name'},
     		{ name: 'count', type: 'int' },

     	],
     	belongsTo: [
             { 
             	model: 'KitchenModel', 
             	associationKey: 'id',
             	primaryKey: 'id',
             	foreignKey: 'id',
     		}
         ],
	
});

var lastTime = null; //время последнего успешного запроса
var periodReload = 5000; //период апдейта
var allOrders = 0; //заказы, с датой доставки более 2 часа от текущего времени сервера

var task = {
		run: function () {
    		store.load({
                params: {
                	lastUpdateTime: lastTime,
                	periodReload: periodReload,
                }, 
           
    			callback: function(records, operation, success) {
        			//	 console.log(store.getCount());
        				//console.log (records[store.getCount() - 1]);
        		      //  console.log(records[store.getCount() - 1].data.lastUpdateTime);
        		       // console.log(lastUpdateTime);
    				store.sort('deliveryDate', 'ASC');
    				
    				if (store.getCount() != 0)
    					lastTime = records[store.getCount() - 1].data.lastUpdateTime;
    		        
    				allOrders = 0;
    				
    		        for (var i=0; i< store.getCount(); i++)	{
    		        	//Новый заказ пришел
    		        	if (records[i].data.status == 0)	{
    		        		//console.log(records[i].data.orderNumber);
    						Ext.toast({
    				            html: '<span class="kitchenNewOrderToast">Новый заказ #' + records[i].data.orderNumber + '!</span>',
    				            title: 'Оповещение',
    				            width: 200,
    				            align: 'tr',
    				            autoClose: true,
    				            autoCloseDelay: 10000,
    				        });
    		    			var mySound = soundManager.createSound({ url: '/music/Temple.wav'});
    		    			mySound.play();
    		        	}
    		        	//Заказ отменен
    		        	if (records[i].data.status == 1)	{
    		        		//console.log(records[i].data.id);
    		        		Ext.toast({
    				            html: '<span class="kitchenCanceledOrderToast">Заказ #' + records[i].data.orderNumber + ' отменен!</span>',
    				            title: 'Оповещение',
    				            width: 200,
    				            align: 'tr',
    				            autoClose: true,
    				            autoCloseDelay: 10000,
    				        });
    		    			var mySound = soundManager.createSound({ url: '/music/Temple.wav'});
    		    			mySound.play();
    						//store.remove(records[i]);
    					}
    		        	//До заказа больше 2 часов

    		        	if (records[i].data.status == 8) {
    		        		allOrders++;
    		        		
    		        	}

    		        }
        		    
   		        	Ext.getCmp('ordersTwoHours').setText('<span class="kitchenOrdersTwoHours">Количество заказов с датой доставки более 2-ух часов: ' + allOrders + '</span>');
    		        	  
    		  
		},
    		});
    		},
		
		interval: periodReload
};

var store = Ext.create('Ext.data.Store', {
        model: 'KitchenModel',
        
        sorters: [{
            property: 'deliveryDate',
            direction: 'DESC'
        }],
        
        sortRoot: 'deliveryDate',
        sortOnLoad: true,
        remoteSort: false,
        
        proxy: {
        	
        	type: 'ajax',

        	api: {
                read: 'rest/order/kitchen/store/read',
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
    store.load({

        params: {
        	lastUpdateTime: null,
        	periodReload: periodReload
        },
    	
		callback: function(records, operation, success) {
			//nsole.log (records[store.getCount() - 1].data.lastUpdateTime);
			
			store.sort('deliveryDate', 'ASC');
			if (store.getCount() != 0)
				lastTime = records[store.getCount() - 1].data.lastUpdateTime;
			
			allOrders = 0;
        	
			for (var i=0; i < store.getCount(); i++) {
				if (records[i].data.status == 8) {
					allOrders++;
					
				}

			}
        	
			Ext.getCmp('ordersTwoHours').setText('<span class="kitchenOrdersTwoHours">Количество заказов с датой доставки более 2-ух часов: ' + allOrders + '</span>');

      	  
			
			console.log ("All orders (>2 hours)" + allOrders);
			
	        //сортировака по времени доставки на сервере
	        //заказ который заказали через часа три выводить в отдельном окне(фильтровать)
	    },
	    scope: this
	});


Ext.define('SushimiConsoleARM.view.kitchen.Kitchen' ,{
    extend: 'Ext.panel.Panel',
    controller: 'kitchen.KitchenController',
    alias: 'widget.kitchen.Kitchen',
    
    requires: [
        'Ext.window.Toast',
        'Ext.layout.container.Center',
        'Ext.view.View',
   		'SushimiConsoleARM.view.kitchen.KitchenController',
	],

	

	
	width: 500,
    height: 400,
    layout: 'auto',
    region: 'center',
    title: 'Заказы',
    loadMask: false,

    collapsible: true,
    
    items: [  {
    	layout: 'fit',
        store: store,
    	xtype: 'dataview',
        scroll: true,
        split: true,
        autoScroll: true,
        columnWidth: 200,
        trackOver: true,
        loadMask: false,

        
        tpl: Ext.create('Ext.XTemplate',  
        	
        		'<tpl for=".">', 
              	'<tpl if="status!=8 && status!=1">',
              		'<tpl if="status==2">',
	    				'<div style="" class="orderinfo yellow">',
	    			'</tpl>',
	    	      	'<tpl if="status==4">',
    	      			'<div style="" class="orderinfo red">',
    	      		'</tpl>',
            		'<tpl if="status==0">',
	        			'<div style="" class="orderinfo grey">',
	        		'</tpl>',
	    	      	'<tpl if="status==3">',
						'<div style="" class="orderinfo red">',
					'</tpl>',
				  	'<tpl if="status==5">',
						'<div style="" class="orderinfo yellow">',
					'</tpl>',
					'<tpl if="status==6">',
						'<div style="" class="orderinfo grey">',
					'</tpl>',
					 '<tpl if="status==7">',
					 	'<div style="" class="orderinfo green">',
					'</tpl>',

		              		'<span class="label">Заказ #</span>',
		              		'<span><b>{orderNumber}</b></span></br>', 
		              		'<span>Тип доставки: </span>',
		              		'<tpl if="statusType==3">',
	              				'<span class="kitchenSelfService">Самовывоз</span><br>',
	              			'</tpl>',
		              		'<tpl if="statusType==2">',
		              			'<span class="kitchenDeliveryInTime">Доставка ко времени</span><br>',
              			    '</tpl>',
		              		'<tpl if="statusType==1">',
              					'<span class="kitchenDelivery">Доставка</span><br>',
              			    '</tpl>',
              			   
		              			'<span class="label">Дата доставки: </span>',
		              			'<span><b>{deliveryDateKitchen}</b></span></br>',
		              		
		              		'<span class="kitchenTimer">{timer}</span>',
		              		 '<tpl if="statusType!=3">',
		              		 	'<span class="label">Адрес: </span>',
		              		 	'<span>{clientAddress}</span></br>',
		              		'</tpl>',
		              		'<span class="label">Комментарий: </span>',
		              		'<span>{comment}</span></br>',
		              		'<span class="label">Количество человек: </span>',
		              		'<span>{clientCount}</span></br>',
		              		'<span class="label"><center><b>Заказ:</b></center> </span>',
		              		'<tpl for="items">',
			              		'<table>',
			              			'<tr>',
				              			'<td style="text-align: left;">',
						              		'<span>{name}</span>',
						              	'</td>',
						              	'<td style="text-align: right;">',
						              		'<span><b>{count}</b></span>',
						              	'</td>',
					              	'</tr>',
					            '</table>',
					              			
			
		              		'</tpl>',
		           		'<tpl if="status==7">',
		    		      	'<input type="button" class="kitchenCompleteOrderBtn red" value="Завершить заказ">',
		    		      	'<input type="button" class="kitchenPrintOrderBtn red" value="Распечатать заказ">',
		    		    '</tpl>',
		    		    '<tpl if="status!=7">',
		              		'<input type="button" class="kitchenTakeOrderBtn" value="Взять заказ">',
		              	'</tpl>',
		              '</div>', 
		          '</tpl>',
	       '</tpl>'
              ),

       // height: 500,
        //autoHeight:true,
       // multiSelect: true,

       // autoShow: true,
              emptyText: 'Нет заказов',
        listeners: {
            itemmousedown: function (me, record, item, index, e) {
                var className = e.target.className;
                               
                if ("kitchenTakeOrderBtn" == className) {
                	console.log(record.get('orderNumber'));
                    Ext.Ajax.request({
                	    url: 'rest/order/kitchen/take/store/read?orderId=' + record.get('id'),
                	    method: 'POST',

                	    failure: function(batch) {
                	    	Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
                		}
                	});
                    store.reload();
                }
                
                if ("kitchenCompleteOrderBtn red" == className) {
                	console.log(record.get('orderNumber'));
                  	Ext.Ajax.request({
            		    url: 'rest/order/kitchen/complete/store/read?orderId=' + record.get('id'),
            		    method: 'POST',
            		    failure: function(batch) {
            				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
            			}
            		});
                   	store.reload();
                }
            }
        },
       
        
        itemSelector: 'div.orderinfo',
        }],
     	    
    initComponent: function() {
    	//create the delayed task instance with our callback
    	var view = this;
 

    	//The function will start after 0 milliseconds - so we want to start instantly at first
    	//task.delay(periodReload);
        this.callParent(arguments);
    },
    
    listeners : { 
    	
    	beforerender: function(viewport, eOpts) {
    		console.log("beforerender kitchen form");
    		    		
    		var ctrl = this.getController();
    		
    		Ext.Ajax.request({
        	    url: '/arm/user',
        	    method: 'GET',          
        	    params: {},
        	    success: function(response, conn, options, eOpts) {
        	    	var json = Ext.util.JSON.decode(response.responseText);
        	    	if (json.success && json.data != null && json.data.role == 'COOK') {
        	    		Ext.getCmp('authTextLabel').setHidden(false);
        	    		Ext.getCmp('ordersTwoHours').setHidden(false);
        	    		Ext.getCmp('authUserNameLabel').setText(json.data.name);
        	    		Ext.getCmp('authUserNameLabel').setHidden(false);
        	    		Ext.getCmp('logoutBtn').setHidden(false);
        	    		Ext.TaskManager.start(task);
        	    	} else {
        	    		Ext.getCmp('ordersTwoHours').setHidden(true);
        	    		ctrl.redirectTo('logout');

        	    	}
        	    },
        	    failure: function(conn, response, options, eOpts){
        	    	var respObj = Ext.JSON.decode(response.responseText);
        	    	Ext.Msg.alert("Error", respObj.status.statusMessage);
        	    	console.log('failure' + response);
        	    	ctrl.redirectTo('logout');
    	    	}
        	});
    	}
    },
        
 
});