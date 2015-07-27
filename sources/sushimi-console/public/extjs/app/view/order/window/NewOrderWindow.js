Ext.define('SushimiConsole.view.order.window.NewOrderWindow', {
    extend: 'Ext.window.Window',
    xtype: 'create-new-order-window',
    
    reference: 'newOrderWindow',
    controller: 'order.window.newOrderWindow',
    
    requires: [
           'SushimiConsole.view.order.window.NewOrderWindowController',
           
           'SushimiConsole.view.order.window.ProductWindow',
           
           'SushimiConsole.view.order.window.SearchClientWindow',
           'SushimiConsole.view.order.window.AddClientWindow',
           'SushimiConsole.view.order.window.AddClientAddressWindow',
           
           'SushimiConsole.model.PromotionModel',
           'SushimiConsole.model.DeliveryExtraPriceModel',
           
           'SushimiConsole.model.order.CreateOrderModel',
           'SushimiConsole.model.order.CreateOrderItemModel',
    ],
    
    title: 'Новый заказ',
    width: 800,
    minWidth: 600,
    minHeight: 400,
    layout: 'fit',
    resizable: true,
    maximized: true,
    modal: true,
    defaultFocus: 'orderType',
    closeAction: 'hide',
    autoScroll: true,
    
    
    
    initComponent: function() {
        console.log('init');
        //this.cellEditing.on('edit', this.onEditComplete, this);
        this.callParent();
        console.log(Ext.getCmp('orderProductGrid').plugins);
        Ext.getCmp('orderProductGrid').plugins[0].on('edit', this.onEditComplete, this)
    },
    
    onEditComplete: function(editor, context) {
    	console.log(editor);
    	console.log(context);
    	var record = context.record;
        
    	// Если ничегоне изменилось
    	if (record.data.amount == context.originalValue)
    		return;
    	
    	// Увеличили или уменьшили кол-во
    	var isIncreaseAmount = context.originalValue < record.data.amount;
    	var sumSushiDiff = 0;
    	// Изменяем сумму позиции заказа
    	var orderType = Ext.getCmp('orderTypeField').getValue();
    	if (orderType == 'bar') {
    		record.data.sum = record.data.barCost * record.data.amount;
    		if (isIncreaseAmount) {
    			sumSushiDiff = (parseInt(record.data.barCost) * parseInt(record.data.amount)) - (parseInt(context.originalValue) * parseInt(record.data.barCost));
    		} else {
    			sumSushiDiff = (parseInt(context.originalValue) * parseInt(record.data.barCost)) - (parseInt(record.data.barCost) * parseInt(record.data.amount));
    		}
    	} else {
    		record.data.sum = record.data.cost * record.data.amount;
    		if (isIncreaseAmount == true) {
    			console.log((parseInt(record.data.cost) * parseInt(record.data.amount)));
    			console.log((parseInt(context.originalValue) * parseInt(record.data.amount)));
    			sumSushiDiff = (parseInt(record.data.cost) * parseInt(record.data.amount)) - (parseInt(context.originalValue) * parseInt(record.data.cost));
    		} else {
    			sumSushiDiff = (parseInt(context.originalValue) * parseInt(record.data.cost)) - (parseInt(record.data.cost) * parseInt(record.data.amount));
    		}
    	}
    	
    	console.log(isIncreaseAmount);
    	console.log(sumSushiDiff);
    	// Если увеличилось то нужно добавить к суммам
    	// Если уменьшилось нужно отнять суммы
    	
    	
        var orderSumField = Ext.getCmp('orderSumField');
    	var orderSushiSumField = Ext.getCmp('orderSushiSumField');
    	
    	if (record.data.type == 'SUSHI') {
    		if (isIncreaseAmount) {
    			orderSushiSumField.setValue(parseInt(orderSushiSumField.getValue()) + sumSushiDiff);
    		} else {
    			orderSushiSumField.setValue(parseInt(orderSushiSumField.getValue()) - sumSushiDiff);
    		}
    		var orderFreeItemCountField = Ext.getCmp('orderFreeItemCountField');
    		var freeCount = Math.floor(orderSushiSumField.getValue() / 2000);
    		orderFreeItemCountField.setValue(freeCount);
    	}
    	
    	if (isIncreaseAmount) {
    		orderSumField.setValue(parseInt(orderSumField.getValue()) + sumSushiDiff);
    	} else {
    		orderSumField.setValue(parseInt(orderSumField.getValue()) - sumSushiDiff);
    	}
    	
    	// Если есть скидка то занижаем её
    	var total = Ext.getCmp('orderTotalSumField');
    	var discount = Ext.getCmp('discountPercentField').getValue();
    	var selfServiceDiscount = Ext.getCmp('seftServiceDiscountField').getValue();
    	var orderType = Ext.getCmp('orderTypeField').getValue();
    	if (discount > 0) {
    		var sum = orderSumField.getValue();
			var sushiSum = orderSushiSumField.getValue();
    		var sumWithoutSushi = sum - sushiSum;
    		if (orderType == 'selfservice') 
    			sumWithoutSushi = Math.round(sumWithoutSushi*(1-parseInt(selfServiceDiscount)/100));
    		
    		if (orderType == 'selfservice') {
    			total.setValue(sumWithoutSushi+Math.round(sushiSum*(1-((parseInt(discount)+parseInt(selfServiceDiscount))/100))));
    		} else {
    			total.setValue(sumWithoutSushi+Math.round(sushiSum*(1-discount/100)));
    		}
    	} else {
    		if (orderType == 'selfservice') {
    			total.setValue(Math.round(orderSumField.getValue()*(1-parseInt(selfServiceDiscount)/100)));
    		} else {
    			total.setValue(orderSumField.getValue());
    		}
    	}
    	
    	Ext.getCmp('personCashAmountField').setValue(0);
    	Ext.getCmp('moneyBackValueField').setValue(0);
    	
    	context.grid.getView().refresh();
    	context.grid.getView().focusRow(context.record);
    },
    
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
            xtype: 'radiogroup',
            fieldLabel: 'Тип заказа',
            columns: 3,
            items: [
                { reference: 'barOrderTypeRB', boxLabel: 'Заказ на бар', name: 'rb-auto', inputValue: 1,
                	listeners: {
                		change: 'changeBarOrderType',
                	},
                },
                { reference: 'deliveryOrderTypeRB', boxLabel: 'Заказ на доставку', name: 'rb-auto', inputValue: 2,
                	listeners: {
                		change: 'changeDeliveryOrderType',
                	},
                },
                { reference: 'seflServiceOrderTypeRB',  boxLabel: 'Самовывоз', name: 'rb-auto', inputValue: 3,
                	listeners: {
                		change: 'changeSelfServiceOrderType',
                	},
                },
            ]
        }, {
    		xtype: 'textfield',
    		id: 'siteOrderIdField',
    		reference: 'siteOrderIdField',
            hidden: true,
    	},  {
    		xtype: 'textfield',
    		id: 'siteOrderDataField',
    		reference: 'siteOrderDataField',
            hidden: true,
    	}, {
    		xtype: 'textfield',
    		id: 'orderTypeField',
    		reference: 'orderTypeField',
            hidden: true,
    	}, {
        	reference: 'siteClientInfoContainer',
        	xtype: 'panel',
        	bodyPadding: 10,
        	title: 'Информация с сайта',
        	items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Клиент (сайта)',
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
            		reference: 'siteClientNameField',
            		name: 'siteClientName',
                    margin: '0 5 0 0',
                    width: 350,
            	}, {
            		xtype: 'textfield',
            		reference: 'siteClientPhoneField',
            		name: 'siteClientPhone',
                    fieldLabel: 'Телефон',
                    margin: '0 15 0 0',
            	},]
            }, {
        		xtype: 'textfield',
        		reference: 'siteClientAddressField',
                name: 'siteClientAddress',
                fieldLabel: 'Адрес доставки',
                width: 840,
        	}],
        	
        }, {
        	reference: 'clientInfoContainer',
        	xtype: 'panel',
        	bodyPadding: 10,
        	title: 'Информация о клиенте',
        	items: [{
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
            		id: 'clientId',
            		reference: 'clientId',
            		name: 'clientId',
            		hidden: true,
            	},{
            		xtype: 'textfield',
            		id: 'clientNameField',
            		reference: 'clientNameField',
            		name: 'clientName',
                    margin: '0 5 0 0',
                    width: 350,
            	}, {
            		xtype: 'textfield',
            		id: 'clientPhoneField',
            		reference: 'clientPhoneField',
            		name: 'clientPhone',
                    fieldLabel: 'Телефон',
                    margin: '0 15 0 0',
            	}, {
            		xtype: 'button',
            		text: 'Выбрать клинета',
            		handler: 'showClientWindow',
            	}, ]
            }, {
        		xtype: 'textfield',
        		id: 'clientAddressId',
        		reference: 'clientAddressId',
        		name: 'clientAddressId',
        		hidden: true,
        	}, {
        		xtype: 'textfield',
        		id: 'clientAddressField',
        		reference: 'clientAddressField',
                name: 'clientAddress',
                fieldLabel: 'Адрес доставки',
                width: 840,
        	}, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Скидка',
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
            		id: 'clientTotalOrderSumField',
            		reference: 'clientTotalOrderSumField',
                    name: 'clientTotalOrderSum',
                    fieldLabel: 'Сумма',
                    margin: '0 5 0 0',
                    width: 120,
                    labelWidth: 40,
            	}, {
            		xtype: 'textfield',
            		id: 'clientDiscountPercentField',
            		reference: 'clientDiscountPercentField',
                    name: 'clientDiscountPercent',
                    fieldLabel: 'Текущий процент',
                    margin: '0 50 0 0',
                    width: 160,
                    labelWidth: 110,
                    value: 0,
            	}, {
            		xtype: 'textfield',
            		id: 'clientNextDiscountSumField',
            		reference: 'clientNextDiscountSumField',
                    name: 'clientNextDiscountSum',
                    fieldLabel: 'Следующая сумма',
                    margin: '0 5 0 0',
                    width: 190,
                    labelWidth: 115,
            	}, {
            		xtype: 'textfield',
            		id: 'clientNextDiscountPercentField',
            		reference: 'clientNextDiscountPercentField',
                    name: 'clientNextDiscountPercent',
                    fieldLabel: 'Следующий процент',
                    margin: '0 5 0 0',
                    width: 180,
                    labelWidth: 130,
            	}]
        	}],
        }, {
    		id: 'orderProductGrid',
    		reference: 'orderProductGrid',
    		xtype: 'grid',
    		title: 'Состав заказа',
    		iconCls: 'icon-grid',
    		viewConfig: { stripeRows: true },
            store: 'order.OrderProductStore',
            //height: 300,
        	stateful: false,
        	border: true,
        	plugins: ['cellediting'],
        	tbar: [{ text: 'Добавить продукты', handler: 'showAddProductWindow' },],
        	columns: [
    			{text: "№", dataIndex: 'id', width: 50},
                {text: "Продукт", dataIndex: 'name' , flex: 2},
                {text: "Категория", dataIndex: 'categoryName', width: 150},
                {reference: 'deliveryCostColumn', hidden: true, text: "Цена", dataIndex: 'cost', width: 100},
                {reference: 'barCostColumn', hidden: true,  text: "Цена", dataIndex: 'barCost', width: 100},
                {text: "Кол-во", dataIndex: 'amount', width: 100, 
                	editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1,
                        maxValue: 500
                    }
                },
                {text: "Сумма", dataIndex: 'sum', width: 100},
                {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 60,
                    items: [{
                    	iconCls:'remove',
                    	title: 'Удалить',
                        tooltip: 'Удалить продукцию',
                        handler: function(grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            
                            var orderSumField = Ext.getCmp('orderSumField');
                        	var orderSushiSumField = Ext.getCmp('orderSushiSumField');
                        	
                        	if (record.data.type == 'SUSHI') {
                        		orderSushiSumField.setValue(parseInt(orderSushiSumField.getValue()) - record.data.sum);
                        		var orderFreeItemCountField = Ext.getCmp('orderFreeItemCountField');
                        		var freeCount = Math.floor(orderSushiSumField.getValue() / 2000);
                        		orderFreeItemCountField.setValue(freeCount);
                        	}
                        	orderSumField.setValue(parseInt(orderSumField.getValue()) - record.data.sum);
                        	
                        	// Если есть скидка то занижаем её
                        	var total = Ext.getCmp('orderTotalSumField');
                        	var discount = Ext.getCmp('discountPercentField').getValue();
                        	var selfServiceDiscount = Ext.getCmp('seftServiceDiscountField').getValue();
                        	var orderType = Ext.getCmp('orderTypeField').getValue();
                        	if (discount > 0) {
                        		var sum = orderSumField.getValue();
                    			var sushiSum = orderSushiSumField.getValue();
                        		var sumWithoutSushi = sum - sushiSum;
                        		if (orderType == 'selfservice') 
			            			sumWithoutSushi = Math.round(sumWithoutSushi*(1-parseInt(selfServiceDiscount)/100));
			            		
			            		if (orderType == 'selfservice') {
			            			total.setValue(sumWithoutSushi+Math.round(sushiSum*(1-((parseInt(discount)+parseInt(selfServiceDiscount))/100))));
			            		} else {
			            			total.setValue(sumWithoutSushi+Math.round(sushiSum*(1-discount/100)));
			            		}
                        	} else {
                        		if (orderType == 'selfservice') {
                        			total.setValue(Math.round(orderSumField.getValue()*(1-parseInt(selfServiceDiscount)/100)));
                        		} else {
                        			total.setValue(orderSumField.getValue());
                        		}
                        	}
                        	
                        	Ext.getCmp('personCashAmountField').setValue(0);
                        	Ext.getCmp('moneyBackValueField').setValue(0);
                        	
                        	grid.getStore().remove(record);
                        }
                    }]
                }
        	],
    	},  
    	
    	
        {
        	title: 'Дополнительная информация',
        	xtype: 'panel',
        	bodyPadding: 15,
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
							id: 'orderFreeItemCountField',
							reference: 'orderFreeItemCountField',
						    name: 'orderFreeItemCount',
						    fieldLabel: 'Бесплатных соусов',
						    margin: '0 150 0 0',
						    width: 175,
						    labelWidth: 130,
						    value: 0,
						},    
						{
							fieldLabel: 'Количество персон',
							reference: 'personCountField',
							xtype: 'numberfield',
							name: 'personCount',
							margin: '0 100 0 0',
							value: 1,
							width: 175,
							minValue: 1,
							maxValue: 125,
				        }, 
			        ]
				},
			],
        },
        
        {
        	title: 'Сумма заказа',
        	xtype: 'panel',
        	bodyPadding: 15,
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
							id: 'seftServiceDiscountField',
							reference: 'seftServiceDiscountField',
						    name: 'orderSum',
						    value: 10,
						    hidden: true,
						},
						{
							xtype: 'textfield',
							id: 'orderSumField',
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
				    		id:'orderSushiSumField',
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
				    		id: 'discountPercentField', xtype: 'numberfield', value: 0, minValue: 0, maxValue: 100, hidden: true,
			        	}, 
			        	{
				    		id: 'discountValueTypeField', xtype: 'textfield', value: null, minValue: 0, maxValue: 100, hidden: true,
			        	}, 
			        	{
							fieldLabel: 'Акции',
							labelWidth: 105,
				            width: 455,
				            margin: '0 40 0 0',
				            id: 'promotionsField',
				            reference: 'promotionsField',
							xtype: 'combo',
							displayField: 'name',
				            valueField: 'id',
							store: {
				                model: 'SushimiConsole.model.PromotionModel',
				                proxy: {
				                    type: 'ajax',
				                    url: '/rest/promotion/store/read',
				                    reader: {
				                    	type: 'json',
				                        rootProperty: 'data',
				                        successProperty: 'success',
				                        totalProperty: 'totalCount',
				                        idProperty: 'id'
				                    }
				                },
				                autoDestroy: true,
				            },
				            triggers: {
						        foo: {
						            cls: 'x-form-clear-trigger',
						            handler: function() {
						            	var promotionsFieldCbxField = Ext.getCmp('promotionsField');
						            	promotionsFieldCbxField.clearValue();
						            }
						        },
						    },
				            listeners: {
				            	change: function(combo, newValue, oldValue, eOpts ) {
						    		// return promotion calculation back
						    		if (oldValue != null) {
						    			var discountField = Ext.getCmp('discountPercentField');
					            		discountField.setValue(0);
					            		
					            		var discountValueTypeField = Ext.getCmp('discountValueTypeField');
					            		discountValueTypeField.setValue(null);
						    		}
						    		
						    		// set new promotion
						    		if (newValue != null) {
						    			var record = combo.findRecordByValue(newValue);
						    			
						    			var discount = record.data.discount;
						    			var discountField = Ext.getCmp('discountPercentField');
					            		discountField.setValue(discount);
					            		
					            		var valueType = record.data.valueType;
					            		var discountValueTypeField = Ext.getCmp('discountValueTypeField');
					            		discountValueTypeField.setValue(valueType);
						    		}
						    		
						    		// TODO CALL UNION function to recalculate totalsum with promotion and delivery extra cost
						    		this.ownerCt.ownerCt.ownerCt.ownerCt.controller.recalculateTotalSum(null);
				            	},
				            	
				            	select: function(combo, records, eOpts) {}
				            },
				        },
				        {
				    		id: 'orderTotalSumField',
				    		reference: 'orderTotalSumField',
							fieldLabel: 'Итоговая сумма (со скидкой)',
							xtype: 'textfield',
							labelWidth: 180,
							width: 240,
							value: 0
				    	}, 
					],
				},
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					margin: '20 0 0 0',
					fieldDefaults: {
		                labelWidth: 120,
		            },
					items: [
				        {
							fieldLabel: 'Подготовить сдачу с',
							xtype: 'textfield',
							id: 'personCashAmountField',
							reference: 'personCashAmountField',
							labelWidth: 135,
							margin: '0 10 0 0',
							width: 200,
							value: 0,
							minValue: 0,
					        maxValue: 100000,
					        listeners: {
					        	change: function(textObj, newValue, oldValue, eOpts ) {
					        		var total = Ext.getCmp('orderTotalSumField').getValue();
					        		Ext.getCmp('moneyBackValueField').setValue(newValue - total);
					        	}
					        },
				        }, 
				        {
							fieldLabel: 'сдача',
							xtype: 'textfield',
							id: 'moneyBackValueField',
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
        	title: 'Доставка в отдаленные районы',
        	xtype: 'panel',
        	bodyPadding: 20,
        	items: [
				{
					xtype: 'textfield',
					id: 'deliveryExtraPriceField',
					reference: 'deliveryExtraPriceField',
				    name: 'deliveryExtraPrice',
				    value: 0,
				    hidden: true,
				},
				{
					xtype: 'textfield',
					id: 'deliveryExtraPriceValueField',
					reference: 'deliveryExtraPriceValueField',
				    name: 'deliveryExtraPriceValue',
				    value: 0,
				    hidden: true,
				},
				{
					fieldLabel: 'Платная доставка',
					labelWidth: 125,
				    width: 455,
				    margin: '0 40 0 0',
				    id: 'deliveryExtraPriceCbxField',
				    reference: 'deliveryExtraPriceCbxField',
					xtype: 'combo',
					displayField: 'name',
				    valueField: 'id',
					store: {
				        model: 'SushimiConsole.model.DeliveryExtraPriceModel',
				        proxy: {
				            type: 'ajax',
				            url: '/rest/delivery/extra/store/read',
				            reader: {
				            	type: 'json',
				                rootProperty: 'data',
				                successProperty: 'success',
				                totalProperty: 'totalCount',
				                idProperty: 'id'
				            }
				        },
				        autoDestroy: true,
				    },
				    triggers: {
				        foo: {
				            cls: 'x-form-clear-trigger',
				            handler: function() {
				            	var deliveryExtraPriceCbxField = Ext.getCmp('deliveryExtraPriceCbxField');
					    		deliveryExtraPriceCbxField.clearValue();
				            }
				        },
				    },
				    listeners: {
				    	change: function(combo, newValue, oldValue, eOpts ) {
				    		var deliveryExtraPriceField = Ext.getCmp('deliveryExtraPriceField');
				    		var deliveryExtraPriceValueField = Ext.getCmp('deliveryExtraPriceValueField');

				    		// recalculate old price
				    		if (oldValue != null) {
				    			deliveryExtraPriceField.setValue(null);
				    			deliveryExtraPriceValueField.setValue(0);
				    		}

				    		// calculate new price
				    		if (newValue != null) {
				    			deliveryExtraPriceField.setValue(newValue);
				    			var record = combo.findRecordByValue(newValue);
				    			deliveryExtraPriceValueField.setValue(record.data.price);
				    		}
				    		
				    		this.ownerCt.ownerCt.ownerCt.controller.recalculateTotalSum(null);
				    	}, 
				    	select: function(combo, records, eOpts) {}
				    },
				},
	        ]
        }, 
        {
        	title: 'Доставка (Самовывоз) ко времени',
        	xtype: 'panel',
        	bodyPadding: 20,
        	items: [
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					fieldDefaults: {
		                labelWidth: 50,
		            },
					items: [
						{
						    xtype: 'checkbox',
						    boxLabel: 'Указать время',
						    reference: 'deliveryToTime',
						    id: 'deliveryToTime',
						    labelWidth: 80,
						    width: 200,
						},
				        {
						    xtype: 'datefield',
						    name: 'orderDeliveryDate',
						    reference: 'orderDeliveryDate',
						    id: 'orderDeliveryDate',
						    minValue: new Date(),
						    width: 170,
						    margin: '0 15 0 0',
						    fieldLabel: 'Дата',
						    bind: {
					            disabled: '{!deliveryToTime.checked}'
					        }
						}, {
						    xtype: 'timefield',
						    name: 'orderDeliveryTime',
						    reference: 'orderDeliveryTime',
						    id: 'orderDeliveryTime',
						    fieldLabel: 'Время ',
						    minValue: '13:30',
						    maxValue: '23:30',
						    increment: 15,
						    format: 'H:i',
						    width: 130,
						    bind: {
					            disabled: '{!deliveryToTime.checked}'
					        }
						}
					]
				},
	        ]
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
    	id: 'printOrderBtn',
        text: 'Печать заказа',
        handler: 'onPrintOrderClick'
    },{
    	id: 'saveOrderBtn',
    	text: 'Оформить заказ',
        handler: 'onSaveFormClick'
    }, {
    	id: 'closeOrderBtn',
    	text: 'Закрыть',
        handler: 'onResetFormClick'
    }],


});