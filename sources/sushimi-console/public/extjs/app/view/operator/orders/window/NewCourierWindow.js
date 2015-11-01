Ext.define('SushimiConsole.view.operator.orders.window.NewCourierWindow', {
    extend: 'Ext.window.Window',
    xtype: 'new-courier-order-window',
    
    reference: 'newCourierOrderWindow',
    controller: 'operator.orders.ordersTwoList',
    alias: 'widget.operator.orders.newCourierWindow',
    
    requires: [
    ],
    
    title: 'Список курьеров',
    width: 230,
   // minWidth: 600,
 //   minHeight: 500,
    layout: 'fit',
    resizable: true,
    id: 'newCourierList',
    maximized: false,
    maximizable: true,
    modal: true,
    //defaultFocus: 'orderType',
    closeAction: 'hide',
    scroll: true,
    
    items: [
            {
    		reference: 'courierNew',
    		xtype: 'grid',
    		viewConfig: { stripeRows: true },
            store: 'operator.CourierStore',
            id: 'courierListFormId',
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
    	 
        
      
    buttons: [
    {
    	id: 'selectNewCourierBtn',
        text: 'Изменить курьера',
        handler: 'onSelectNewCourierClick',
        hidden: false,
    }
    
    ],
    

    
});