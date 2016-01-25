Ext.define('SushimiConsole.view.dictionaries.couriers.CouriersListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionaries.couriers',
    
    windowMode : 'add',
    
    showEditWindow: function() {
        var win = this.lookupReference('couriersEditWindow');
        if (!win) {
        	win = new SushimiConsole.view.dictionaries.couriers.CouriersEditWindow();
            this.getView().add(win);
        }
        this.lookupReference('couriersEditWindowForm').getForm().reset();
        
        var selectedRecord = this.view.getSelectionModel().getSelection()[0];
        win.down('form').loadRecord(selectedRecord);
    	this.windowMode = 'edit';
    	win.show();
    },    
    
    
    onFormCancel: function() {
        this.lookupReference('couriersEditWindowForm').getForm().reset();
        this.lookupReference('couriersEditWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('couriersEditWindowForm'),
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
					view.lookupReference('couriersEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    },    
});