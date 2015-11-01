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
       
        this.lookupReference('promotionEditWindowForm').getForm().reset();
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
    	
    	if (selectedRecord.data.isPublished == true) {
    		Ext.getCmp('checkbox1').setValue(true);
    		Ext.getCmp('checkbox2').setValue(false);
    	}
    	else {
    		Ext.getCmp('checkbox1').setValue(false);
    		Ext.getCmp('checkbox2').setValue(true);
    	}
    	
    	if (selectedRecord.data.type == "PERIOD") {
    		Ext.getCmp('checkbox3').setValue(true);
    		Ext.getCmp('checkbox4').setValue(false);
    	}
    	else {
    		Ext.getCmp('checkbox3').setValue(false);
    		Ext.getCmp('checkbox4').setValue(true);
    	}
    	
    	if (selectedRecord.data.valueType == "DISCOUNT") {
    		Ext.getCmp('checkbox5').setValue(true);
    		Ext.getCmp('checkbox6').setValue(false);
    		Ext.getCmp('checkbox7').setValue(false);
    		Ext.getCmp('checkbox8').setValue(false);
    	}
    	else if (selectedRecord.data.valueType == "DISCOUNT_ALL") {
    		Ext.getCmp('checkbox5').setValue(false);
    		Ext.getCmp('checkbox6').setValue(true);
    		Ext.getCmp('checkbox7').setValue(false);
    		Ext.getCmp('checkbox8').setValue(false);
    	}
    	else if (selectedRecord.data.valueType == "PRODUCT") {
    		Ext.getCmp('checkbox5').setValue(false);
    		Ext.getCmp('checkbox6').setValue(false);
    		Ext.getCmp('checkbox7').setValue(false);
    		Ext.getCmp('checkbox8').setValue(true);
    	}
    	else {
    		Ext.getCmp('checkbox5').setValue(false);
    		Ext.getCmp('checkbox6').setValue(false);
    		Ext.getCmp('checkbox7').setValue(true);
    		Ext.getCmp('checkbox8').setValue(false);
    	}
    	//console.log(Ext.util.Format.date(selectedRecord.data.fromTime, 'Y/m/d'));
    	Ext.getCmp('fromTime').setValue(Ext.util.Format.date(selectedRecord.data.fromTime, 'm/d/Y'));
    	Ext.getCmp('toTime').setValue(Ext.util.Format.date(selectedRecord.data.toTime, 'm/d/Y'));  	
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