/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SushimiConsoleARM.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],

    alias: 'controller.main',
    routes : {}, 
    
    onAuthClick : function() {
    	this.redirectTo('auth');
    },
    
    onLogoutClick: function() {
    	console.log('Logout clicked');
    	this.redirectTo('logout');
    },
    
    
    onKitchenClick : function() {
    	console.log('Kitchen clicked');
    	this.redirectTo('kitchen');
    },
    
    onBarClick : function() {
    	console.log('Bar clicked');
    	this.redirectTo('bar');
    },
    
    onDeliveryClick : function() {
    	console.log('Delivery clicked');
    	this.redirectTo('delivery');
    },
    
    
});
