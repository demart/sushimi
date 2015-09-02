Ext.define('SushimiConsoleARM.view.auth.AuthForm' ,{
    extend: 'Ext.panel.Panel',
    controller: 'auth.AuthFormController',
    alias: 'widget.auth.AuthForm',
    
    requires: [
        'Ext.window.Toast',
        'Ext.layout.container.Center',
   		'SushimiConsoleARM.view.auth.AuthFormController',
	],
	
	width: 500,
    height: 400,
    layout: 'center',
    items: {
    	title: 'Авторизация в системе управления заказами',
        border: true,
        layout: 'center',
        autoScroll: true,
        width: '350px',
        height: '420px',
        //bodyStyle: 'padding:20px 0;',
        items: [{
        	layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            //bodyPadding: 10,
            defaults: {
                frame: true,
                bodyPadding: 10
            },
            items: [
                    {
                        height: 60,
                        padding: '0 40 0 40',
                        items: [{
                        	xtype: 'textfield',
                            allowBlank: false,
                            //fieldLabel: '',
                            id: 'passwordField',
                            reference: 'passwordField', 
                            name: 'passwordField',
                            emptyText: '',
                            inputType: 'password',
                            width:'100%',
                            height:'100%',
                            style: 'text-align: center',
                            fieldStyle: 'text-align: center; font-size: 20pt',
                        },],
                    },
                    {
                        height: 310,
                        margin: '0 0 0 0',
                        padding: '0 0 0 15',
                        border: false,
                        items: [{
                        	layout:{
                                type: 'table',
                                columns: 3,
                            },
                            border: false,
                        	tableAttrs: {
                                style: { width: '100%' },
                            },
                            items: [{
                            	xtype: 'button',
                                text: '1',
                                scale: 'large',
                                width: '90%',
                                height   : 70, 
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'1');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '2',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'2');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '3',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'3');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '4',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'4');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '5',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'5');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '6',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'6');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '7',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'7');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '8',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'8');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '9',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'9');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: '',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                            },{
                            	xtype: 'button',
                                text: '0',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue()+'0');
                                	},
                                },
                            },{
                            	xtype: 'button',
                                text: 'Стереть',
                                scale: 'large',
                                width: '90%',
                                height   : 70,
                                listeners: {
                                	click: function() {
                                		var inputField = Ext.getCmp('passwordField');
                                    	inputField.setValue(inputField.getValue().substring(0, inputField.getValue().length - 1));
                                	},
                                },
                            }],
                        }],
                    },
                    {
                        height: 80,
                        items: [{
                        	layout: 'center',
                        	width: '100%',
        	                height: '100%',
        	                padding: '0 30 0 30',
                        	items: {
                        		xtype: 'button',
                                text: 'Войти',
                                scale: 'large',
                                width: '100%',
                                height: 50,
                                listeners: {
                                	click: 'onAuthenticateButtonClick',
                                },
                        	},
                        },],
                    }
                ],

        },      
        ],
    },
    
    initComponent: function() {
    	//create the delayed task instance with our callback
    	var view = this;
        this.callParent(arguments);
    },
    
    listeners : { 
    	beforerender: function(viewport, eOpts) {
    		console.log("beforerender auth form");
    		Ext.getCmp('authTextLabel').setHidden(true);
    		Ext.getCmp('authUserNameLabel').setText('');
    		Ext.getCmp('authUserNameLabel').setHidden(true);
    		Ext.getCmp('logoutBtn').setHidden(true);
    	}
    },
 
});