Ext.define('SushimiWebAdmin.view.dictionaries.staff.StaffListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionaries-staff-stafflist',
    
    windowMode : 'add',
    
    onRefreshStore: function () {
    	this.view.getStore().reload();
    },
    
    addNewStaff: function() {
        var win = this.lookupReference('staffEditWindow');
        if (!win) {
            win = new SushimiWebAdmin.view.dictionaries.staff.EditWindowStaffList();
            this.getView().add(win);
        }
        record = Ext.create('SushimiWebAdmin.model.StaffListModel');
		record.set(win.down("form").getValues());
		win.down("form").loadRecord(record);
		this.windowMode = 'add';
        win.show();
    },
    
    editCurrentStaff: function() {
        var win = this.lookupReference('staffEditWindow');
        if (!win) {
        	win = new SushimiWebAdmin.view.dictionaries.staff.EditWindowStaffList();
            this.getView().add(win);
        }
        var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	win.down('form').loadRecord(selectedRecord);
    	this.windowMode = 'edit';
    	win.show();
    },    
    
    onFormCancel: function() {
        this.lookupReference('staffEditWindowForm').getForm().reset();
        this.lookupReference('staffEditWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('staffEditWindowForm'),
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
					view.lookupReference('staffEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    }  
    
    
});
