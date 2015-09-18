var  DeliveryModel = Ext.define('DeliveryModel', {
        extend: 'Ext.data.Model',
        idProperty: 'id',
        fields: [
    		{ name: 'id', type: 'int'}, 
    		{ name: 'clientAddress'},
    		{ name: 'orderNumber'},
    		{ name: 'orderState'},
    		{ name: 'status'},
    		{ name: 'sum'},
    		{ name: 'comment'},
    		{ name: 'clientCash'},
    		{ name: 'deliveryDate'},
    		{ name: 'deliveryDateDelivery'},
    		{ name: 'statusType'},
    		{ name: 'timer'}
    	],
    	
		hasMany: {
		    model: 'DeliveryTakeOrdersModel',
		    name: 'orders',
		    primaryKey: 'id',
			foreignKey: 'ownerId',
		},
		   	
    });

var  DeliveryTakeOrdersModel = Ext.define('DeliveryTakeOrdersModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
             {name: 'id', type: 'int'},
 

     	],
     	belongsTo: [
             { 
             	model: 'DeliveryModel', 
             	associationKey: 'id',
             	primaryKey: 'id',
             	foreignKey: 'id',
     		}
         ],
	
});

var periodReload = 5000; //период апдейта


var store = Ext.create('Ext.data.Store', {
        model: 'DeliveryModel',
        
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
                read: 'rest/order/delivery/store/read',
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

 /*  
store.load({
	

        params: {
        	periodReload: periodReload
        },
    	
		callback: function(records, operation, success) {
			store.sort('deliveryDate', 'ASC');
		},

	    scope: this
	});
*/
var task = {
		run: function () {
    		store.load({
                params: {
                	periodReload: periodReload,
                }, 
           
    			callback: function(records, operation, success) {
        			//	 console.log(store.getCount());
        				//console.log (records[store.getCount() - 1]);
        		      //  console.log(records[store.getCount() - 1].data.lastUpdateTime);
        		       // console.log(lastUpdateTime);
    				store.sort('deliveryDate', 'ASC');
    				
   
    				
    	    		
   				
    		        }
        		    
   		    
		
    		});
    	

		},
			
		interval: periodReload
};


var arrayCourierOrders;
var countOrdersInArray;

Ext.define('SushimiConsoleARM.view.delivery.Delivery' ,{
    extend: 'Ext.panel.Panel',
    controller: 'delivery.DeliveryController',
    alias: 'widget.delivery.Delivery',
    
    requires: [
        'Ext.window.Toast',
        'Ext.layout.container.Center',
        'Ext.view.View',
   		'SushimiConsoleARM.view.delivery.DeliveryController',
	],
	
	width: 500,
    height: 400,
    layout: 'auto',
    region: 'center',
    title: 'Заказы для доставки',
    loadMask: false,

    collapsible: true,
    
    items: [  
            {
            	xtype: 'button',
            	text: 'Подтвердить',
            	scale: 'large',
            	listeners: {
            		click: function() {
            			console.log("click");
        	    		Ext.TaskManager.stop(task);
            			
            			var model = new DeliveryModel();
        	    		
            			model.data.orders = new Array();
            				for (var i=0; i<countOrdersInArray; i++)
            					model.data.orders[i]={id: arrayCourierOrders[i]};
            	    	
            	    	model.data.id = 0;
            	    	var data = model.getData();
            			
                        Ext.Ajax.request({
                    	    url: 'rest/order/delivery/take/store/read',
                    	    method: 'POST',
                    	    jsonData: data,
                    	    
                    	    success: function(response, conn, options, eOpts) {
                    	    	var json = Ext.util.JSON.decode(response.responseText);
                    	    	if (json.success == true) {
                    	    		//console.log('json: ' + response.responseText);
 
                    	    			Ext.MessageBox.show({
                     	    	           title: 'Внимание',
                     	    	           msg: json.message,
                     	    	           buttons: Ext.MessageBox.OK,
                     	    	           icon: Ext.MessageBox.WARNING
                     	    	       });
                    	    			arrayCourierOrders = new Array();
                    	    			countOrdersInArray = 0;
                    	    			store.load();
                    	    			//this.redirectTo('logout');
                    	    		
                    	    		
                    	    	} 
                    	    }, 

                    	    failure: function(batch) {
                    	    	Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
                    		}
                    	});
            		}
            	}
            },
              {
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
     			'<tpl if="status==0">',
   					'<div style="" class="orderinfo grey">',
   				'</tpl>',
   	     		'<tpl if="status==1">',
   	     			'<div style="" class="orderinfo yellow">',
   				'</tpl>',
   	     		'<tpl if="status==2">',
   	     			'<div style="" class="orderinfo red">',
   				'</tpl>',
   	     		'<tpl if="status==3">',
	     			'<div style="" class="orderinfo grey">',
				'</tpl>',
   					'<span class="courierTimer"> {timer} </span><br>',
   					'<span>Заказ <b>#{orderNumber}</b> </span><br>',
   					'<tpl if="statusType==0 || statusType==2">',
   						'<span>Тип доставки: Доставка</span><br>',
   					'</tpl>',
   					'<tpl if="statusType==1 || statusType==3">',
   						'<span>Тип доставки: Доставка ко времени</span><br>',
   					'</tpl>',
   					'<span>Время доставки: {deliveryDateDelivery}</span><br>',
   					'<span>Адрес доставки: {clientAddress}</span><br>',
   					'<span>Сумма заказа: {sum}</span><br>',
   					'<span>Сдача с: {clientCash}</span><br>',
   					'<span>Комментарий: {comment}</span><br>',
   					'<tpl if="this.isStatus (id, statusType)">',
   					'<span class="courierTakingOrder">Уже Вы взяли данный заказ</span><br>',
   					'<tpl else>',
   						'<tpl if="status==3">', 
   						'<span class="courierOrderInProgress">Заказ еще готовится</span>',
   						'<tpl else>',
   							'<input type="button" class="courierTakeOrderBtn" value="Взять заказ">',
   							'</tpl>',
   						'</tpl>',
   						
   					   				'</div>',
   			'</tpl>',
   			{
   			isStatus: function(id, statusType) {
   				for (var i = 0; i < countOrdersInArray; i++) {
   					if (arrayCourierOrders[i] == id) {
   						
   						return statusType != 4;
   					}
   					}
   				
   				
   				}
   			}
              ),

        emptyText: 'Нет заказов',
        itemSelector: 'div.orderinfo',
        listeners: {
            itemmousedown: function (me, record, item, index, e) {
                var className = e.target.className;
                               
                if ("courierTakeOrderBtn" == className) {
                	console.log("courierTakeOrderBtn");
                	arrayCourierOrders[countOrdersInArray] = record.get('id');
                	countOrdersInArray++;
                	console.log("All array:");
                	for (var i=0; i<countOrdersInArray; i++)
                		console.log(arrayCourierOrders[i]);
                	store.load();
                	
                }
            }
        },
        }],
    
    initComponent: function() {
    	//create the delayed task instance with our callback
    	var view = this;
        this.callParent(arguments);
    },
    
    listeners : { 
    	beforerender: function(viewport, eOpts) {
    		console.log("beforerender delivery form");
    		
    		var ctrl = this.getController();
    		
    		Ext.Ajax.request({
        	    url: '/arm/user',
        	    method: 'GET',          
        	    params: {},
        	    success: function(response, conn, options, eOpts) {
        	    	var json = Ext.util.JSON.decode(response.responseText);
        	    	if (json.success && json.data != null && json.data.role == 'COURIER') {
        	    		Ext.getCmp('authTextLabel').setHidden(false);
        	    		Ext.getCmp('authUserNameLabel').setText(json.data.name);
        	    		Ext.getCmp('authUserNameLabel').setHidden(false);
        	    		Ext.getCmp('logoutBtn').setHidden(false);
        	    		Ext.TaskManager.start(task);
        	    		arrayCourierOrders = new Array();
        	    		countOrdersInArray = 0;
        	    	} else {
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