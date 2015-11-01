Ext.define('SushimiConsole.view.dictionaries.deliveryprice.DeliveryPriceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionaries.deliveryprice',
    
    windowMode : 'add',
    
    showAddWindow: function() {
        var win = this.lookupReference('deliverypriceEditWindow');
        if (!win) {
            win = new SushimiConsole.view.dictionaries.deliveryprice.DeliveryPriceEditWindow();
            this.getView().add(win);
        }
        this.lookupReference('deliverypriceEditWindowForm').getForm().reset();
        record = Ext.create('SushimiConsole.model.DeliveryPriceModel');
		record.set(win.down("form").getValues());
		win.down("form").loadRecord(record);
		this.windowMode = 'add';
        win.show();
    },
    
    
    showEditWindow: function() {
        var win = this.lookupReference('deliverypriceEditWindow');
        if (!win) {
        	win = new SushimiConsole.view.dictionaries.deliveryprice.DeliveryPriceEditWindow();
            this.getView().add(win);
        }
        var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	win.down('form').loadRecord(selectedRecord);
    	this.windowMode = 'edit';
    	win.show();
    },    
    
    // Удалить запись
    onDeleteRecord : function() {
    	var store = this.view.getStore();
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	console.log(selectedRecord);
    	if (selectedRecord) {
    		Ext.MessageBox.confirm('Внимание', 'Вы уверены что хотите удалить запись?', 
				function(btn,text) {
    				if (btn == 'yes') {
    					Ext.Ajax.request({
    					    url: 'rest/dictionary/deliveryprice/store/destroy',
    					    params: {
    					        id: selectedRecord.data.id,
    					    },
    					    success: function(response){
    					    	store.reload();
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
    	this.view.getStore().reload();
    },
    
    onFormCancel: function() {
        this.lookupReference('deliverypriceEditWindowForm').getForm().reset();
        this.lookupReference('deliverypriceEditWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('deliverypriceEditWindowForm'),
            form = formPanel.getForm();
        var view = this;
        if (form.isValid()) {
        	var record = form.getRecord();
        	var values = form.getValues();
        	record.set(values);
        	if (this.windowMode == 'add') {
        		record.id = '0';
        		record.data.id = '0';
        		this.view.getStore().add(record);
        	}
        	this.view.getStore().sync({
				success: function() {
					form.reset();
					view.lookupReference('deliverypriceEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    }    
    
});