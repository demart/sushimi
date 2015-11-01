Ext.define('SushimiConsole.view.operator.orders.OrdersTwoListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operator.orders.ordersTwoList',
    
    orderMode: 1,
    thewindow: null,
    cancelWindow: null,
    courierWindow: null,
    newCourierWindow: null,
    cancelSiteWindow: null,

    
    //Включить режим все заказы
    onAllOrders: function () {
    	this.orderMode = 2;
    	console.log(this.orderMode);
    	Ext.getCmp('offOrdersId').setVisible(true);
    	Ext.getCmp('onOrdersId').setVisible(false);
    	Ext.Ajax.request({
		    url: 'rest/operator/order?mode=' + this.orderMode,
    	    method: 'POST',  

		    success: function(response){
		    	var store = Ext.getCmp('ordersAll');
		    	store.getStore().reload();
		    	
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
			}
		});
    },
  
    //Выключить режим все заказы
    offAllOrders: function () {
    	this.orderMode = 1;
    	console.log(this.orderMode);
    	Ext.getCmp('onOrdersId').setVisible(true);
    	Ext.getCmp('offOrdersId').setVisible(false);
    	//Ext.getCmp('onOrdersId').setVisible(true);
    	Ext.Ajax.request({
		    url: 'rest/operator/order?mode=' + this.orderMode,
    	    method: 'POST',  

		    success: function(response){
		    	var store = Ext.getCmp('ordersAll');
		    	store.getStore().reload();
		    	
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
			}
		});
    },
    
    // Отправить заказ в работу
    sendOrderToWork: function(){
    	//console.log(this.orderMode);
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var view = this;
    		Ext.MessageBox.confirm('Внимание', 'Вы уверены что хотите отправить заказ в работу?', 
				function(btn,text) {
    				if (btn == 'yes') {
    					Ext.Ajax.request({
    					    url: 'rest/order/sendToWork',
    					    params: {
    					        id: selectedRecord.data.id,
    					    },
    					    success: function(response){
    					    	store.getStore().reload();
    					    	//Ext.getCmp('refreshTreeGridButton').fireEvent('click');
    					    },
    					    failure: function(batch) {
    							Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
    						}
    					});
    				} else {
    				}
    			},
			this);
    	}
    }, 
    
    // Отправить заказ в ожидаение доставки
    sendOrderToWaitingForDelivery: function(){
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var view = this;
    		Ext.MessageBox.confirm('Внимание', 'Вы уверены что хотите отправить в ожидание доставки?', 
				function(btn,text) {
    				if (btn == 'yes') {
    					Ext.Ajax.request({
    					    url: 'rest/order/sendToWaitingForDelivery',
    					    params: { id: selectedRecord.data.id,},
    					    success: function(response){
    					    	var store = Ext.getCmp('ordersAll');
    					    	store.getStore().reload();
    					    	//Ext.getCmp('refreshTreeGridButton').fireEvent('click');
    					    },
    					    failure: function(batch) {
    							Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
    						}
    					});
    				} else {
    				}
    			},
			this);
    	}
    }, 
    
    
    // Отправить заказ на доставку
    sendOrderToDelivery: function(){
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var view = this;
    		Ext.MessageBox.confirm('Внимание', 'Вы уверены что хотите отправить заказ на доставку?', 
				function(btn,text) {
    				if (btn == 'yes') {
    					Ext.Ajax.request({
    					    url: 'rest/order/sendToDelivery',
    					    params: {
    					        id: selectedRecord.data.id,
    					    },
    					    success: function(response){
    					    	var store = Ext.getCmp('ordersAll');
    					    	store.getStore().reload();
    					    	//var sendToDelivery = Ext.getCmp('sendOrderToDeliveryBtn');
    					    	//sendToDelivery.setVisible(false);
    					    	//var completeOrder = Ext.getCmp('completeOrderBtn');
    					    	//completeOrder.setVisible(true);
    					    	//Ext.getCmp('refreshTreeGridButton').fireEvent('click');
    					    },
    					    failure: function(batch) {
    							Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
    						}
    					});
    				} else {
    				}
    			},
			this);
    	}	
    }, 
    
    // Обновить стор
    onRefreshStore : function() {
    	var store = Ext.getCmp('couriersOnMapId');
    	store.getStore().reload();
      	 Ext.getCmp('maps').map.setCenter([51.160893, 71.4500473], 11, {checkZoomRange: true});
 		Ext.getCmp('maps').map.geoObjects.remove( Ext.getCmp('maps').myCollection );
 		Ext.getCmp('maps').myCollection.removeAll();
 		//var store = Ext.getCmp('couriersOnMapId');
 		store.getStore().each(function(record){
 			var i = 0;
 			//задаем точки курьеров
 			var point = new YMaps.GeoPoint(record.data.geoLatitude, record.data.geoLongitude);
 			
 			if (record.data.status == 0)
 				styleIcon = "twirl#greyStretchyIcon";
 			else
 				styleIcon = "twirl#greenStretchyIcon";
 		
 			var myPlacemark = new ymaps.Placemark([record.data.geoLatitude, record.data.geoLongitude], {
 		   
 					iconContent: record.data.name
 				}, {
 					preset: styleIcon,
 					balloonCloseButton: false,
 					hideIconOnBalloonOpen: false
 				});
 			Ext.getCmp('maps').myCollection.add(myPlacemark);
 		});
    	Ext.getCmp('maps').map.geoObjects.add( Ext.getCmp('maps').myCollection );	
    },
    
    // Завершить заказ
    completeOrder: function(){
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var view = this;
    		Ext.MessageBox.confirm('Внимание', 'Вы уверены что хотите завершить заказ?', 
				function(btn,text) {
    				if (btn == 'yes') {
    					Ext.Ajax.request({
    					    url: 'rest/order/complete',
    					    params: {
    					        id: selectedRecord.data.id,
    					    },
    					    success: function(response){
    					    	store.getStore().reload();
    					    	//Ext.getCmp('refreshTreeGridButton').fireEvent('click');
    					    },
    					    failure: function(batch) {
    							Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
    						}
    					});
    				} else {
    				}
    			},
			this);
    	}
    }, 
    
    courierAllPoints: function () {
		Ext.getCmp('maps').map.geoObjects.remove( Ext.getCmp('maps').myCollection );
		Ext.getCmp('maps').myCollection.removeAll();
		var store = Ext.getCmp('couriersOnMapId');
		var record = store.getSelectionModel().getSelection()[0];
		
		var coords = [];
		for (var j=0; j<record.data.pointsCount; j++) {
			var point = new YMaps.GeoPoint(record.data.geoPosition[j].geoLatitude, record.data.geoPosition[j].geoLongitude);
			//console.log(record.data.geoPosition[j].geoLatitude, record.data.geoPosition[j].geoLongitude);
			//console.log(point.getLat());
			coords[j] = point;
			}
			//polyline.addPoint(point, i);
		

		
		console.log(coords);
		//console.log(Ext.getCmp('maps').polyline.getPoints());
		//Ext.getCmp('maps').polyline.setPoints(coords);
		
		console.log(polyline);
			Ext.getCmp('maps').map.geoObjects.add(polyline);				
    },
    
    allCourierView: function() {
    	 Ext.getCmp('maps').map.setCenter([51.160893, 71.4500473], 11, {checkZoomRange: true});
		Ext.getCmp('maps').map.geoObjects.remove( Ext.getCmp('maps').myCollection );
		Ext.getCmp('maps').myCollection.removeAll();
		var store = Ext.getCmp('couriersOnMapId');
		store.getStore().each(function(record){
			var i = 0;
			//задаем точки курьеров
			var point = new YMaps.GeoPoint(record.data.geoLatitude, record.data.geoLongitude);
			
			if (record.data.status == 0)
				styleIcon = "twirl#greyStretchyIcon";
			else
				styleIcon = "twirl#greenStretchyIcon";
		
			var myPlacemark = new ymaps.Placemark([record.data.geoLatitude, record.data.geoLongitude], {
		   
					iconContent: record.data.name
				}, {
					preset: styleIcon,
					balloonCloseButton: false,
					hideIconOnBalloonOpen: false
				});
			Ext.getCmp('maps').myCollection.add(myPlacemark);
		});
   	Ext.getCmp('maps').map.geoObjects.add( Ext.getCmp('maps').myCollection );	
		
    },
    
    //Вызов окна Информация по курьерам
    courierInfo: function() {
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	
    	if (this.thewindow == null)
    			this.thewindow = Ext.widget('operator.orders.courierMapWindow');
			
    			Ext.get('YMapsID').setStyle('display', '');
				
    			var store = Ext.getCmp('couriersOnMapId');
				store.getStore().load();

				Ext.getCmp('maps').map.geoObjects.remove( Ext.getCmp('maps').myCollection );
				Ext.getCmp('maps').myCollection.removeAll();
    	   
				store.getStore().each(function(record){
					var i = 0;
					/*
					 * Блок с ломаной линией
					var array = [];
					while (record.data.geoPosition[i] != null) {
						var p = new YMaps.GeoPoint(record.data.geoPosition[i].geoLatitude, record.data.geoPosition[i].geoLongitude);
						array[i] = p;
						i++;
					}
					var pl = new ymaps.Polyline(array, {
    		                                    hintContent: "Ломаная линия"
    		                                }, {
    		                                    draggable: true,
    		                                    strokeColor: '#000000',
    		                                    strokeWidth: 4,
    		                                    // Первой цифрой задаем длину штриха. Второй цифрой задаем длину разрыва.
    		                                    strokeStyle: '1 5'
    		                                });
    		   console.log(pl);
               Ext.getCmp('maps').map.geoObjects.add(pl);
               */
					//задаем точки курьеров
					var point = new YMaps.GeoPoint(record.data.geoLatitude, record.data.geoLongitude);
					
					if (record.data.status == 0)
						styleIcon = "twirl#greyStretchyIcon";
					else
						styleIcon = "twirl#greenStretchyIcon";
   			
					var myPlacemark = new ymaps.Placemark([record.data.geoLatitude, record.data.geoLongitude], {
   			   
							iconContent: record.data.name
						}, {
							preset: styleIcon,
							balloonCloseButton: false,
							hideIconOnBalloonOpen: false
						});
					Ext.getCmp('maps').myCollection.add(myPlacemark);
				});
		   	Ext.getCmp('maps').map.geoObjects.add( Ext.getCmp('maps').myCollection );	
    	   
    	   // show the window
    	   this.thewindow.show();
    	   
    },
    
    //Выбор курьера
    sendCourier: function() {
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    		if (this.courierWindow == null)
    			this.courierWindow = Ext.widget('operator.orders.courierWindow');
    	   var store = Ext.getCmp('courierListId');
    	   store.getStore().reload();
    	//   Ext.getCmp('selectCourierBtn').setVisible(true);
    	 //  Ext.getCmp('selectNewCourierBtn').setVisible(false);

    	   // show the window
    	   this.courierWindow.show();
    },
    
    //Изменить курьера
    selectNewCourier: function() {
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    		if (this.newCourierWindow == null)
    			this.newCourierWindow = Ext.widget('operator.orders.newCourierWindow');
    	   //var store = Ext.getCmp('courierListId');
    	   //store.getStore().reload();
    	 //  Ext.getCmp('selectCourierBtn').setVisible(false);
    	  // Ext.getCmp('selectNewCourierBtn').setVisible(true);

    	   // show the window
    	   this.newCourierWindow.show();
    },
    
    //Выбрать курьера
    onSelectCourierClick: function () {
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	
    	var store2 = Ext.getCmp('courierListId');
    	var selectedRecord2 = store2.getSelectionModel().getSelection()[0];
    	console.log(selectedRecord.id);
    	
    	Ext.Ajax.request({
		    url: 'rest/operator/courier?orderId=' + selectedRecord.id + '&courierId=' + selectedRecord2.id,
    	    method: 'POST',  

		    success: function(response){
		    	//this.thewindow.hide();
		    	//Ext.destroy(this.thewindow);
		    	//this.thewindow.closeAction='destroy';
		    	//this.thewindow.close();
		    	//this.thewindow = Ext.widget('operator.orders.courierWindow');
		    	//console.log(this.thewindow);
		    	//this.thewindow.destroy();
		    	Ext.getCmp('r').hide();
		    	this.courierWindow = null;
		    	var store = Ext.getCmp('ordersAll');
		    	store.getStore().reload();
		    	
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
			}
		});
    },
    
    //Выбрать нового курьера
    onSelectNewCourierClick: function () {
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	
    	var store2 = Ext.getCmp('courierListFormId');
    	var selectedRecord2 = store2.getSelectionModel().getSelection()[0];
    	console.log(selectedRecord.id);
    	
    	Ext.Ajax.request({
		    url: 'rest/operator/courier/update?orderId=' + selectedRecord.id + '&courierId=' + selectedRecord2.id,
    	    method: 'POST',  

		    success: function(response){
		    	//this.thewindow.hide();
		    	//Ext.destroy(this.thewindow);
		    	//this.thewindow.closeAction='destroy';
		    	//this.thewindow.close();
		    	//this.thewindow = Ext.widget('operator.orders.courierWindow');
		    	//console.log(this.thewindow);
		    	//this.thewindow.destroy();
		    	Ext.getCmp('newCourierList').hide();
		    	this.newCourierWindow = null;
		    	var store = Ext.getCmp('ordersAll');
		    	store.getStore().reload();
		    	
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
			}
		});
    },
    
 
    //Просмотр заказа
    previewOrder: function() {
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		//console.log(Ext.getCmp('mainViewportId'));
    		var win = Ext.getCmp('mainViewportId').lookupReference('previewOrderWindow');
            if (!win) {
                win = new SushimiConsole.view.operator.orders.window.PreviewOrderWindow();
                Ext.getCmp('mainViewportId').add(win);
            }
    		win.controller.previewOrder(selectedRecord);
    	}
    },
    
    // оформить заказ с сайта
    newSiteOrder: function() {
    	var store = Ext.getCmp('ordersAll');
    	//console.log(store.getStore());
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var win = Ext.getCmp('mainViewportId').lookupReference('newOrderWindow');
            if (!win) {
            	win = new SushimiConsole.view.order.window.NewOrderWindow({id: 'newOrderWindow'});
                Ext.getCmp('mainViewportId').add(win);
            }
    		win.controller.showSiteOrderWindow(selectedRecord.id);
    	}
    },
    
    
    // Отображает окно завершения заказа
    cancelOrder: function() {
    	/*
    	var win = this.lookupReference('cancelOrderWindow');
        if (!win) {
            win = new SushimiConsole.view.operator.orders.window.CancelOrderWindow();
        	win = Ext.widget('operator.orders.cancelWindow');
            this.getView().add(win);
           
        }
        this.lookupReference('cancelOrderWindowForm').getForm().reset();
        record = Ext.create('SushimiConsole.model.order.CancelOrderModel');
    	record.set(win.down("form").getValues());
    	
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	store.getStore().reload();
    	record.data.orderId = selectedRecord.data.id; 
    	
    	win.down("form").loadRecord(record);
        win.show();
        */
    	if (this.cancelWindow == null)
    		this.cancelWindow = Ext.widget('operator.orders.cancelWindow');
        Ext.getCmp('cccForm').getForm().reset();
    	record = Ext.create('SushimiConsole.model.order.CancelOrderModel');
      	record.set(this.cancelWindow.down("form").getValues());
      	
      	var store = Ext.getCmp('ordersAll');
      	var selectedRecord = store.getSelectionModel().getSelection()[0];
      	store.getStore().reload();
      	record.data.orderId = selectedRecord.data.id; 
      	
      	this.cancelWindow.down("form").loadRecord(record);
    	this.cancelWindow.show();
    	
    },
    
    courierOrder: function () {
    	var store = this.view.getStore();
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	console.log (selectedRecord.data.id);
      	Ext.Ajax.request({
    	    url: '/operator/order/courier?orderId=' + selectedRecord.data.id,
    	    method: 'POST',          
    	    success: function(response, conn, options, eOpts) {
    	    	var json = Ext.util.JSON.decode(response.responseText);
    	    	if (json.success) {
    	
    	    		Ext.MessageBox.show({
  	    	           title: 'История заказа',
  	    	           msg: json.message,
  	    	           buttons: Ext.MessageBox.OK,
  	    	           icon: Ext.MessageBox.WARNING
  	    	       });
    	    	} 
    	    },                                    
 
    	});
    },
    
    
    // закрыть окно формирования отказа
    onCancelOrderFormCancel : function() {
        Ext.getCmp('ccc').hide();
        this.cancelWindow = null;
    },
    
    // сформировать отказ
    onCancelOrderFormSubmit : function() {
    	 var formPanel = this.lookupReference('cancelOrderWindowForm'),
         form = formPanel.getForm();
    	 var view = this;
	     if (form.isValid()) {
	     	var record = form.getRecord();
	     	var values = form.getValues();
	     	record.set(values);
	     	
	     	Ext.Ajax.request({
			    url: 'rest/operator/order/cancel',
			    jsonData : {
			    	orderId : record.data.orderId,
			    	state : record.data.state,
			        reason : record.data.reason,
			    },
			    
			    success: function(response){
			    	// TODO : Прикрутить обновления дерева заказов
			    	Ext.getCmp('ccc').hide();
			    	this.cancelWindow = null;
			    	var store = Ext.getCmp('ordersAll');
			    	store.getStore().reload();
			    	//Ext.getCmp('refreshTreeGridButton').fireEvent('click');
			    },
			    failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
	     	
	     }
    },
    

    
    // ==============================================
    // ==============================================

    // Отображает окно завершения заказа
    cancelSiteOrder: function() {
    	if (cancelSiteWindow == null)
    		this.cancelSiteWindow = Ext.widget('operator.orders.cancelSiteWindow');
        Ext.getCmp('cancelSiteOrderWindowForm').getForm().reset();
    	record = Ext.create('SushimiConsole.model.order.CancelSiteOrderModel');
      	record.set(this.cancelSiteWindow.down("form").getValues());
      	
      	var store = Ext.getCmp('ordersAll');
      	var selectedRecord = store.getSelectionModel().getSelection()[0];
      	store.getStore().reload();
    	record.data.siteOrderId = selectedRecord.data.id; 
      	
      	this.cancelSiteWindow.down("form").loadRecord(record);
    	this.cancelSiteWindow.show();
    	/*
    	var win = this.lookupReference('cancelSiteOrderWindow');
        if (!win) {
            win = new SushimiConsole.view.operator.orders.window.CancelSiteOrderWindow();
            this.getView().add(win);
        }
        this.lookupReference('cancelSiteOrderWindowForm').getForm().reset();
        record = Ext.create('SushimiConsole.model.order.CancelSiteOrderModel');
    	record.set(win.down("form").getValues());
    	
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	record.data.siteOrderId = selectedRecord.data.id; 
    	
    	win.down("form").loadRecord(record);
        win.show();
        */
    },
    
    // закрыть окно формирования отказа
    onCancelSiteOrderFormCancel : function() {
        Ext.getCmp('cancelSiteOrderWindow').hide();
        this.cancelSiteWindow = null;
    },
    
    // сформировать отказ
    onCancelSiteOrderFormSubmit : function() {
    	 var formPanel = this.lookupReference('cancelSiteOrderWindowForm'),
         form = formPanel.getForm();
    	 var view = this;
	     if (form.isValid()) {
	     	var record = form.getRecord();
	     	var values = form.getValues();
	     	record.set(values);
	     	
	     	Ext.Ajax.request({
			    url: 'rest/order/site/cancelOrder',
			    jsonData : {
			    	siteOrderId : record.data.siteOrderId,
			    	state : record.data.state,
			        reason : record.data.reason,
			    },
			    
			    success: function(response){
			    	// TODO : Прикрутить обновления дерева заказов
			    	//view.lookupReference('cancelSiteOrderWindow').hide();
			    	Ext.getCmp('cancelSiteOrderWindow').hide();
			    	this.cancelSiteWindow = null;
			    	
			    	var store = Ext.getCmp('ordersAll');
			    	store.getStore().reload();
			    	//Ext.getCmp('refreshTreeGridButton').fireEvent('click');
			    },
			    failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
	     	
	     }
    },    
    
    // Завершить заказ
    completeOrder: function(){
    	var store = Ext.getCmp('ordersAll');
    	var selectedRecord = store.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var view = this;
    		Ext.MessageBox.confirm('Внимание', 'Вы уверены что хотите завершить заказ?', 
				function(btn,text) {
    				if (btn == 'yes') {
    					Ext.Ajax.request({
    					    url: 'rest/order/complete',
    					    params: {
    					        id: selectedRecord.data.id,
    					    },
    					    success: function(response){
    					    	store.getStore().reload();
    					    	//Ext.getCmp('refreshTreeGridButton').fireEvent('click');
    					    },
    					    failure: function(batch) {
    							Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
    						}
    					});
    				} else {
    				}
    			},
			this);
    	}
    }, 
    
});