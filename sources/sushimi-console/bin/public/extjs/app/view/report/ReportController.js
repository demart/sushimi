Ext.define('SushimiConsole.view.report.ReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.report.report',
    
    
    onRenderStatFormClick: function() {
    	console.log("Clicked");
    	var dateFrom = Ext.getCmp('dailyStatFromDateField');
    	var dateTo = Ext.getCmp('dailyStatToDateField');
    	console.log("from: " + dateFrom.getValue());
    	console.log("to: " + dateTo.getValue());
    	
    	// Статистика по заказам за период
    	var orderPeriodStatGrid = Ext.getCmp('orderPeriodStatGrid');
    	orderPeriodStatGrid.store.proxy.api.read = 'rest/reports/orderPeriodStat/store/read?from=' + dateFrom.getRawValue() + '&to=' + dateTo.getRawValue();
    	orderPeriodStatGrid.getStore().reload();
    	
    	// Статистика по продуктам за период
    	var orderPeriodStatGrid = Ext.getCmp('productsPeriodStatGrid');
    	orderPeriodStatGrid.store.proxy.api.read = 'rest/reports/productPeriodStat/store/read?from=' + dateFrom.getRawValue() + '&to=' + dateTo.getRawValue();
    	orderPeriodStatGrid.getStore().reload();

    	// Статистика по ингредиентам за период
    	var orderPeriodStatGrid = Ext.getCmp('ingredientsPeriodStatGrid');
    	orderPeriodStatGrid.store.proxy.api.read = 'rest/reports/ingredientPeriodStat/store/read?from=' + dateFrom.getRawValue() + '&to=' + dateTo.getRawValue();
    	orderPeriodStatGrid.getStore().reload();
    	
    }

});