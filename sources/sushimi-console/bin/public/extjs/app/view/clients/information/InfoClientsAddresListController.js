Ext.define('SushimiConsole.view.clients.information.InfoClientsAddresListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clients.infoClientsAddres',
    
    windowMode : 'add',
    
    showAddWindow: function() {
        var win = this.lookupReference('infoClientsAddresEditWindow');
        if (!win) {
            win = new SushimiConsole.view.clients.information.InfoClientsAddresEditWindow();
            this.getView().add(win);
        }
        this.lookupReference('InfoClientsAddresEditWindowForm').getForm().reset();
        record = Ext.create('SushimiConsole.model.InfoClientsAddresModel');
		record.set(win.down("form").getValues());
		win.down("form").loadRecord(record);
		this.windowMode = 'add';
        win.show();
    },
    
    
    showEditWindow: function() {
        var win = this.lookupReference('InfoClientsAddresEditWindow');
        if (!win) {
        	win = new SushimiConsole.view.clients.information.InfoClientsAddresEditWindow();
            this.getView().add(win);
        }
        this.lookupReference('InfoClientsAddresEditWindowForm').getForm().reset();
        
        var selectedRecord = this.view.getSelectionModel().getSelection()[0];
        win.down('form').loadRecord(selectedRecord);
    	this.windowMode = 'edit';
    	win.show();
    },    
    
    
    /**
     * Удаление записи
     */
    onDeleteRecord : function() {
    	var store = this.view.getStore();
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	console.log(selectedRecord);
    	if (selectedRecord) {
    		Ext.MessageBox.confirm('Внимание', 'Вы уверены что хотите удалить запись?', 
				function(btn,text) {
    				if (btn == 'yes') {
    					Ext.Ajax.request({
    					    url: 'rest/clients/information/addres/store/destroy',
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
        this.lookupReference('InfoClientsAddresEditWindowForm').getForm().reset();
        this.lookupReference('InfoClientsAddresEditWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('InfoClientsAddresEditWindowForm'),
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
					view.lookupReference('InfoClientsAddresEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    },
    
});