Ext.define('SushimiConsole.view.operator.orders.delivered.DeliveredOrdersListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operator.orders.delivered.deliveredOrdersList',
    

    
    orderHistory: function () {
    	var store = this.view.getStore();
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	console.log (selectedRecord.data.id);
      	Ext.Ajax.request({
    	    url: '/operator/order/history?orderId=' + selectedRecord.data.id,
    	    method: 'POST',          
    	    success: function(response, conn, options, eOpts) {
    	    	var json = Ext.util.JSON.decode(response.responseText);
    	    	if (json.success) {
    	
    	    		Ext.MessageBox.show({
  	    	           title: 'История заказа',
  	    	           msg: json.message,
  	    	           buttons: Ext.MessageBox.OK,
  	    	           icon: Ext.MessageBox.WARNING
  	    	       });
    	    	} 
    	    },                                    
 
    	});
    },
    
    
    // Обновить стор
    onRefreshStore : function() {
    	this.view.getStore().reload();
    },
    

    
    previewOrder: function() {
    	var selectedRecord = this.view.getSelectionModel().getSelection()[0];
    	if (selectedRecord) {
    		//console.log(Ext.getCmp('mainViewportId'));
    		var win = Ext.getCmp('mainViewportId').lookupReference('previewOrderWindow');
            if (!win) {
                win = new SushimiConsole.view.operator.orders.window.PreviewOrderWindow();
                Ext.getCmp('mainViewportId').add(win);
            }
    		win.controller.previewOrder(selectedRecord);
    	}
    },
    
});