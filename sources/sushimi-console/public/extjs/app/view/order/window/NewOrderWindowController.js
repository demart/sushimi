Ext.define('SushimiConsole.view.order.window.NewOrderWindowController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],

    alias: 'controller.order.window.newOrderWindow',
    
    routes : {
    },
    
    siteOrder: null,
    
    showSiteOrderWindow: function(siteOrderId) {
    	this.resetOrderForm();
    	var ctrl = this;
    	Ext.Ajax.request({
		    url: 'rest/order/site/preview/'+ siteOrderId,		    
		    success: function(response){
		    	responseStr = response.responseText;
		    	response = Ext.decode(response.responseText);
		    	console.log(response);
		    	ctrl.resetOrderForm();
		    	ctrl.loadSiteOrderData(response, responseStr);
		    	ctrl.view.show();
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка загрузки данных заказа');
			}
		});
    },
    
    loadSiteOrderData: function(record, recordStr) {
    	this.siteOrder = record;
    	this.lookupReference('siteOrderDataField').setValue(recordStr);
    	
    	if (record.orderType == 'DELIVERY') {
    		this.lookupReference('deliveryOrderTypeRB').setValue(true);
    	}
    	if (record.orderType == 'DELIVERY_IN_TIME') {
    		this.lookupReference('deliveryOrderTypeRB').setValue(true);
    		this.lookupReference('deliveryToTime').setValue(true);
    		this.lookupReference('orderDeliveryDate').setValue(new Date(record.deliveryTime));
    		this.lookupReference('orderDeliveryTime').setValue(new Date(record.deliveryTime));
    	}
    	if (record.orderType == 'SELF_SERVICE') {
    		this.lookupReference('seflServiceOrderTypeRB').setValue(true);
    		this.lookupReference('deliveryToTime').setValue(true);
			this.lookupReference('orderDeliveryDate').setValue(new Date(record.deliveryTime));
    		this.lookupReference('orderDeliveryTime').setValue(new Date(record.deliveryTime));
    	}
    	
    	this.lookupReference('siteOrderIdField').setValue(record.id);
    	this.lookupReference('siteClientInfoContainer').setVisible(true);
    	this.lookupReference('siteClientNameField').setValue(record.personName);
    	this.lookupReference('siteClientPhoneField').setValue(record.personPhone);
    	this.lookupReference('siteClientAddressField').setValue(record.address);
    	this.lookupReference('personCashAmountField').setValue(record.personCash);
    	this.lookupReference('personCountField').setValue(record.personCount);
    	this.lookupReference('commentField').setValue(record.personRemark);
    	
    	var grid = this.lookupReference('orderProductGrid');
    	grid.store.removeAll();
    	var sum = 0, sushiSum = 0;
    	
    	for (var i = 0; i < record.items.length; i++) {
    		var model = new SushimiConsole.model.order.OrderProductModel();
    		
    		model.data.id = record.items[i].productId;
    		model.data.name = record.items[i].name;
    		model.data.sum = record.items[i].sum;
    		model.data.cost = record.items[i].cost;
    		model.data.amount = record.items[i].count;
    		model.data.categoryName = record.items[i].category;
    		model.data.type = record.items[i].type;
    		
    		sum += parseInt(record.items[i].sum);
    		if (record.items[i].type == 'SUSHI')
    			sushiSum += parseInt(record.items[i].sum);

    		grid.getStore().add(model);
    	}
    	
    	var total = 0;
    	var selfServiceDiscount = Ext.getCmp('seftServiceDiscountField').getValue();
    	var discount = Ext.getCmp('discountPercentField').getValue();
    	
    	/**
    	 * 
    	 * PROBLEM
    	 * 
    	 * 
    	 */
    	
    	if (discount > 0) {
    		var sumWithoutSushi = sum - sushiSum;
    		if (record.orderType == 'SELF_SERVICE') 
    			sumWithoutSushi = Math.round(sumWithoutSushi*(1-parseInt(selfServiceDiscount)/100));
    		
    		if (record.orderType == 'SELF_SERVICE') {
    			total = sumWithoutSushi+Math.round(sushiSum*(1-((parseInt(discount)+parseInt(selfServiceDiscount))/100)));
    		} else {
    			total = sumWithoutSushi+Math.round(sushiSum*(1-discount/100));
    		}
    	} else {
    		if (record.orderType == 'SELF_SERVICE') {
    			total = Math.round(sum*(1-parseInt(selfServiceDiscount)/100));
    		} else {
    			total = sum;
    		}
    	}
    	
    	this.lookupReference('orderSumField').setValue(sum);
    	this.lookupReference('orderSushiSumField').setValue(sushiSum);
    	this.lookupReference('orderTotalSumField').setValue(total);
    	this.lookupReference('orderFreeItemCountField').setValue(Math.floor(sushiSum / 2000));
    	
    },
    
    resetOrderForm: function() {
    	this.siteOrder = null;
    	this.lookupReference('siteOrderIdField').setValue(-1);
    	//this.lookupReference('siteOrderIdField').setValue(null);
    	this.lookupReference('siteOrderDataField').setValue(null);
    	this.lookupReference('orderForm').getForm().reset();
    	this.lookupReference('orderProductGrid').getStore().removeAll();
    	this.lookupReference('siteClientInfoContainer').setVisible(false);
    	Ext.getCmp('printOrderBtn').setVisible(false);
		Ext.getCmp('saveOrderBtn').setDisabled(false);
		Ext.getCmp('orderDeliveryDate').setValue(new Date());
    },
    
    changeBarOrderType: function(obj, newValue, oldValue, eOpts) {
    	if (newValue == true) { 
    		Ext.getCmp('orderTypeField').setValue('bar');
    		this.lookupReference('clientInfoContainer').setVisible(false);
    		this.lookupReference('deliveryCostColumn').setVisible(false);
    		this.lookupReference('barCostColumn').setVisible(true);
    		this.lookupReference('clientId').setValue(0);
    		this.lookupReference('clientAddressId').setValue(0);
    		this.lookupReference('clientNameField').reset();
    		this.lookupReference('clientPhoneField').reset();
    		this.lookupReference('clientAddressField').reset();
		}
    	
    	if (Ext.getCmp('searchClientGridWindowForm') != null)
    		Ext.getCmp('searchClientGridWindowForm').getForm().reset();
    	if (Ext.getCmp('newOrderSearchClientGrid') != null)
    		Ext.getCmp('newOrderSearchClientGrid').getStore().removeAll();
    	if (Ext.getCmp('newOrderClientAddressGrid') != null)
    		Ext.getCmp('newOrderClientAddressGrid').getStore().removeAll();
    	
    	this.recalculateTotalSum(null);
    },
    changeDeliveryOrderType: function(obj, newValue, oldValue, eOpts) {
    	if (newValue == true) { 
    		Ext.getCmp('orderTypeField').setValue('delivery');
    		this.lookupReference('clientInfoContainer').setVisible(true);
    		this.lookupReference('deliveryCostColumn').setVisible(true);
    		this.lookupReference('barCostColumn').setVisible(false);
    		Ext.getCmp('clientAddressField').setVisible(true);
    		this.lookupReference('clientId').setValue(0);
    		this.lookupReference('clientAddressId').setValue(0);
    		this.lookupReference('clientNameField').reset();
    		this.lookupReference('clientPhoneField').reset();
    		this.lookupReference('clientAddressField').reset();
		}
    	if (Ext.getCmp('searchClientGridWindowForm') != null)
    		Ext.getCmp('searchClientGridWindowForm').getForm().reset();
    	if (Ext.getCmp('newOrderSearchClientGrid') != null)
    		Ext.getCmp('newOrderSearchClientGrid').getStore().removeAll();
    	if (Ext.getCmp('newOrderClientAddressGrid') != null)
    		Ext.getCmp('newOrderClientAddressGrid').getStore().removeAll();
    	
    	this.recalculateTotalSum(null);
    },

    changeSelfServiceOrderType: function(obj, newValue, oldValue, eOpts) {
    	if (newValue == true) { 
    		Ext.getCmp('orderTypeField').setValue('selfservice');
    		this.lookupReference('clientInfoContainer').setVisible(true);
    		Ext.getCmp('clientAddressField').setVisible(false);
    		this.lookupReference('deliveryCostColumn').setVisible(true);
    		this.lookupReference('barCostColumn').setVisible(false);
    		this.lookupReference('clientId').setValue(0);
    		this.lookupReference('clientAddressId').setValue(0);
    		this.lookupReference('clientNameField').reset();
    		this.lookupReference('clientPhoneField').reset();
    		this.lookupReference('clientAddressField').reset();
		}
    	if (Ext.getCmp('searchClientGridWindowForm') != null)
    		Ext.getCmp('searchClientGridWindowForm').getForm().reset();
    	if (Ext.getCmp('newOrderSearchClientGrid') != null)
    		Ext.getCmp('newOrderSearchClientGrid').getStore().removeAll();
    	if (Ext.getCmp('newOrderClientAddressGrid') != null)
    		Ext.getCmp('newOrderClientAddressGrid').getStore().removeAll();
    	
    	this.recalculateTotalSum(null);
    },
    
    // Показать окно выбора клиента
    showClientWindow: function() {
    	var win = this.lookupReference('searchClientWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.SearchClientWindow();
            this.getView().add(win);
        }
        
        if (this.siteOrder) {
        	win.lookupReference('siteClientInfoPanel').setVisible(true);
        	win.lookupReference('siteclientNameField').setValue(this.siteOrder.personName);
        	win.lookupReference('searchSiteClientPhoneField').setValue(this.siteOrder.personPhone);
        } else {
        	win.lookupReference('siteClientInfoPanel').setVisible(false);
        }
        
        win.show();
    },
    
    
    // Поиск клиента по критериям
    searchClient: function() {
    	var clientNameField = Ext.getCmp('searchClientNameField');
    	var clientPhoneField = Ext.getCmp('searchClientPhoneField');
    	var clientSearchGrid = Ext.getCmp('newOrderSearchClientGrid');
    	clientSearchGrid.store.proxy.api.read = 'rest/client/search/store/read?name=' + clientNameField.getValue() + '&phone=' + clientPhoneField.getValue();
    	clientSearchGrid.getStore().reload();
    }, 
    
    
    // Сохранить клиента и его адрес
    onSelectClientFormClick: function() {
    	var clientGrid = Ext.getCmp('newOrderSearchClientGrid');
    	var clientAddressGrid = Ext.getCmp('newOrderClientAddressGrid');
    	var clientSelectedRecord = clientGrid.view.getSelectionModel().getSelection()[0];
    	var clientAddressSelectedRecord = clientAddressGrid.view.getSelectionModel().getSelection()[0];
    	
       	orderType = Ext.getCmp('orderTypeField').getValue(); 
    	
       	if (orderType == 'seftService')
    		if (!clientSelectedRecord) {
        		Ext.MessageBox.show({ title: 'Ошибка', msg: 'Необходимо указать клиента',
                    buttons: Ext.MessageBox.OK, scope: this, icon: 'error',
                });
        		return false;
        	}
    	
 
    	if (orderType == 'delivery')
	    	if (!clientSelectedRecord || !clientAddressSelectedRecord) {
	    		Ext.MessageBox.show({ title: 'Ошибка', msg: 'Необходимо указать клиента и адрес доставки',
	                buttons: Ext.MessageBox.OK, scope: this, icon: 'error',
	            });
	    		return false;
	    	}
    	
    	// client
    	var clientId = Ext.getCmp('clientId');
    	clientId.setValue(clientSelectedRecord.getData().id);
    	
    	var clientName = Ext.getCmp('clientNameField');
    	clientName.setValue(clientSelectedRecord.getData().name);
    	
    	var clientPhone = Ext.getCmp('clientPhoneField');
    	clientPhone.setValue(clientSelectedRecord.getData().phoneNumber);
    	
    	// address
    	var clientAddress = Ext.getCmp('clientAddressField');
    	var clientAddressId = Ext.getCmp('clientAddressId');
    	if (orderType == 'delivery') {
    		clientAddress.setValue(clientAddressSelectedRecord.getData().address);
    		clientAddressId.setValue(clientAddressSelectedRecord.getData().id);
    	} else {
    		clientAddress.setValue(null);
    		clientAddressId.setValue(0);
    	}
    	
    	// Discount
    	var clientTotalOrderSumField = Ext.getCmp('clientTotalOrderSumField');
    	var clientDiscountPercentField = Ext.getCmp('clientDiscountPercentField');
    	var clientNextDiscountSumField = Ext.getCmp('clientNextDiscountSumField');
    	var clientNextDiscountPercentField = Ext.getCmp('clientNextDiscountPercentField');
    	
    	if (clientSelectedRecord.getData().currentTotalOrderSum != null) {
    		clientTotalOrderSumField.setValue(clientSelectedRecord.getData().currentTotalOrderSum);
    	} else {
    		clientTotalOrderSumField.setValue(0);
    	}
    	
    	if (clientSelectedRecord.getData().currentDiscountPercent != null) {
    		clientDiscountPercentField.setValue(clientSelectedRecord.getData().currentDiscountPercent);
    	} else {
    		clientDiscountPercentField.setValue(0);
    	}
    	
    	if (clientSelectedRecord.getData().nextDiscountSum != null) {
    		clientNextDiscountSumField.setValue(clientSelectedRecord.getData().nextDiscountSum);
    	} else {
    		clientNextDiscountSumField.setValue(0);
    	}
       	
    	if (clientSelectedRecord.getData().nextDiscountPercent != null) {
    		clientNextDiscountPercentField.setValue(clientSelectedRecord.getData().nextDiscountPercent);
    	} else {
    		clientNextDiscountPercentField.setValue(0);
    	}

    	this.recalculateTotalSum(null);

    	var win = Ext.getCmp('searchClientGridWindow');
    	// TODO Clear all data 
    	win.hide();

    },
    
    onResetSearchClientFormClick: function() {
    	var win = Ext.getCmp('searchClientGridWindow');
    	//var form = Ext.getCmp('searchClientGridWindowForm');
    	// TODO Clear all data 
    	win.hide();
    },
    
    
    // Показать окно нового клиента
    showAddClientWindow: function() {
    	var win = Ext.getCmp('addClientWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.AddClientWindow();
            this.getView().add(win);
        }
        
        var record = Ext.create('SushimiConsole.model.order.ClientModel');
        record.set(win.down("form").getValues());
        
        var siteOrderDataStr = Ext.getCmp('siteOrderDataField').getValue();
        if (siteOrderDataStr != null && siteOrderDataStr != '') {
        	siteOrderData = Ext.decode(siteOrderDataStr);
            console.log(siteOrderData);
        	record.data.name = siteOrderData.personName;
        	record.data.phoneNumber = siteOrderData.personPhone;
        	record.data.email = siteOrderData.personEmail;
        }
        
		win.down("form").loadRecord(record);
        win.show();
    },
    
    // добавить нового клиента
    onAddClientFormClick: function() {
    	var formPanel = Ext.getCmp('addClientWindowForm'),
        form = formPanel.getForm();
   	 	var view = this;
	     if (form.isValid()) {
	     	var record = form.getRecord();
	     	var values = form.getValues();
	     	record.set(values);
	     	record.data.id = 0;
	     	var data = record.getData();
	     	Ext.Ajax.request({
			    url: 'rest/client/add',
			    jsonData : data,
			    
			    success: function(response){
			    	response = Ext.decode(response.responseText);
			    	var clientSearchGrid = Ext.getCmp('newOrderSearchClientGrid');
			    	clientSearchGrid.store.proxy.api.read = 'rest/client/search/store/read?clientId='+  response.clientId;
			    	clientSearchGrid.getStore().reload();
			    	
			    	formPanel.reset();
			    	Ext.getCmp('addClientWindow').hide();
			    },
			    failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
	     	
	     }
    },
    
    // закрыть форму добавления нового клиента
    onResetAddClientFormtClick: function() {
    	var win = Ext.getCmp('addClientWindow');
    	var formPanel = Ext.getCmp('addClientWindowForm'),
        form = formPanel.getForm();
    	form.reset();
    	win.hide();
    },
    
    
    // ========================================
    // ======= CLIENT ADDRESS =================
    // ========================================
    
    showAddClientAddressWindow: function() {
    	var win = Ext.getCmp('addClientAddressWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.AddClientAddressWindow();
            this.getView().add(win);
        }
        
        var record = Ext.create('SushimiConsole.model.order.ClientAddressModel');
		record.set(win.down("form").getValues());
		
		  var siteOrderDataStr = Ext.getCmp('siteOrderDataField').getValue();
	        if (siteOrderDataStr != null && siteOrderDataStr != '') {
	        	siteOrderData = Ext.decode(siteOrderDataStr);
		        console.log(siteOrderData);
	        	
	        	record.data.cityName = siteOrderData.addressCityName;
	        	record.data.streetName = siteOrderData.addressStreetName;
	        	record.data.house = siteOrderData.addressHouse;
	        	record.data.corpus = siteOrderData.addressCorpus;
	        	record.data.building = siteOrderData.addressBuilding;
	        	record.data.flat = siteOrderData.addressFlat;
	        	record.data.porch = siteOrderData.addressPorch;
	        	record.data.doorCode = siteOrderData.addressDoorCode;
	        	record.data.floor = siteOrderData.addressFloor;
	        	record.data.room = siteOrderData.addressRoom;
	        	record.data.office = siteOrderData.addressOffice;
	        	
	        	record.data.geoLatitude = siteOrderData.GeoLatitude;
	        	record.data.geoLongitude = siteOrderData.GeoLongitude;
	        }
	
		win.down("form").loadRecord(record);
        win.show();
    },
        
    onAddClientAddressFormClick: function() {
    	var formPanel = Ext.getCmp('addClientAddressWindowForm'),
        form = formPanel.getForm();
   	 	var view = this;
	     if (form.isValid()) {
	     	var record = form.getRecord();
	     	var values = form.getValues();
	     	record.set(values);
	     	record.data.id = 0;
	     	
	     	// Выставляем связь с клиентом
	    	var clientGrid = Ext.getCmp('newOrderSearchClientGrid');
	    	var clientSelectedRecord = clientGrid.view.getSelectionModel().getSelection()[0];
	    	record.data.clientId = clientSelectedRecord.data.id;
	    	
	     	var data = record.getData();
	     	Ext.Ajax.request({
			    url: 'rest/client/address/add',
			    jsonData : data,
			    
			    success: function(response){
			    	response = Ext.decode(response.responseText);
			    	var clientAddressSearchGrid = Ext.getCmp('newOrderClientAddressGrid');
			    	clientAddressSearchGrid.store.proxy.api.read = 'rest/client/address/search/store/read?clientId=' + response.clientId;
			    	clientAddressSearchGrid.getStore().reload();
			    	
			    	clientAddressSearchGrid.getSelectionModel().select(record);
			    	
			    	formPanel.reset();
			    	Ext.getCmp('addClientAddressWindow').hide();
			    },
			    failure: function(batch) {
					Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
				}
			});
	     	
	     }
    },
    
    
    onResetAddClientAddressFormtClick: function() {
    	var win = Ext.getCmp('addClientAddressWindow');
    	var formPanel = Ext.getCmp('addClientAddressWindowForm'),
        form = formPanel.getForm();
    	form.reset();
    	win.hide();
    },
    
    
    // ========================================
    // ========== PRODUCT ====================
    // ==========================================
    
    showAddProductWindow: function() {
    	var win = this.lookupReference('newOrderProductWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.ProductWindow();
            this.getView().add(win);
        }
        Ext.getCmp('productSearchTextField').setValue(null);
        Ext.getCmp('newOrderProductGrid').getStore().reload();
        Ext.getCmp('newOrderProductCountField').setValue(1);
        win.show();
    },
    
    
    addProductToOrder: function() {
    	var productGrid = Ext.getCmp('newOrderProductGrid');
    	var productCountField = Ext.getCmp('newOrderProductCountField');
    	
    	var selectedRecord = productGrid.view.getSelectionModel().getSelection()[0];
    	if (!selectedRecord)
    		alert('Выберите продукт для того чтобы добавить его в заказ');    	
    	
    	var orderProductGrid = Ext.getCmp('orderProductGrid');
    	
    	if (orderProductGrid.store.indexOf(selectedRecord) > -1){
    		alert('Уже имеется в списке заказов');
    		return false;
    	}
    	
    	selectedRecord.data.amount = productCountField.getValue();
    	
    	var orderType = Ext.getCmp('orderTypeField').getValue();
    	
    	if (orderType == 'bar') {
    		console.log('orderType: ' + orderType );
    		selectedRecord.data.sum = selectedRecord.data.amount * selectedRecord.data.barCost;
    	} else {
    		console.log('orderType: ' + orderType );
    		selectedRecord.data.sum = selectedRecord.data.amount * selectedRecord.data.cost;
    	}
    	
    	orderProductGrid.view.getStore().add(selectedRecord);
    	
    	var orderSumField = Ext.getCmp('orderSumField');
    	var orderSushiSumField = Ext.getCmp('orderSushiSumField');
    	
    	if (selectedRecord.data.type == 'SUSHI') {
    		orderSushiSumField.setValue(parseInt(orderSushiSumField.getValue()) + selectedRecord.data.sum);
    		var orderFreeItemCountField = Ext.getCmp('orderFreeItemCountField');
    		var freeCount = Math.floor(orderSushiSumField.getValue() / 2000);
    		orderFreeItemCountField.setValue(freeCount);
    	}
    	
    	orderSumField.setValue(parseInt(orderSumField.getValue()) + selectedRecord.data.sum);  
    	
    	this.recalculateTotalSum(null);
    	/*
    	// Пересчет скидки если такая есть
    	var total = Ext.getCmp('orderTotalSumField');
    	var discount = Ext.getCmp('discountPercentField').getValue();
    	var selfServiceDiscount = Ext.getCmp('seftServiceDiscountField').getValue();
    	if (discount > 0) {
    		var sum = orderSumField.getValue();
			var sushiSum = orderSushiSumField.getValue();
    			
    		var sumWithoutSushi = sum - sushiSum;
    		
    	   	var orderType = Ext.getCmp('orderTypeField').getValue(); 
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
    	*/
		
    	Ext.getCmp('personCashAmountField').setValue(0);
    	Ext.getCmp('moneyBackValueField').setValue(0);
    	
    	var win = Ext.getCmp('newOrderProductGridWindow');
    	win.hide();
    },
    
    // ============================================
    // ======= CALCULATE TOTAL SUM ================
    // ============================================
    
    recalculateTotalSum: function(obj) {
    	var orderType = Ext.getCmp('orderTypeField').getValue();
    	var selfServiceDiscount = Ext.getCmp('seftServiceDiscountField').getValue();
    	
    	var sum = parseInt(Ext.getCmp('orderSumField').getValue());
    	var sushiSum = parseInt(Ext.getCmp('orderSushiSumField').getValue());
    	var sumWithoutSushi = parseInt(sum)-parseInt(sushiSum);
    	
    	var discountField = Ext.getCmp('discountPercentField');
    	var discountFieldValue = parseInt(discountField.getValue()); 
    	
    	if (discountFieldValue == null)
    		discountFieldValue = 0;
    	
		var discountValueTypeField = Ext.getCmp('discountValueTypeField');
		var discountValueTypeFieldValue = discountValueTypeField.getValue();
		
		var deliveryExtraPriceField = Ext.getCmp('deliveryExtraPriceField');
		var deliveryExtraPriceFieldValue = parseInt(deliveryExtraPriceField.getValue());
		var deliveryExtraPriceValueField = Ext.getCmp('deliveryExtraPriceValueField');
		var deliveryExtraPriceValueFieldValue = parseInt(deliveryExtraPriceValueField.getValue());
		
		var clientDiscountValueField = Ext.getCmp('clientDiscountPercentField');
		var clientDiscountValue = 0;
		if (clientDiscountValueField.getValue() != null)
			clientDiscountValue = parseInt(clientDiscountValueField.getValue());
		console.log(clientDiscountValueField.getValue());
		
		var total = Ext.getCmp('orderTotalSumField');
		
		if (orderType == 'selfservice')  {
			if (discountValueTypeFieldValue != null) {
				if (discountValueTypeFieldValue == 'DISCOUNT_ALL' || 
					discountValueTypeFieldValue == 'DPA') {
					sumWithoutSushi = Math.round(sumWithoutSushi * (1-((parseInt(discountFieldValue)+10+parseInt(clientDiscountValue)) / 100)));
				} else {
					sumWithoutSushi = Math.round(sumWithoutSushi * (1-((10+parseInt(clientDiscountValue)) / 100)));
				}
			} else {
				sumWithoutSushi = Math.round(sumWithoutSushi * (1 - (0.1 + parseInt(clientDiscountValue))));
			}
		} else {
			if (discountValueTypeFieldValue != null) {
				if (discountValueTypeFieldValue == 'DISCOUNT_ALL' || 
					discountValueTypeFieldValue == 'DPA') {
					sumWithoutSushi = Math.round(sumWithoutSushi * (1-((parseInt(discountFieldValue)+parseInt(clientDiscountValue)) / 100)));
				} else {
					sumWithoutSushi = Math.round(sumWithoutSushi * (1-((parseInt(clientDiscountValue)) / 100)));
				}
			} else {
				sumWithoutSushi = Math.round(sumWithoutSushi * (1-(parseInt(clientDiscountValue) / 100)));
			}
		}

		//sumWithoutSushi = Math.round(sumWithoutSushi*(1-parseInt(selfServiceDiscount)/100));
		// Если есть акции на суши
		if (sushiSum > 0 && discountValueTypeFieldValue != null) {
			if (orderType == 'selfservice') {
				sushiSum = Math.round(sushiSum * (1-((parseInt(discountFieldValue)+10+parseInt(clientDiscountValue)) / 100)));
			} else {
				sushiSum = Math.round(sushiSum * (1-((parseInt(discountFieldValue)+parseInt(clientDiscountValue)) / 100)));
			}
		} else {
			if (orderType == 'selfservice') {
				sushiSum = Math.round(sushiSum * (1 - (0.1 + parseInt(clientDiscountValue) / 100)) );
			} else {
				sushiSum = Math.round(sushiSum * (1 - (parseInt(clientDiscountValue) / 100)) );
			}
		}
		
		if (deliveryExtraPriceFieldValue == null)
			deliveryExtraPriceValueFieldValue = 0;
		
		total.setValue(sushiSum + sumWithoutSushi + deliveryExtraPriceValueFieldValue);
    },
    
    
    
    // ============================================
    // ======= CREATE ORDER =======================
    // ============================================
    
    onSaveFormClick: function(obj) {
		// Prevent double click and register two orders at time
		if (Ext.getCmp('saveOrderBtn').disabled == true) {
			return;
		}
		
		Ext.getCmp('saveOrderBtn').setDisabled(true);
    	var model = new SushimiConsole.model.order.CreateOrderModel();
    	model.data.id = 0;
    	
    	var orderType = Ext.getCmp('orderTypeField').getValue();
    	if (orderType != 'bar') {
    		model.data.clientId = this.lookupReference('clientId').getValue();
    		
    		if (orderType == 'delivery') {
    			model.data.clientAddressId = this.lookupReference('clientAddressId').getValue();
    		}
    	}
    	
    	model.data.siteId = Ext.getCmp('siteOrderIdField').getValue();
    	if (model.data.siteId == undefined || model.data.siteId == '')
    		model.data.siteId = null;
    	
    	switch (orderType) {
		case 'bar':
			model.data.type = 'BAR';
			break;
		case 'delivery':
			var toTimeDelivery = this.lookupReference('deliveryToTime').getValue();
			if (toTimeDelivery == true) {
				model.data.type = 'DELIVERY_IN_TIME';
			} else {
				model.data.type = 'DELIVERY';
			}
			break;
		case 'selfservice':
			model.data.type = 'SELF_SERVICE';
			break;
		default:
			break;
		}
    	
    	// время доставки/самовывоза если указано
    	var toTimeDelivery = this.lookupReference('deliveryToTime').getValue();
    	if (toTimeDelivery) {
			var deliveryDate = this.lookupReference('orderDeliveryDate').getValue();
			var deliveryTime = this.lookupReference('orderDeliveryTime').getValue();
			deliveryDate.setHours(deliveryTime.getHours(), deliveryTime.getMinutes());
			model.data.toTime = deliveryDate;
    	} else {
    		model.data.toTime = null;
    	}
    	
    	// Акции
    	var promotionGrid = this.lookupReference('promotionsField');
    	var promotionId = promotionGrid.getValue();
    	if (promotionId) {
    		model.data.promotionId = promotionId;
    	}
    	
    	var personCount = this.lookupReference('personCountField').getValue();
    	model.data.personCount = personCount;
    	
    	var personCash = this.lookupReference('personCashAmountField').getValue();
    	model.data.personCash = personCash;
    	
    	model.data.comment = this.lookupReference('commentField').getValue();
    	
    	model.data.deliveryPriceId = this.lookupReference('deliveryExtraPriceField').getValue();
    	if (model.data.deliveryPriceId == "" || model.data.deliveryPriceId == '')
    		model.data.deliveryPriceId = null;
    	
    	var grid = this.lookupReference('orderProductGrid');
    	var products = grid.getStore().data;
    	var i = 0;
    	model.data.items = new Array();
    	grid.getStore().each(function(record){
    		model.data.items[i] = {productId: record.data.id, count: record.data. amount };
    		i++;
    	});
    	
    	var data = model.getData();
    	console.log(data);
     	Ext.Ajax.request({
		    url: 'rest/order/create',
		    jsonData : data,
		    
		    success: function(response){
		    	response = Ext.decode(response.responseText);
		    	console.log(response);
		    	
		    	if (response.success) {
		    		Ext.getCmp('printOrderBtn').setVisible(true);
		    		Ext.getCmp('printOrderBtn').setHref('/order/print/' + response.orderId);
		    		//Ext.getCmp('saveOrderBtn').setDisabled(true);
		    		Ext.MessageBox.alert('Успешно','Заказ успешно создан. № заказа [' + response.orderNumber + '], теперь можно распечатать чек');
		    	} else {
		    		Ext.MessageBox.alert('Внимание','Ошибка при сохранении заказа');
		    	}
		    },
		    failure: function(batch) {
				Ext.getCmp('saveOrderBtn').setDisabled(false);
				Ext.MessageBox.alert('Внимание','Ошибка при сохранении заказа');
			}
		});
    	
    },

    
    onPrintOrderClick: function(btn) {
       console.log(btn);
	   window.open(btn.href, '_blank');
    },
    
    onResetFormClick: function() {
    	// TODO RESET FORM
    	this.view.hide();
    },
    
    
});