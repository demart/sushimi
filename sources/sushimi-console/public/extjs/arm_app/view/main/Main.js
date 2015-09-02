/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SushimiConsoleARM.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    controller: 'main',
    
    viewModel: {
        type: 'main'
    },

    requires: [
        'Ext.window.Toast',
        'Ext.layout.container.Center',
    ],
    
    id: 'mainViewportId',
    
    layout: {
        type: 'border'
    },
    
    items: [{
	        region:'north',
	        floatable: false,
	        margin: '0 0 0 0',
	        tbar : [{
	        	id: 'authTextLabel',
	        	xtype:'label',
	            text:'Вы авторизовались как:',
	            scale: 'medium',
	            hidden: true,
	        },{
	        	id: 'authUserNameLabel',
	        	xtype:'label',
	            text:'',
	            scale: 'medium',
	            hidden: true,
	        }, '-' , {
	        	id: 'logoutBtn',
	        	xtype:'button',
	            text:'Выход',
	            scale: 'medium',
	            hidden: true,
	            listeners : {click : 'onLogoutClick', },
	        }],
        }, {
        	region:'center',
        	floatable: false,
	        margin: '0 0 0 0',
	        id: 'mainBody',
	        layout: 'fit',
        }
    ],

    listeners : {
    	afterrender: function(viewport, eOpts) {
    		console.log("We are goint to redirect to AuthForm...");
    		this.getController().redirectTo('auth');
    	}, 
    	beforerender: function(viewport, eOpts) {
    		//console.log("beforerender");
    		//var role = document.getElementById('console_user_role').innerHTML;
        	//console.log(role);
        	//if (role == 'DIRECTOR') {
        		//Ext.getCmp('menuStatsBtn').setVisible(true);
        	//}
        	//redirectTo('auth');
    	}
    },
    
});
