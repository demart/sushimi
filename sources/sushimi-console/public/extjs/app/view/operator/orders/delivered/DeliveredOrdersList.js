Ext.define('SushimiConsole.view.operator.orders.delivered.DeliveredOrdersList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'operator.orders.delivered.deliveredOrdersList',
    alias: 'operator.orders.delivered.deliveredOrdersList',
    xtype: 'deliveredOrdersList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.operator.orders.delivered.DeliveredOrdersListController',
   	   // 'SushimiConsole.view.operator.orders.current.CurrentOrdersEditWindow',
   	    
   		'SushimiConsole.view.operator.orders.window.PreviewOrderWindow',
   		'SushimiConsole.view.operator.orders.window.PreviewOrderWindowController',
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Выполненные заказы',
    store: 'operator.DeliveredOrdersStore',
	stateful: false,
	
	tbar: [{
        text: 'Просмотр заказа',
        handler: 'previewOrder'
    },
    {
        text: 'Просмотреть историю',
        handler: 'orderHistory'
    }],
	
	columns: [
		//	{text: "ID", dataIndex: 'id', width: 50},
			{text: "Номер заказа", dataIndex: 'orderNumber' , width: 110},
			{text: "Дата доставки", dataIndex: 'deliveryDate', xtype: 'datecolumn', format: 'd.m.Y H.i.s', width: 150},
			{text: "Осталось", dataIndex: 'timer', width: 150},
            {text: "Статус заказа", dataIndex: 'state', width: 100,
            	renderer : function(val) {
                    if (val == 'REGISTERED') return 'Зарегистрирован';
                    if (val == 'IN_PROGRESS') return 'Готовится на кухне';
                    if (val == 'WAITING_FOR_DELIVERY') return 'Ожидает курьера';
                    if (val == 'ON_DELIVERY') return 'На доставке';
                },			
            },
			{text: "Имя клиента", dataIndex: 'clientName' , flex: 1},
            {text: "Телефонный номер", dataIndex: 'clientPhone', flex:1},
            {text: "Адрес", dataIndex: 'clientAddress', flex: 1},
            {text: "Тип заказа", dataIndex: 'type', width:100, 
            	renderer : function(val) {
                    if (val == 'DELIVERY') return 'Доставка';
                    if (val == 'DELIVERY_IN_TIME') return 'Доставка ко времени';
                    if (val == 'SELF_SERVICE') return 'Самовывоз';
                },			
            },
            {text: "Заказ с", dataIndex: 'source', width: 100,
            	renderer : function(val) {
                    if (val == 'CALL_CENTER') return 'Call center';
                    if (val == 'WEB') return 'Сайт';
                    if (val == 'MOBILE') return 'Мобильный';
                    if (val == 'SMART_TV') return 'Smart TV';
                },			
            },
            
			//{text: "Дата создания", dataIndex: 'createdDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 150},
			//{text: "Дата изменения", dataIndex: 'modifiedDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 150},
	],
		
    initComponent: function() {
        this.callParent(arguments);
    },


	listeners: {
	    viewready: function(){
	       this.store.load();
	       this.view.refresh();
	    }
	 },

});