Ext.define('SushimiConsole.view.order.window.PreviewOrderWindowController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],

    alias: 'controller.order.window.previewOrderWindow',
    
    routes : {
    },
    
    // Загружает данные заказа и отображает окно
    previewOrder: function(record) {
    	Ext.getCmp('printPreviewOrderBtn').href = '/order/print/' + record.data.id;
    	// Загрузка данных
    	var ctrl = this;
    	
    	Ext.Ajax.request({
		    url: 'rest/order/preview/'+ record.data.id,		    
		    success: function(response){
		    	response = Ext.decode(response.responseText);
		    	ctrl.loadFormData(response);
		    	ctrl.view.show();
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка загрузки данных заказа');
			}
		});
    },
    
    loadFormData: function(record) {
    	// this.lookupReference('previewOrderId').setValue(record.id);
    	this.lookupReference('previewOrderId').setValue(record.orderNumber);
    	
    	var orderDate = Ext.Date.format(new Date(record.orderDate), 'd.m.Y H:i:s');
    	this.lookupReference('previewOrderTime').setValue(orderDate);
    	var deliveryDate = Ext.Date.format(new Date(record.deliveryDate), 'd.m.Y H:i:s');
    	this.lookupReference('orderDeliveryTime').setValue(deliveryDate);
    	
    	if (record.state == 'NONE')
    		this.lookupReference('previewOrderStatus').setValue('Не указано');
    	if (record.state == 'REGISTERED')
    		this.lookupReference('previewOrderStatus').setValue('Ожидает');
    	if (record.state == 'IN_PROGRESS')
    		this.lookupReference('previewOrderStatus').setValue('В обработке');
    	if (record.state == 'ON_DELIVERY')
    		this.lookupReference('previewOrderStatus').setValue('На доставке');    	
    	if (record.state == 'DELIVERED')
    		this.lookupReference('previewOrderStatus').setValue('Доставлено');
    	if (record.state == 'RETURNED')
    		this.lookupReference('previewOrderStatus').setValue('Возврат');
    	if (record.state == 'CANCELED')
    		this.lookupReference('previewOrderStatus').setValue('Отменен');
    	
    	if (record.type == 'BAR') {
    		this.lookupReference('previewOrderType').setValue('Заказ на бар');
    		this.lookupReference('clientNameField').setValue('Клиент бара');
    		this.lookupReference('clientPhoneField').setVisible(false);
    		this.lookupReference('clientAddressField').setVisible(false);
    	}
    	
    	if (record.type == 'DELIVERY' || record.type == 'DELIVERY_IN_TIME') {
    		this.lookupReference('previewOrderType').setValue('Доставка');
    		if (record.type == 'DELIVERY_IN_TIME')
    			this.lookupReference('previewOrderType').setValue('Доставка ко времени');
    		
    		this.lookupReference('clientNameField').setValue(record.clientName);
        	this.lookupReference('clientPhoneField').setValue(record.clientPhone);
        	this.lookupReference('clientAddressField').setValue(record.clientAddress);
        	this.lookupReference('clientPhoneField').setVisible(true);
    		this.lookupReference('clientAddressField').setVisible(true);
    	}
    	
    	if (record.type == 'SELF_SERVICE') {
    		this.lookupReference('previewOrderType').setValue('Самовывоз');
    		this.lookupReference('clientNameField').setValue(record.clientName);
        	this.lookupReference('clientPhoneField').setValue(record.clientPhone);
        	this.lookupReference('clientPhoneField').setVisible(true);
    		this.lookupReference('clientAddressField').setVisible(false);
    	}
    	
    	this.lookupReference('commentField').setValue(record.comment);
    	this.lookupReference('promotionsField').setValue(record.promotionName);
    	this.lookupReference('personCashAmountField').setValue(record.clientCash);
    	this.lookupReference('personCountField').setValue(record.clientCount);
    	if (record.clientCash > 0) {
    		this.lookupReference('moneyBackValueField').setValue(parseInt(record.clientCash) - parseInt(record.sum));
    	} else {
    		this.lookupReference('moneyBackValueField').setValue(0);
    	}
    	this.lookupReference('orderTotalSumField').setValue(record.sum);
    	
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
    		if (record.type == 'SELF_SERVICE') 
    			sumWithoutSushi = Math.round(sumWithoutSushi*(1-parseInt(selfServiceDiscount)/100));
    		
    		if (record.type == 'SELF_SERVICE') {
    			total = sumWithoutSushi+Math.round(sushiSum*(1-((parseInt(discount)+parseInt(selfServiceDiscount))/100)));
    		} else {
    			total = sumWithoutSushi+Math.round(sushiSum*(1-discount/100));
    		}
    	} else {
    		if (record.type == 'SELF_SERVICE') {
    			total = Math.round(sum*(1-parseInt(selfServiceDiscount)/100));
    		} else {
    			total = sum;
    		}
    	}
    	
    	this.lookupReference('orderSumField').setValue(sum);
    	this.lookupReference('orderSushiSumField').setValue(sushiSum);
    	this.lookupReference('orderFreeItemCountField').setValue(Math.floor(sushiSum / 2000));
    	
    	
    },
    
    onPrintOrderClick: function(btn) {
       console.log(btn);
	   window.open(btn.href);
    },
    
    onResetFormClick: function() {
    	// TODO RESET FORM
    	this.view.hide();
    },
    
    
});