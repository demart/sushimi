/**
 * The main application controller. This is a good place to handle things like routes.
 */
Ext.define('SushimiConsole.controller.Root', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            main: 'app-main',
        },
    },
    
    routes : {
    	'dictionaries/city' : 'onDictionaryCityList',
    	'dictionaries/deliveryprice' : 'onDictionaryDeliveryPriceList',
    	'dictionaries/promotion' : 'onDictionaryPromotionList',
    	'dictionaries/unit' : 'onDictionaryUnitList',
    	'dictionaries/ingredient' : 'onDictionaryIngredientList',
    	'dictionaries/category' : 'onDictionaryCategoryList',
    	'dictionaries/product' : 'onDictionaryProductList',
    	'dictionaries/couriers' : 'onDictionaryCouriersList',
    	
    	'clients/information' : 'onInfoClientsList',
    	'clients/integration' : 'onIntegrationClientsList',
    	'clients/address' : 'onIntegrationAddressClientsList',
    	
    	'warehouse' : 'onWarehouse',
    	
    	'orders' : 'onOrders',
    	'reports' : 'onReports',
    	
    	'temp' : 'onTemp',
    	
    	//'operator/orders' : 'onCurrentOrdersList',
    	'operator/orders/delivered' : 'onDeliveredOrdersList',
    	//'operator/orders/site' : 'onNewSiteOrdersList',
    	'operator/courier' : 'onCourierList',
    	//'operator/orders' : 'onOrdersList',
    	'operator/orders' : 'onOrdersTwoList',
    	'logout' : 'onLogoutRoute',
    	
    },
    
    //Операторская: заказы
    onOrdersTwoList : function() {
        console.log("onOrdersList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.operator.orders.OrdersTwoList'));
    },
    
    
    
    
    //Операторская: список курьеров
    onCourierList : function() {
        console.log("onCourierList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.operator.courier.CourierList'));
    },
    
     
    //Операторская: выполненные заказы
    onDeliveredOrdersList : function() {
        console.log("onDeliveredOrdersList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.operator.orders.delivered.DeliveredOrdersList'));
    },
    
    
    // справочник курьеров
    onDictionaryCouriersList : function() {
        console.log("onDictionaryCouriersList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.couriers.CouriersList'));
    },
    
    
    // справочник городов
    onDictionaryCityList : function() {
        console.log("onDictionaryCityList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.city.CityList'));
    },
    
    // справочник районов доставки
    onDictionaryDeliveryPriceList : function() {
        console.log("onDictionaryDeliveryPriceList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.deliveryprice.DeliveryPriceList'));
    },
    
    // справочник акций
    onDictionaryPromotionList : function() {
        console.log("onDictionaryPromotionList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.promotion.PromotionList'));
    },
    
    
    // справочник единиц измерения
    onDictionaryUnitList : function() {
        console.log("onDictionaryUnitList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.unit.UnitList'));
    },

    // справочник ингридиентов
    onDictionaryIngredientList : function() {
        console.log("onDictionaryIngredientList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.ingredient.IngredientList'));
    },

    // справочник категорий
    onDictionaryCategoryList  : function() {
        console.log("onDictionaryCategoryList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.category.CategoryList', {id: 'dicCatListView'}));
    },    

    // справочник категорий
    onDictionaryProductList  : function() {
        console.log("onDictionaryProductList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.dictionaries.product.ProductList', {id: 'dicProductListView'}));
    },
    
    // управление клиентами: информация о клиентах
    onInfoClientsList  : function() {
        console.log("onInfoClientsList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.clients.information.InfoClientsList', {id: 'infoClientsListView'}));
    },

    // управление клиентами: объединение клиентов
    onIntegrationClientsList  : function() {
        console.log("onIntegrationClientsList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.clients.integration.IntegrationClientsList', {id: 'integrationClientsListView'}));
    },
    
    // управление клиентами: объединение адресов
    onIntegrationAddressClientsList  : function() {
        console.log("onIntegrationAddressClientsList route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.clients.address.IntegrationAddressList', {id: 'integrationAddressListView'}));
    },
    
    // управление складом 
    onWarehouse  : function() {
        console.log("onWarehouse route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.warehouse.Warehouse', {id: 'warehouseListView'}));
    },

    // управление складом 
    onReports  : function() {
        console.log("onReports route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.report.Report', {id: 'reportView'}));
    },    
    
    // управление заказами 
    onOrders  : function() {
        console.log("onOrders route");
        this.getMain().getComponent('mainBody').removeAll(true);
        this.getMain().getComponent('mainBody').add(Ext.create('SushimiConsole.view.order.Order'));
    },
    
    onTemp : function() {
        console.log("OnCities route");
        console.log(this.getMain().getComponent('mainBody'));
        this.getMain().getComponent('mainBody').removeAll(true);
        var cmp = Ext.create('SushimiConsole.view.temp.ContactForm');
        console.log(cmp);
        this.getMain().getComponent('mainBody').add(cmp);
    },
    
    onLogoutRoute : function() {
        console.log("onLogoutRoute route");
        
        Ext.Ajax.request({
    	    url: '/console/logout',
    	    method: 'POST',          
    	    params: { },
    	    success: function(response, conn, options, eOpts) {
    	    	var json = Ext.util.JSON.decode(response.responseText);
    	    	if (json.success) {}
    	    },
    	    failure: function(conn, response, options, eOpts){
    	    	var respObj = Ext.JSON.decode(response.responseText);
    	    	Ext.Msg.alert("Error", respObj.status.statusMessage);
    	    	console.log('failure' + response);
	    	}
    	});
    	
		window.document.location = "/login";
    },


});
