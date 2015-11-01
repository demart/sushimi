Ext.define('SushimiConsole.view.operator.orders.ActionCourierMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'action-courier-menu',
    
    controller: 'operator.orders.ordersTwoList',
    
    requires: [
                'Ext.menu.Menu',
               	'SushimiConsole.view.operator.orders.OrdersTwoListController',
               ],
    
   // reference: 'ordersActionMenu',
    id: 'courierTimerMenu',
    
    minHeight: 50,
    maxHeight: 130,
    minWidth: 100,
    maxWidht: 240,


    items: [
            {
            	text: 'Показать маршрут',
            	//hidden: true,
            	id: 'fiveMinute',
            	//reference: 'newSiteOrderId',
            	//icon: '/public/images/new.png',
            	handler: 'courierAllPoints'
            	
            }
                     
           
           ],
initComponent: function() {
    this.callParent(arguments);
	 console.log('gggg'); 
},
});