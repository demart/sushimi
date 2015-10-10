Ext.define('SushimiConsole.view.operator.currentorders.CurrentOrdersList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'operator.currentorders',
    alias: 'widget.operator.CurrentOrdersList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.operator.currentorders.CurrentOrdersListController',
   	    'SushimiConsole.view.operator.currentorders.CurrentOrdersEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Текущие заказы',
    store: 'operator.CurrentOrdersStore',
	stateful: false,
	
	tbar: [{
        text: 'Добавить',
        handler: 'showAddWindow'
    }, {
        text: 'Изменить',
        handler: 'showEditWindow'
    },{
        text: 'Удалить',
        handler: 'onDeleteRecord',
    },{
        text: 'Обновить',
        handler: 'onRefreshStore',
    }],
	
	columns: [
		//	{text: "ID", dataIndex: 'id', width: 50},
			{text: "Номер заказа", dataIndex: 'orderNumber' , width: 110},
			{text: "Дата доставки", dataIndex: 'deliveryDateKitchen', width: 150},
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