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
    	
    	'clients/information' : 'onInfoClientsList',
    	'clients/integration' : 'onIntegrationClientsList',
    	
    	'warehouse' : 'onWarehouse',
    	
    	'orders' : 'onOrders',
    	'reports' : 'onReports',
    	
    	'temp' : 'onTemp',
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


});
