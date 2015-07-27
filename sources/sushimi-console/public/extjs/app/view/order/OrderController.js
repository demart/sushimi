Ext.define('SushimiConsole.view.order.OrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.order.order',
    
    // обновляет дерево категорий
    treeRefreshClick : function() {
		var tree = this.lookupReference('treeOrderPanel');
		tree.store.reload();
    },
    
    // Загружает список заказов выбранного раздела
    selectOrderTreeNode : function(obj, record, index, eOpts ) {    	
    	var orderGrid = this.lookupReference('orderList');
    	var siteOrderGrid = this.lookupReference('siteOrderList');
    	
    	if (record.data.id < 50) {
    		// Заказы
    		orderGrid.setVisible(true);
    		siteOrderGrid.setVisible(false);
    		orderGrid.store.proxy.api.read = 'rest/order/store/read?state=' + record.getData().state;
    		orderGrid.store.reload();
    		
    	} else {
    		// Заказы с сайта
    		orderGrid.setVisible(false);
    		siteOrderGrid.setVisible(true);
    		
    		siteOrderGrid.store.proxy.api.read = 'rest/order/site/store/read?status=' + record.getData().status;
    		siteOrderGrid.store.reload();
    	}
    	
    }
    
});