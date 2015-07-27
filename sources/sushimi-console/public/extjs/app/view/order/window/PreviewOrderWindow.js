Ext.define('SushimiConsole.view.order.window.PreviewOrderWindow', {
    extend: 'Ext.window.Window',
    xtype: 'preview-order-window',
    
    reference: 'previewOrderWindow',
    controller: 'order.window.previewOrderWindow',
    
    requires: [
    ],
    
    title: 'Просмотр заказа',
    width: 900,
    minWidth: 600,
    minHeight: 500,
    layout: 'fit',
    resizable: true,
    maximized: false,
    maximizable: true,
    modal: true,
    defaultFocus: 'orderType',
    closeAction: 'hide',
    scroll: true,
    
    items: [{
    	xtype: 'form',
    	layout: 'form',
    	reference: 'orderForm',
    	bodyPadding: 0,
    	autoScroll: true,
    	defaults: {
            border:false
        },
        
        fieldDefaults: {
            labelWidth: 100,
            anchor: '100%'
        },

        layout: {
            type: 'vbox',
            align: 'stretch'  // Child items are stretched to full width
        },
        
        items: [{
        	reference: 'clientInfoContainer',
        	xtype: 'panel',
        	bodyPadding: 10,
        	items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Заказ',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    hideLabel: false,
                    labelWidth: 60,
                },
                items: [ {
                	reference: 'previewOrderId',
                	xtype: 'textfield',
                    labelWidth: 65,
                    width: 60,
                    margin: '0 15 0 0',
                }, {
                	reference: 'previewOrderTime',
                    xtype: 'textfield',
                    fieldLabel: 'Время заказа',
                    labelWidth: 90,
                    width: 280,
                    margin: '0 15 0 0',
                }, {
                	reference: 'previewOrderStatus',
                    xtype: 'textfield',
                    fieldLabel: 'Статус заказа',
                    labelWidth: 90,
                    width: 240,
                    margin: '0 15 0 0',
                },]
        	},{
                xtype: 'fieldcontainer',
                fieldLabel: 'Тип заказа',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    hideLabel: false,
                    labelWidth: 60,
                },
                items: [{
                	reference: 'previewOrderType',
                    xtype: 'textfield',
                    value: 'На доставку',
                    margin: '0 15 0 0',
                }, {
				    xtype: 'textfield',
				    fieldLabel: 'Время доставки',
				    labelWidth: 105,
				    reference: 'orderDeliveryTime',
                    width: 280,
				} ],
        	},
        	{
                xtype: 'fieldcontainer',
                fieldLabel: 'Клиент',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    hideLabel: false,
                    labelWidth: 60,
                },
                items: [{
            		xtype: 'textfield',
            		reference: 'clientNameField',
            		name: 'clientName',
                    margin: '0 5 0 0',
                    width: 350,
            	}, {
            		xtype: 'textfield',
            		reference: 'clientPhoneField',
            		name: 'clientPhone',
                    fieldLabel: 'Телефон',
                    margin: '0 15 0 0',
            	},
            	]
            }, {
        		xtype: 'textfield',
        		reference: 'clientAddressField',
                name: 'clientAddress',
                fieldLabel: 'Адрес доставки',
                width: 840,
        	}],
        	
        }, {
    		reference: 'orderProductGrid',
    		xtype: 'grid',
    		viewConfig: { stripeRows: true },
            store: 'order.OrderProductStore',
            height: 200,
        	stateful: false,
        	border: true,
        	columns: [
    			{text: "№", dataIndex: 'id', width: 50},
                {text: "Продукт", dataIndex: 'name' , flex: 2},
                {text: "Категория", dataIndex: 'categoryName', width: 150},
                {text: "Цена", dataIndex: 'cost', width: 100},
                {text: "Кол-во", dataIndex: 'amount', width: 100},
                {text: "Сумма", dataIndex: 'sum', width: 100},
        	],
    	},  
    	
    	{
        	xtype: 'panel',
        	bodyPadding: '0 0 0 15',
        	margin: '15 0 0 0',
        	items: [
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					fieldDefaults: {
		                labelWidth: 80,
		            },
					items: [
						{
							xtype: 'textfield',
							reference: 'orderSumField',
						    name: 'orderSum',
						    fieldLabel: 'Сумма',
						    labelWidth: 45,
						    width: 130,
						    margin: '0 5 0 0',
						    value: 0,
						},
						{
				    		xtype: 'textfield', // Сумма заказа только суши продукции
				    		reference:'orderSushiSumField',
				            name: 'orderSushiSum',
				            fieldLabel: 'из них Суши',
				            margin: '0 25 0 0',
				            value: 0,
				            labelWidth: 80,
				            width: 150,
				            hidden: false,
				    	}, 
			        	{
							fieldLabel: 'Акции для Суши',
							labelWidth: 105,
				            width: 300,
				            margin: '0 20 0 0',
				            reference: 'promotionsField',
							xtype: 'textfield',
							value: 'какая то функция',
				        },
				        {
				    		reference: 'orderTotalSumField',
							fieldLabel: 'Итог (со скидкой)',
							xtype: 'textfield',
							labelWidth: 140,
							width: 240,
							value: 0
				    	}, 
					],
				}
			],
        },
    	
    	
        {
        	xtype: 'panel',
        	bodyPadding: '0 0 0 15',
        	items: [
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					fieldDefaults: {
		                labelWidth: 120,
		            },
					items: [
						{
							xtype: 'textfield',
							reference: 'orderFreeItemCountField',
						    name: 'orderFreeItemCount',
						    fieldLabel: 'Бесплатных соусов',
						    margin: '0 40 0 0',
						    width: 175,
						    labelWidth: 130,
						    value: 0,
						},    
						{
							fieldLabel: 'Количество персон',
							reference: 'personCountField',
							xtype: 'numberfield',
							name: 'personCount',
							margin: '0 40 0 0',
							value: 1,
							width: 175,
							minValue: 1,
							maxValue: 125,
				        }, 
				        {
							fieldLabel: 'Подготовить сдачу с',
							xtype: 'textfield',
							reference: 'personCashAmountField',
							labelWidth: 135,
							margin: '0 10 0 0',
							width: 200,
							value: 0,
							minValue: 0,
					        maxValue: 100000,
				        }, 
				        {
							fieldLabel: 'сдача',
							xtype: 'textfield',
							reference: 'moneyBackValueField',
							labelWidth: 45,
							width: 110,
							value: 0,
							minValue: 0,
					        maxValue: 100000,
				        }, 
			        ]
				}
			],
        },
        {
        	title: 'Коментарии к заказу',
        	xtype: 'panel',
        	layout: 'fit',
        	bodyPadding: 10,
        	margin: '0 0 30 0',
        	items: [{
        		xtype: 'textareafield',
        		reference: 'commentField',
        	}]
        },
        ],
        
    }],
    
    buttons: [{
    	id: 'printPreviewOrderBtn',
        text: 'Печать заказа',
        handler: 'onPrintOrderClick'
    }, {
    	id: 'closePrewiewOrderBtn',
    	text: 'Закрыть',
        handler: 'onResetFormClick'
    }]
});