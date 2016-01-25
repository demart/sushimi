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
 
    
    //Новый заказ
    onNewOrderClick : function() {
        var win = this.getView().lookupReference('newOrderWindow');
        if (!win) {
            win = new SushimiConsole.view.order.window.NewOrderWindow({id: 'newOrderWindow'});
            this.getView().add(win);
        }
        
        win.controller.resetOrderForm();
        win.show();
        
    },      
    
    //Операторская: Новый заказ
    onNewOrderOperatorClick : function() {
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
    
    // Справочник курьеров
    onCouriersDicClick : function() {
    	console.log('Couriers dictionary clicked');
    	this.redirectTo('dictionaries/couriers');
    },
    
    
    
    // Справочник районов доставки
    onDeliveryPriceDicClick : function() {
    	console.log('DeliveryPrice dictionary clicked');
    	this.redirectTo('dictionaries/deliveryprice');
    },
    
    // Выход
    onLogoutClick: function() {
    	console.log('Logout clicked');
    	this.redirectTo('logout');
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
    
    //Операторская: текущие заказы
    onCurrentOrdersClick: function() {
    	console.log('CurrentOrders clicked');
    	this.redirectTo('operator/orders');
    },
    
    //Операторская: завершенные заказы
    onDeliveredOrdersClick: function() {
    	console.log('DeliveredOrders clicked');
    	this.redirectTo('operator/orders/delivered');
    },
    
    
    //Операторская: список курьеров
    onCourierListClick: function() {
    	console.log('CourierOrders clicked');
    	this.redirectTo('operator/courier');
    },
    
    //Операторская: карта
    onMapsClick: function() {
    	console.log('Maps clicked');
    	//this.redirectTo('maps');
    	//window.document.location = "http://maps.yandex.ru/163/astana/";
    	window.open ("https://maps.yandex.ru/163/astana/?ll=71.480124%2C51.153436&z=13&rtext=51.160596%2C71.451845&rtt=auto");
    },
    
});
