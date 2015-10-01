/**
 * The main application controller. This is a good place to handle things like routes.
 */
Ext.define('SushimiConsoleARM.controller.Root', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'app-main',
        },
    },
    
    routes : {
    	'auth' : 'onAuthRoute',
    	'kitchen' : 'onKitchenRoute',
    	'bar' : 'onBarRoute',
    	'delivery' : 'onDeliveryRoute',
    	'logout' : 'onLogoutRoute',
    },

    onAuthRoute : function() {
        console.log("onAuthRoute route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsoleARM.view.auth.AuthForm'));
    },
    
    onKitchenRoute : function() {
        console.log("onKitchenRoute route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsoleARM.view.kitchen.Kitchen'));
    },
    
    onBarRoute : function() {
        console.log("onBarRoute route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsoleARM.view.bar.Bar'));
    },
    
    onDeliveryRoute : function() {
        console.log("onDeliveryRoute route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsoleARM.view.delivery.Delivery'));
    },
    
    onLogoutRoute : function() {
        console.log("onLogoutRoute route");
        
        Ext.Ajax.request({
    	    url: '/arm/logout',
    	    method: 'POST',          
    	    params: { },
    	    success: function(response, conn, options, eOpts) {
    	    	var json = Ext.util.JSON.decode(response.responseText);
    	    	if (json.success) {}
    	    },
    	    failure: function(conn, response, options, eOpts){
    	    	var respObj = Ext.JSON.decode(response.responseText);
    	    	Ext.Msg.alert("Error", respObj.status.statusMessage);
    	    	console.log('failure' + response);
	    	}
    	});
    	
    	this.redirectTo('#auth');
    },

});
