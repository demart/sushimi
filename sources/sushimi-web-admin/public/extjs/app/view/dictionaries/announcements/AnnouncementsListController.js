Ext.define('SushimiWebAdmin.view.dictionaries.announcements.AnnouncementsListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionaries-announcements-announcementslist',
    
    	 windowMode : 'add',
     	
    	    onRefreshStore: function () {
    	       	this.view.getStore().reload();
    	    },
    	    
    	    
    	    editCurrentAnnouncement: function () {
    	        var win = this.lookupReference('announcementsEditWindow');
    	        if (!win) {
    	        	win = new SushimiWebAdmin.view.dictionaries.announcements.EditWindowAnnouncementsList();
    	            this.getView().add(win);
    	        }
    	        var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	    	win.down('form').loadRecord(selectedRecord);
    	    	this.windowMode = 'edit';
    	    	
    	    	Ext.getCmp('publishedDate').setValue(Ext.util.Format.date(selectedRecord.data.publishedDate, 'm/d/Y'));
    	    	Ext.getCmp('endDate').setValue(Ext.util.Format.date(selectedRecord.data.endDate, 'm/d/Y'));  
    	    	
    	    	win.show();
    	    },
    	    
    	    onFormCancel: function() {
    	        this.lookupReference('announcementsEditWindowForm').getForm().reset();
    	        this.lookupReference('announcementsEditWindow').hide();
    	    },
    	    
    	    onFormSubmit: function() {
    	        var formPanel = this.lookupReference('announcementsEditWindowForm'),
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
    						view.lookupReference('announcementsEditWindow').hide();
    						view.view.getStore().reload();
    					},
    					failure: function(batch) {
    						Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
    					}
    				});
    	        }
    	    }  
});
