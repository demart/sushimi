Ext.define('SushimiConsole.view.operator.orders.window.CourierWindow', {
    extend: 'Ext.window.Window',
    xtype: 'courier-order-window',
    
    reference: 'courierOrderWindow',
    controller: 'operator.orders.ordersTwoList',
    alias: 'widget.operator.orders.courierWindow',
    
    requires: [
    ],
    
    title: 'Список курьеров',
    width: 230,
   // minWidth: 600,
 //   minHeight: 500,
    layout: 'fit',
    resizable: true,
    id: 'r',
    maximized: false,
    maximizable: true,
    modal: true,
    //defaultFocus: 'orderType',
    closeAction: 'hide',
    scroll: true,
    
    items: [
            {
    		reference: 'couriers',
    		xtype: 'grid',
    		viewConfig: { stripeRows: true },
            store: 'operator.CourierStore',
            id: 'courierListId',
            minHeight: 100,
            maxHeight: 400,
        	stateful: false,
        	border: true,
        	columns: [
    			//{text: "№", dataIndex: 'id', width: 50},
                {text: "Пожалуйста выберите курьера", dataIndex: 'name' , flex: 2},
        	],
        	
        	 listeners: {
            	 viewready: function(){
          	       this.store.load();
          	       this.view.refresh();
          	    }
            }
    	}, 
    	
        
       
    	 ],
    	 
        
      
    buttons: [{
    	id: 'selectCourierBtn',
        text: 'Выбрать курьера',
        hidden: false,
        handler: 'onSelectCourierClick'
    }
    
    ],
    

    
});