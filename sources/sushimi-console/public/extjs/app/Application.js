/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('SushimiConsole.Application', {
    extend: 'Ext.app.Application',
    
    name: 'SushimiConsole',

    views: [
    ],

    controllers: [
        'Root',
        'Main',
        
    ],

    stores: [
         'order.OrderProductStore',
         'order.ProductStore',
         'order.ClientStore',
         'order.ClientAddressStore',
         
         'reports.OrderPeriodStatStore',
         'reports.ProductPeriodStatStore',
         'reports.IngredientPeriodStatStore',
         
         'OrderTreeStore',
         'OrderStore',
         'SiteOrderStore',
	     'CategoryStore',
	     'CategoryTypeStore',
	     'CityStore',
	     'DeliveryPriceStore',
	     
	     'clients.InformationClientsStore',
	     'clients.InformationAddressStore',
	     'clients.InformationListClientsStore',
	     'clients.IntegrationClientsStore',
	     'clients.IntegrationClientsAddressStore',
	     'clients.IntegrationAddressClientsStore',
	     'clients.IntegrationAddressListStore',
	    

	     'InfoClientsAddresStore',
	     'InformationClientsAddressStore',
	     'IntegrationClientsAddresStore',
	     'PromotionStore',
	     'UnitStore',
	     'IngredientStore',
	     'ProductStore',
	     'ProductCostingStore',
	     'ProductTypeStore',
	     'ProductOwnerTypeStore',
         'WarehouseItemStore',
         'WarehouseIncomeTypeStore',
         'WarehouseIncomeStore',
         'WarehouseOutcomeStore',
         'WarehouseOutcomeTypeStore',
    ],
    
    launch: function () {
    	/*Ext.create('Ext.container.Viewport', {});*/
    }
});
