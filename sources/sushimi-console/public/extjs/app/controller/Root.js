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
    	'dictionaries/unit' : 'onDictionaryUnitList',
    	'dictionaries/ingredient' : 'onDictionaryIngredientList',
    	'dictionaries/category' : 'onDictionaryCategoryList',
    	'dictionaries/product' : 'onDictionaryProductList',
    	
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
