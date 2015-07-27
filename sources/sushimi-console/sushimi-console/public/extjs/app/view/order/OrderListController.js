Ext.define('SushimiConsole.view.order.OrderListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.order.orderList',

    
    refreshOrderGrid : function() {
    	this.view.getStore().reload();
    }, 
    
    // Выбор заказа
    selectOrderRow: function(obj, record, index, eOpts) {
    	//var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	var selectedRecord = record;
    	if (selectedRecord == null || selectedRecord == undefined) 
    		return;
    	
    	if (selectedRecord.data.state == 'NONE') {}
    	
    	if (selectedRecord.data.state == 'REGISTERED') {
    		this.lookupReference('previewOrderBtn').setVisible(true);
    		this.lookupReference('printOrderBtn').setVisible(true);
    		this.lookupReference('sendOrderToWorkBtn').setVisible(true);
    		this.lookupReference('sendOrderToDeliveryBtn').setVisible(true);
    		this.lookupReference('completeOrderBtn').setVisible(true);
    		this.lookupReference('cancelOrderBtn').setVisible(true);
    	}
    	if (selectedRecord.data.state == 'IN_PROGRESS') {
    		this.lookupReference('previewOrderBtn').setVisible(true);
    		this.lookupReference('printOrderBtn').setVisible(true);
    		this.lookupReference('sendOrderToWorkBtn').setVisible(false);
    		this.lookupReference('sendOrderToDeliveryBtn').setVisible(true);
    		this.lookupReference('completeOrderBtn').setVisible(true);
    		this.lookupReference('cancelOrderBtn').setVisible(true);
    	}
    	if (selectedRecord.data.state == 'ON_DELIVERY') {
    		this.lookupReference('previewOrderBtn').setVisible(true);
    		this.lookupReference('printOrderBtn').setVisible(true);
    		this.lookupReference('sendOrderToWorkBtn').setVisible(false);
    		this.lookupReference('sendOrderToDeliveryBtn').setVisible(false);
    		this.lookupReference('completeOrderBtn').setVisible(true);
    		this.lookupReference('cancelOrderBtn').setVisible(true);
    	}
    	if (selectedRecord.data.state == 'DELIVERED') {
    		this.lookupReference('previewOrderBtn').setVisible(true);
    		this.lookupReference('printOrderBtn').setVisible(false);
    		this.lookupReference('sendOrderToWorkBtn').setVisible(false);
    		this.lookupReference('sendOrderToDeliveryBtn').setVisible(false);
    		this.lookupReference('completeOrderBtn').setVisible(false);
    		this.lookupReference('cancelOrderBtn').setVisible(false);
    	}
    	if (selectedRecord.data.state == 'RETURNED') {
    		this.lookupReference('previewOrderBtn').setVisible(true);
    		this.lookupReference('printOrderBtn').setVisible(false);
    		this.lookupReference('sendOrderToWorkBtn').setVisible(false);
    		this.lookupReference('sendOrderToDeliveryBtn').setVisible(false);
    		this.lookupReference('completeOrderBtn').setVisible(false);
    		this.lookupReference('cancelOrderBtn').setVisible(false);
    	}
    	if (selectedRecord.data.state == 'CANCELED') {
    		this.lookupReference('previewOrderBtn').setVisible(true);
    		this.lookupReference('printOrderBtn').setVisible(false);
    		this.lookupReference('sendOrderToWorkBtn').setVisible(false);
    		this.lookupReference('sendOrderToDeliveryBtn').setVisible(false);
    		this.lookupReference('completeOrderBtn').setVisible(false);
    		this.lookupReference('cancelOrderBtn').setVisible(false);
    		return;
    	}
    },
    
    
    // Просмотреть заказ
    previewOrder: function() {
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		//console.log(Ext.getCmp('mainViewportId'));
    		var win = Ext.getCmp('mainViewportId').lookupReference('previewOrderWindow');
            if (!win) {
                win = new SushimiConsole.view.order.window.PreviewOrderWindow();
                Ext.getCmp('mainViewportId').add(win);
            }
    		win.controller.previewOrder(selectedRecord);
    	}
    },
    
    // Распечатать заказ
    printOrder: function(){
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		window.open('/order/print/' + selectedRecord.data.id);
    	}
    }, 
    
    
    // Отправить заказ в работу
    sendOrderToWork: function(){
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
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
    					    	view.view.getStore().reload();
    					    	Ext.getCmp('refreshTreeGridButton').fireEvent('click');
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
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
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
    					    	view.view.getStore().reload();
    					    	Ext.getCmp('refreshTreeGridButton').fireEvent('click');
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
    
    // Завершить заказ
    completeOrder: function(){
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
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
    					    	view.view.getStore().reload();
    					    	Ext.getCmp('refreshTreeGridButton').fireEvent('click');
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
           
    
    
    // ======================================================
    // ================== CANCEL ORDER ======================
    // ======================================================    
    
    // Отображает окно завершения заказа
    cancelOrder: function() {
    	var win = this.lookupReference('cancelOrderWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.CancelOrderWindow();
            this.getView().add(win);
        }
        this.lookupReference('cancelOrderWindowForm').getForm().reset();
        record = Ext.create('SushimiConsole.model.order.CancelOrderModel');
    	record.set(win.down("form").getValues());
    	
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	record.data.orderId = selectedRecord.data.id; 
    	
    	win.down("form").loadRecord(record);
        win.show();
    },
    
    // закрыть окно формирования отказа
    onCancelOrderFormCancel : function() {
        this.lookupReference('cancelOrderWindow').hide();
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
			    url: 'rest/order/cancel',
			    jsonData : {
			    	orderId : record.data.orderId,
			    	state : record.data.state,
			        reason : record.data.reason,
			    },
			    
			    success: function(response){
			    	// TODO : Прикрутить обновления дерева заказов
			    	view.lookupReference('cancelOrderWindow').hide();
			    	view.view.getStore().reload();
			    	Ext.getCmp('refreshTreeGridButton').fireEvent('click');
			    },
			    failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
	     	
	     }
    },
    
    
});