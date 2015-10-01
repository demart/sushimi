Ext.define('SushimiConsole.view.dictionaries.promotion.PromotionListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionaries.promotion',
    
    windowMode : 'add',
    
    showAddWindow: function() {
        var win = this.lookupReference('promotionEditWindow');
        if (!win) {
            win = new SushimiConsole.view.dictionaries.promotion.PromotionEditWindow();
            this.getView().add(win);
        }
       
        
        record = Ext.create('SushimiConsole.model.PromotionModel');
		record.set(win.down("form").getValues());
		win.down("form").loadRecord(record);
		this.windowMode = 'add';
        win.show();
    },
    
    
    showEditWindow: function() {
        var win = this.lookupReference('promotionEditWindow');
        if (!win) {
        	win = new SushimiConsole.view.dictionaries.promotion.PromotionEditWindow();
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
    					    url: 'rest/dictionary/promotion/store/destroy',
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
        this.lookupReference('promotionEditWindowForm').getForm().reset();
        this.lookupReference('promotionEditWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('promotionEditWindowForm'),
            form = formPanel.getForm();
        var view = this;
        if (form.isValid()) {
        	var record = form.getRecord();
         	var values = form.getValues();
        	record.set(values);
    		
        	var timeFrom = this.lookupReference('fromTime').getValue();
    /*		timeFrom.setHours(0, 0);
    		*/

        	if (this.windowMode == 'add') {
        		record.id = '0';
        		record.data.id = '0';
        		//record.data.id = timeFrom;
        		this.view.getStore().add(record);
        	}
        	this.view.getStore().sync({
				success: function() {
					form.reset();
					view.lookupReference('promotionEditWindow').hide();
					view.view.getStore().reload();
				},
				failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
        }
    }    
    
});