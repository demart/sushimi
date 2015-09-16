Ext.define('SushimiConsole.view.report.Report' ,{
    extend: 'Ext.tab.Panel',
    controller: 'report.report',
    alias: 'widget.report.Report',

    requires: [
   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   	    
   		'SushimiConsole.view.report.ReportController',
	],
	
	bodyBorder: true,
	
	defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    
    items: [ 
     {
    	title: 'Статистика за период',
        margin: '0 0 0 0',
        items: [{
        	layout: 'form',
        	bodyPadding: 0,
        	autoScroll: true,
        	defaults: {
                border:false
            },
            
            fieldDefaults: {
                labelWidth: 60,
                anchor: '100%'
            },

            layout: {
                type: 'vbox',
                align: 'stretch'  // Child items are stretched to full width
            },
            
            items: [{
                xtype: 'form',
                border: false,
                bodyPadding: 5,
                
                fieldDefaults: {
                    msgTarget: 'side',
                    labelAlign: 'left',
                    labelWidth: 20,
                    labelStyle: 'font-weight:bold'
                },
                
                items: [{
                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                
        	        items: [{
        	            flex: 1,
        	            id: 'dailyStatFromDateField',
        	            xtype: 'datefield',
        	            name: 'dailyStatFrom',
        	            itemId: 'dailyStatFrom',
        	            afterLabelTextTpl: [
        	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
        	            ],
        	            fieldLabel: 'C',
        	            allowBlank: false,
        	        },	
        	        {
        	            flex: 1,
        	            id: 'dailyStatToDateField',
        	            xtype: 'datefield',
        	            name: 'dailyStatTo',
        	            itemId: 'dailyStatTo',
        	            afterLabelTextTpl: [
        	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
        	            ],
        	            fieldLabel: 'По',
        	            allowBlank: false,
        	        }],
                }],
    	
        buttons: [{
            text: 'Отобразть',
            handler: 'onRenderStatFormClick'
        }],
    	
        }],
        
        }, {
        	title: 'Заказы за период',
    		id: 'orderPeriodStatGrid',
    		reference: 'orderPeriodStatGrid',
    		xtype: 'grid',
    		viewConfig: { stripeRows: true },
            store: 'reports.OrderPeriodStatStore',
        	stateful: false,
        	height: 220,
        	
        	columns: [
    			{text: "Наименование", dataIndex: 'name', width:150},
                {text: "Кол-во", dataIndex: 'amount' ,  width:100, align: 'right'},
                {text: "Выручка", dataIndex: 'revenue',  width:100, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
                {text: "Доставка", dataIndex: 'deliveryCost',  width: 100, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
                {text: "Себестоимость", dataIndex: 'netCost',  width: 150, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
                {text: "Остаток", dataIndex: 'income',  width: 100, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
                {text: "Остаток в процентах", dataIndex: 'percent',  width: 160, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
        	],
        	
    	}, {
    		xtype: 'tabpanel',
    		items: [
				{
					title: 'Продукты за период',
					id: 'productsPeriodStatGrid',
					reference: 'productsPeriodStatGrid',
					xtype: 'grid',
					viewConfig: { stripeRows: true },
				    store: 'reports.ProductPeriodStatStore',
					stateful: false,
					height: 1900,
					
					columns: [
						{text: "Наименование", dataIndex: 'name', width:250},
				        {text: "Кол-во", dataIndex: 'amount' ,  width:100, align: 'right'},
				        {text: "Себестоимость", dataIndex: 'netCost',  width:150, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
				        {text: "Из них бесплатных", dataIndex: 'freeCount',  width:150, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
				        {text: "Себестоимость бесплатных", dataIndex: 'freeNetCost',  width:200, align: 'right', renderer: Ext.util.Format.numberRenderer('0,0') },
					],
					
				},{
					title: 'Ингредиенты за период',
					id: 'ingredientsPeriodStatGrid',
					reference: 'ingredientsPeriodStatGrid',
					xtype: 'grid',
					viewConfig: { stripeRows: true },
				    store: 'reports.IngredientPeriodStatStore',
					stateful: false,
					height: 1600,
					
					columns: [
						{text: "Наименование", dataIndex: 'name', width:300},
						{text: "Ед.измерения", dataIndex: 'unit', width:250},
				        {text: "Кол-во", dataIndex: 'amount' ,  width:100, align: 'right'},
					],
					
				}    		        
	        ]
    	}]
     }, {
    	title: 'Графики',
        items: [{}]
     }],
		
    initComponent: function() {
        this.callParent(arguments);
    },
    
});