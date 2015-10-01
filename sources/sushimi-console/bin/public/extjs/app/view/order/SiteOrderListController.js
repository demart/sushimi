Ext.define('SushimiConsole.view.order.SiteOrderListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.order.siteOrderList',


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
    	
    	if (selectedRecord.data.status == 'RECEIVED') {
    		this.lookupReference('previewSiteOrderBtn').setVisible(true);
    		this.lookupReference('registerSiteOrderBtn').setVisible(true);
    		this.lookupReference('cancelSiteOrderBtn').setVisible(true);
    		return;
    	}
    	if (selectedRecord.data.status == 'REGISTERED') {
    		this.lookupReference('previewSiteOrderBtn').setVisible(true);
    		this.lookupReference('registerSiteOrderBtn').setVisible(false);
    		this.lookupReference('cancelSiteOrderBtn').setVisible(false);
    		return;
    	}
    	if (selectedRecord.data.status == 'CANCELED') {
    		this.lookupReference('previewSiteOrderBtn').setVisible(true);
    		this.lookupReference('registerSiteOrderBtn').setVisible(false);
    		this.lookupReference('cancelSiteOrderBtn').setVisible(false);
    		return;
    	}
    },
    
    
    // Просмотреть заказ
    registerSiteOrder: function() {
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var win = Ext.getCmp('mainViewportId').lookupReference('newOrderWindow');
            if (!win) {
            	win = new SushimiConsole.view.order.window.NewOrderWindow({id: 'newOrderWindow'});
                Ext.getCmp('mainViewportId').add(win);
            }
    		win.controller.showSiteOrderWindow(selectedRecord.id);
    	}
    },
    
    // Просмотреть заказ
    previewOrder: function() {
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		var win = Ext.getCmp('mainViewportId').lookupReference('previewSiteOrderWindow');
            if (!win) {
                win = new SushimiConsole.view.order.window.PreviewSiteOrderWindow();
                Ext.getCmp('mainViewportId').add(win);
            }
    		win.controller.previewOrder(selectedRecord);
    	}
    },
    
    
    // ==============================================
    // ==============================================

    // Отображает окно завершения заказа
    cancelSiteOrder: function() {
    	var win = this.lookupReference('cancelSiteOrderWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.CancelSiteOrderWindow();
            this.getView().add(win);
        }
        this.lookupReference('cancelSiteOrderWindowForm').getForm().reset();
        record = Ext.create('SushimiConsole.model.order.CancelSiteOrderModel');
    	record.set(win.down("form").getValues());
    	
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	record.data.siteOrderId = selectedRecord.data.id; 
    	
    	win.down("form").loadRecord(record);
        win.show();
    },
    
    // закрыть окно формирования отказа
    onCancelSiteOrderFormCancel : function() {
        this.lookupReference('cancelSiteOrderWindow').hide();
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
			    	view.lookupReference('cancelSiteOrderWindow').hide();
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