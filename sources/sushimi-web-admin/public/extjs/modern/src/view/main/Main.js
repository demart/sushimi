/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SushimiWebAdmin.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        
    ],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    
    id: 'mainViewportId',
    
    items: [
        {
	        region:'north',
	        floatable: false,
	        margin: '0 0 0 0',
	        tbar : [
	                 {
			            iconCls: null,
			            id: 'menuDicBtn',
			            text:'Справочники',
			            scale: 'small',
			            hidden: false,
			            menu:[
			    	        {
			    	        	id: 'dicStaffBtn',
			    	            text:'Справочник персонала',
			    	            listeners : {click : 'onDicStaffClick', },
			    	            
			    	        },
			    	        {
			    	        	id: 'dicCategoryBtn',
			    	            text:'Справочник категорий',
			    	            listeners : {click : 'onDicCategoryClick', },
			    	            
			    	        },
			    	       
			    	        ]
	                },
	                
	                
	                '->',
	                {
	                	text: 'Выход',
	                	listeners: {click: 'onLogoutBtn'},
	                }
	               ]
        },
        {
        	region:'center',
        	floatable: false,
	        margin: '0 0 0 0',
	        id: 'mainBody',
	        layout: 'fit',
        }
        ],
        
        initComponent: function() {
        	var view = this;
            this.callParent(arguments);
        },
});