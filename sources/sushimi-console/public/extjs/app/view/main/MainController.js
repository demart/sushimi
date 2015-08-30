/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SushimiConsole.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],

    alias: 'controller.main',
    
    routes : {
    },
 
    
    // Новый заказ
    onNewOrderClick : function() {
        var win = this.getView().lookupReference('newOrderWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.NewOrderWindow({id: 'newOrderWindow'});
            this.getView().add(win);
        }
        
        win.controller.resetOrderForm();
        win.show();
        
    },      
    
    // Справочник городов
    onCityDicClick : function() {
    	console.log('City dictionary clicked');
    	this.redirectTo('dictionaries/city');
    },
    
    // Справочник районов доставки
    onDeliveryPriceDicClick : function() {
    	console.log('DeliveryPrice dictionary clicked');
    	this.redirectTo('dictionaries/deliveryprice');
    },
    
    // Справочник акций
    onPromotionDicClick : function() {
    	console.log('Promotion dictionary clicked');
    	this.redirectTo('dictionaries/promotion');
    },
    
    // Справочник единиц измерения    
    onUnitDicClick : function() {
    	console.log('Unit dictionary clicked');
    	this.redirectTo('dictionaries/unit');
    },
    
    // Справочник ингредиентов    
    onIngredientDicClick : function() {
    	console.log('Ingredient dictionary clicked');
    	this.redirectTo('dictionaries/ingredient');
    },
    
    // Справочник категорий    
    onCategoryDicClick : function() {
    	console.log('Category dictionary clicked');
    	this.redirectTo('dictionaries/category');
    },
    
    // Справочник продуктов
    onProductDicClick : function() {
    	console.log('Product dictionary clicked');
    	this.redirectTo('dictionaries/product');
    },
    
    // Управление складом
    onWarehouseClick : function() {
    	console.log('Warhouse clicked');
    	this.redirectTo('warehouse');
    },    
    
    // Управление клиентами: информация о клиентах
    onInfoClientsClick : function() {
    	console.log('Information clients clicked');
    	this.redirectTo('clients/information');
    },   
    
    // Управление клиентами: объединение клиентов
    onIntegrationClientsClick : function() {
    	console.log('Integration clients clicked');
    	this.redirectTo('clients/integration');
    },  
    
    // Управление клиентами: объединение адресов клиента
    onIntegrationAddressClientsClick : function() {
    	console.log('Integration address clients clicked');
    	this.redirectTo('clients/address');
    },  
   
    // Заказы системы
    onOrderClick : function() {
    	console.log('Order clicked');
    	this.redirectTo('orders');
    },  
 
    // Отчеты
    onReportClick : function() {
    	console.log('Reports clicked');
    	this.redirectTo('reports');
    },
    
});
