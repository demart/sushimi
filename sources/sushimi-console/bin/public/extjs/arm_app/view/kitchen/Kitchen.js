Ext.define('SushimiConsoleARM.view.kitchen.Kitchen' ,{
    extend: 'Ext.panel.Panel',
    controller: 'kitchen.KitchenController',
    alias: 'widget.kitchen.Kitchen',
    
    requires: [
        'Ext.window.Toast',
        'Ext.layout.container.Center',
   		'SushimiConsoleARM.view.kitchen.KitchenController',
	],
	
	width: 500,
    height: 400,
    layout: 'center',
    items: {
    	title: 'Здесь будет Кухня',
        border: true,
        layout: 'center',
        autoScroll: true,
        width: '350px',
        height: '420px',
    },
    
    initComponent: function() {
    	//create the delayed task instance with our callback
    	var view = this;
        this.callParent(arguments);
    },
    
    listeners : { 
    	beforerender: function(viewport, eOpts) {
    		console.log("beforerender kitchen form");
    		
    		var ctrl = this.getController();
    		
    		Ext.Ajax.request({
        	    url: '/arm/user',
        	    method: 'GET',          
        	    params: {},
        	    success: function(response, conn, options, eOpts) {
        	    	var json = Ext.util.JSON.decode(response.responseText);
        	    	if (json.success && json.data != null && json.data.role == 'COOK') {
        	    		Ext.getCmp('authTextLabel').setHidden(false);
        	    		Ext.getCmp('authUserNameLabel').setText(json.data.name);
        	    		Ext.getCmp('authUserNameLabel').setHidden(false);
        	    		Ext.getCmp('logoutBtn').setHidden(false);
        	    	} else {
        	    		ctrl.redirectTo('logout');
        	    	}
        	    },
        	    failure: function(conn, response, options, eOpts){
        	    	var respObj = Ext.JSON.decode(response.responseText);
        	    	Ext.Msg.alert("Error", respObj.status.statusMessage);
        	    	console.log('failure' + response);
        	    	ctrl.redirectTo('logout');
    	    	}
        	});
    	}
    },
        
 
});