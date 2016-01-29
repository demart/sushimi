Ext.define('SushimiWebAdmin.view.dictionaries.category.CategoryListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionaries-category-categorylist',
    
    windowMode : 'add',
    	
    onRefreshStore: function () {
       	this.view.getStore().reload();
    },
    
    
    editCurrentCategory: function () {
        var win = this.lookupReference('categoryEditWindow');
        if (!win) {
        	win = new SushimiWebAdmin.view.dictionaries.category.EditWindowCategoryList();
            this.getView().add(win);
        }
        var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	win.down('form').loadRecord(selectedRecord);
    	this.windowMode = 'edit';
    	win.show();
    },
    
    onFormCancel: function() {
        this.lookupReference('categoryEditWindowForm').getForm().reset();
        this.lookupReference('categoryEditWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('categoryEditWindowForm'),
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
					view.lookupReference('categoryEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    }  
});
