Ext.define('SushimiConsole.view.warehouse.WarehouseItemListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.warehouse.warehouseItem',
    
    windowMode : 'add',
    
    showAddWindow: function() {
        var win = this.lookupReference('warehouseItemEditWindow');
        if (!win) {
            win = new SushimiConsole.view.warehouse.WarehouseItemEditWindow();
            this.getView().add(win);
        }
        this.lookupReference('warehouseItemEditWindowForm').getForm().reset();
        record = Ext.create('SushimiConsole.model.WarehouseItemModel');
		record.set(win.down("form").getValues());
		win.down("form").loadRecord(record);
		this.windowMode = 'add';
		win.center();
        win.show();
    },
    
    
    showEditWindow: function() {
        var win = this.lookupReference('warehouseItemEditWindow');
        if (!win) {
        	win = new SushimiConsole.view.warehouse.WarehouseItemEditWindow();
            this.getView().add(win);
        }
        this.lookupReference('warehouseItemEditWindowForm').getForm().reset();
        
        var selectedRecord = this.view.getSelectionModel().getSelection()[0];
        win.down('form').loadRecord(selectedRecord);
    	this.windowMode = 'edit';
    	win.center();
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
    					    url: 'rest/warehouse/item/store/destroy',
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
        this.lookupReference('warehouseItemEditWindowForm').getForm().reset();
        this.lookupReference('warehouseItemEditWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('warehouseItemEditWindowForm'),
            form = formPanel.getForm();
        var view = this;
        if (form.isValid()) {
        	var record = form.getRecord();
        	console.log(record);
        	var values = form.getValues();
        	console.log(values);
        	record.set(values);
        	console.log(record);
        	if (this.windowMode == 'add') {
        		record.id = '0';
        		record.data.id = '0';
        		this.view.getStore().add(record);
        	}
        	this.view.getStore().sync({
				success: function() {
					form.reset();
					view.lookupReference('warehouseItemEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    },
    
});