Ext.define('SushimiConsole.view.order.window.PreviewSiteOrderWindowController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],

    alias: 'controller.order.window.previewSiteOrderWindow',
    
    routes : {
    },
    
    // Загружает данные заказа и отображает окно
    previewOrder: function(record) {
    	// Загрузка данных
    	var ctrl = this;
    	
    	Ext.Ajax.request({
		    url: 'rest/order/site/preview/'+ record.data.id,		    
		    success: function(response){
		    	response = Ext.decode(response.responseText);
		    	console.log(response);
		    	ctrl.loadFormData(response);
		    	ctrl.view.show();
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка загрузки данных заказа');
			}
		});
    },
    
    loadFormData: function(record) {
    	this.lookupReference('previewOrderId').setValue(record.id);
   	
    	var orderDate = Ext.Date.format(new Date(record.orderTime), 'd.m.Y H:i:s');
    	this.lookupReference('previewOrderTime').setValue(orderDate);
    	var deliveryDate = Ext.Date.format(new Date(record.deliveryTime), 'd.m.Y H:i:s');
    	this.lookupReference('orderDeliveryTime').setValue(deliveryDate);
    	   	
    	if (record.status == 'NONE')
    		this.lookupReference('previewOrderStatus').setValue('Не указано');
    	if (record.status == 'RECEIVED')
    		this.lookupReference('previewOrderStatus').setValue('Получен');
    	if (record.status == 'REGISTERED')
    		this.lookupReference('previewOrderStatus').setValue('Зарегистрирован');
    	if (record.status == 'CANCELED')
    		this.lookupReference('previewOrderStatus').setValue('Отменен');    	
    	
    	if (record.orderType == 'DELIVERY' || record.orderType == 'DELIVERY_IN_TIME') {
    		this.lookupReference('previewOrderType').setValue('Доставка');
    		if (record.orderType == 'DELIVERY_IN_TIME')
    			this.lookupReference('previewOrderType').setValue('Доставка ко времени');
    		
    		this.lookupReference('clientNameField').setValue(record.personName);
        	this.lookupReference('clientPhoneField').setValue(record.personPhone);
        	this.lookupReference('clientAddressField').setValue(record.address);
        	this.lookupReference('clientPhoneField').setVisible(true);
    		this.lookupReference('clientAddressField').setVisible(true);
    	}
    	
    	if (record.orderType == 'SELF_SERVICE') {
    		this.lookupReference('previewOrderType').setValue('Самовывоз');
    		this.lookupReference('clientNameField').setValue(record.personName);
        	this.lookupReference('clientPhoneField').setValue(record.personPhone);
        	this.lookupReference('clientPhoneField').setVisible(true);
    		this.lookupReference('clientAddressField').setVisible(false);
    	}

    	this.lookupReference('commentField').setValue(record.personRemark);
    	this.lookupReference('personCashAmountField').setValue(record.personCash);
    	this.lookupReference('personCountField').setValue(record.personCount);
    	this.lookupReference('orderTotalSumField').setValue(record.orderSum)
    	
    	var grid = this.lookupReference('orderProductGrid');
    	grid.store.removeAll();
    	var sum = 0, sushiSum = 0;
    	
    	for (var i = 0; i < record.items.length; i++) {
    		var model = new SushimiConsole.model.order.OrderProductModel();
    		
    		model.data.id = record.items[i].id;
    		model.data.name = record.items[i].name;
    		model.data.sum = record.items[i].sum;
    		model.data.cost = record.items[i].cost;
    		model.data.amount = record.items[i].count;
    		model.data.categoryName = record.items[i].category;
    		
    		sum += parseInt(record.items[i].sum);
    		if (record.items[i].type == 'SUSHI')
    			sushiSum += parseInt(record.items[i].sum);

    		grid.getStore().add(model);
    	}
    	
    	var total = 0;
    	var selfServiceDiscount = 10;
    	var discount = record.promotionDiscount;
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
    	this.lookupReference('orderFreeItemCountField').setValue(Math.floor(sushiSum / 2000));
    },
    
    onResetFormClick: function() {
    	// TODO RESET FORM
    	this.view.hide();
    },
    
    
});