Ext.define('SushimiConsoleARM.view.bar.Bar' ,{
    extend: 'Ext.panel.Panel',
    controller: 'bar.BarController',
    alias: 'widget.bar.Bar',
    
    requires: [
        'Ext.window.Toast',
        'Ext.layout.container.Center',
   		'SushimiConsoleARM.view.bar.BarController',
	],
	
	width: 500,
    height: 400,
    layout: 'center',
    items: {
    	title: 'Здесь будет Бар',
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
    		console.log("beforerender bar form");
    		
    		var ctrl = this.getController();
    		
    		Ext.Ajax.request({
        	    url: '/arm/user',
        	    method: 'GET',          
        	    params: {},
        	    success: function(response, conn, options, eOpts) {
        	    	var json = Ext.util.JSON.decode(response.responseText);
        	    	if (json.success && json.data != null && json.data.role == 'WAITER') {
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