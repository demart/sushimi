Ext.define('SushimiConsole.view.operator.orders.OrdersActionMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'action-menu',
    
    controller: 'operator.orders.ordersTwoList',
    
    requires: [
                'Ext.menu.Menu',
               	'SushimiConsole.view.operator.orders.OrdersTwoListController',
               ],
    
    reference: 'ordersActionMenu',
    id: 'row',
    
    minHeight: 50,
    maxHeight: 130,
    minWidth: 100,
    maxWidht: 240,


    items: [
            {
            	text: 'Оформить заказ',
            	hidden: true,
            	id: 'newSiteOrderId',
            	//reference: 'newSiteOrderId',
            	icon: '/public/images/new.png',
            	handler: 'newSiteOrder'
            	
            },
            {
            	text: 'Отменить заказ',
            	hidden: true,
            	id: 'cancelSiteOrderId',
            	icon: '/public/images/cancel.png',
            	handler: 'cancelSiteOrder'
            },
            {
            	text: 'Просмотреть заказ',
            	id: 'preview',
            	handler: 'previewOrder',
            	icon: 'public/images/ordering.png'
            },
           {
        	   text: 'Отправить заказ в работу',
        	   hidden: true,
        	   id: 'sendToWorkId',
        	   icon: 'public/images/sendToProgress.png',
        	   handler: 'sendOrderToWork'
           },
           {
        	   text: 'Отменить заказ',
        	   hidden: true,
        	   id: 'cancelOrderId',
        	   icon: '/public/images/cancel.png',
        	   handler: 'cancelOrder'
           },
           {
        	   text: 'Отправить заказ в очередь на Доставку',
        	   hidden: true,
        	   id: 'sendToWaitDeliveryOrderId',
        	   icon: 'public/images/waitDelivery.png',
        	   handler: 'sendOrderToWaitingForDelivery'
           },
           {
        	   text: 'Отправить заказ на доставку',
        	   hidden: true,
        	   id: 'sendToDeliveryOrderId',
        	   icon: 'public/images/onDelivery.png',
        	   handler: 'sendCourier'
           },
           {
        	   text: 'Завершить заказ',
        	   hidden: true,
        	   id: 'completeOrderId',
        	   icon: 'public/images/yes.png',
        	   handler: 'completeOrder'
           },
           {
        	   text: '',
        	   hidden: true,
        	   id: 'courierNameId',
        	   icon: 'public/images/courier.png',
        	   handler: 'courierInfo'
           },
           {
        	   text: 'Изменить курьера',
        	   hidden: true,
        	   id: 'newCourier',
        	   handler: 'selectNewCourier'
           }

           
           
           ],
initComponent: function() {
    this.callParent(arguments);
	 console.log('gggg'); 
},
});