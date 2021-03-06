Ext.define('SushimiConsole.view.clients.information.InfoClientsListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clients.information',
    
    windowMode : 'add',
    
    showAddWindow: function() {
        var win = this.lookupReference('infoClientsEditWindow');
        if (!win) {
            win = new SushimiConsole.view.clients.information.InfoClientsEditWindow();
            this.getView().add(win);
        }
        record = Ext.create('SushimiConsole.model.InfoClientsModel');
		record.set(win.down("form").getValues());
		win.down("form").loadRecord(record);
		this.windowMode = 'add';
        win.show();
    },
    
    
    showEditWindow: function() {
        var win = this.lookupReference('infoClientsEditWindow');
        if (!win) {
        	win = new SushimiConsole.view.clients.information.InfoClientsEditWindow();
            this.getView().add(win);
        }
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
    					    url: 'rest/clients/information/store/destroy',
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
        this.lookupReference('infoClientsEditWindowForm').getForm().reset();
        this.lookupReference('infoClientsEditWindow').hide();
    },
    
    
    /**
     * Обновление store после поиска, выводит всех клиентов.
     */
    onRefreshClientsStore : function() {
    	var clientName = Ext.getCmp('ClientNameField');
    	var clientPhone = Ext.getCmp('ClientPhoneField');
    	var clientMainGrid = Ext.getCmp('clientsInfoClientsStoreId');
    	clientMainGrid.store.proxy.api.read = 'rest/clients/information/store/read';
    	clientMainGrid.getStore().reload();
    	clientName.reset();
    	clientPhone.reset();
    	
    },
    
    /**
     * Поисква клиента по критериям
     */
    searchClients: function() {
    	var clientMainNameField = Ext.getCmp('ClientNameField');
    	var clientMainPhoneField = Ext.getCmp('ClientPhoneField');
    	var clientMainSearchGrid = Ext.getCmp('clientsInfoClientsStoreId');
    	clientMainSearchGrid.store.proxy.api.read = 'rest/client/search/store/read?name=' + clientMainNameField.getValue() + '&phone=' + clientMainPhoneField.getValue();
    	clientMainSearchGrid.getStore().reload();
    }, 
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('infoClientsEditWindowForm'),
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
					view.lookupReference('infoClientsEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    }    
    
});