/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('SushimiConsoleARM.Application', {
    extend: 'Ext.app.Application',
    
    name: 'SushimiConsoleARM',

    views: [
    ],

    controllers: [
        'Root',
        //'Main',
    ],

    stores: [
             //'KitchenStore',
    ],
    
    launch: function () {
    	/*Ext.create('Ext.container.Viewport', {});*/
    }
});
