Ext.define('SushimiWebAdmin.view.dictionaries.products.ProductsListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionaries-products-productslist',
    
        windowMode : 'add',
    	
        searchProduct: function () {
        	var textField = Ext.getCmp('textField');
        	var store = Ext.getCmp('productsStoreId');
        	store.store.proxy.api.read = 'rest/products/search/store/read?text=' + textField.getValue();
        	store.getStore().reload();
        },
        
        onRefreshStore: function () {
           	Ext.getCmp('productsStoreId').getStore().reload();
        },
        
        onRefreshSearhProductsStore: function () {
        	var textField = Ext.getCmp('textField');
        	var store = Ext.getCmp('productsStoreId');
        	store.store.proxy.api.read = 'rest/products/store/read';
        	store.getStore().reload();
        	textField.reset();
        },
        
        
        showEditWindow: function () {
            var win = this.lookupReference('productEditWindow');
            if (!win) {
            	win = new SushimiWebAdmin.view.dictionaries.products.EditWindowProductList();
                this.getView().add(win);
            }
            var selectedRecord = Ext.getCmp('productsStoreId').getSelectionModel().getSelection()[0];
        	win.down('form').loadRecord(selectedRecord);
        	this.windowMode = 'edit';
        	win.show();
        },
        
        onFormCancel: function() {
            this.lookupReference('productEditWindowForm').getForm().reset();
            this.lookupReference('productEditWindow').hide();
        },
        
        onFormSubmit: function() {
            var formPanel = this.lookupReference('productEditWindowForm'),
                form = formPanel.getForm();
            var view = this;
            if (form.isValid()) {
            	var record = form.getRecord();
            	var values = form.getValues();
            	record.set(values);
            	if (this.windowMode == 'add') {
            		record.id = '0';
            		record.data.id = '0';
            		Ext.getCmp('productsStoreId').getStore().add(record);
            	}
            	
            	Ext.getCmp('productsStoreId').getStore().sync({
    				success: function() {
    					form.reset();
    					view.lookupReference('productEditWindow').hide();
    					Ext.getCmp('productsStoreId').getStore().reload();
    				},
    				failure: function(batch) {
    					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
    				}
    			});
            }
        }  
});
