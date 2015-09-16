Ext.define('SushimiConsole.view.order.OrderList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'order.orderList',
    alias: 'order.orderList',
    xtype: 'orderList',
    requires: [
   		'Ext.MessageBox',
   		'Ext.grid.plugin.RowExpander',
   		'Ext.toolbar.Paging',
   		
   		'SushimiConsole.view.order.OrderListController',
   		
   		'SushimiConsole.view.order.window.CancelOrderWindow',
   		
   		'SushimiConsole.view.order.window.PreviewOrderWindowController',
   		'SushimiConsole.view.order.window.PreviewOrderWindow',
	],

	
    listeners: {
    	select: function(obj, record, index, eOpts) {
    		this.controller.selectOrderRow(obj, record, index, eOpts);
    	},
    },
	
	viewConfig: {
        stripeRows: true
    },
    
    store: 'OrderStore',
	stateful: false,
	autoDestroy: true,
	
	tbar: [{
		reference: 'previewOrderBtn',
        text: 'Просмотр заказа',
        handler: 'previewOrder',
        hidden: false,
    },{
    	reference: 'printOrderBtn',
        text: 'Печать чека',
        handler: 'printOrder',
        hidden: true,
    },{
    	reference: 'sendOrderToWorkBtn',
        text: 'Отправить в работу',
        handler: 'sendOrderToWork',
        hidden: true,
    },{
    	reference: 'sendOrderToDeliveryBtn',
        text: 'Отправить на доставку',
        handler: 'sendOrderToDelivery',
        hidden: true,
    },{
    	reference: 'completeOrderBtn',
        text: 'Завершить заказ',
        handler: 'completeOrder',
        hidden: true,
    },{
    	reference: 'cancelOrderBtn',
        text: 'Отменить заказ',
        handler: 'cancelOrder',
        hidden: true,
    }, '-', {
    	reference: 'refreshOrderGridBtn',
        text: 'Обновить',
        handler: 'refreshOrderGrid',
    }],

    
	columns: [
			{text: "№", dataIndex: 'orderNumber', width: 50},
			{text: "Клиент", dataIndex: 'clientName' , flex: 1},
			{text: "Телефон", dataIndex: 'clientPhone',  width:130},
			{text: "Сумма", dataIndex: 'sum', width:85, align: 'right',
				renderer: function(val) {
					return Ext.util.Format.number(val, '0,000').replace(',', ' ') + ' тнг.';
				}
            },
            {text: "Статус", dataIndex: 'state', width:100, 
            	renderer: function(val) {
					if (val == 'NONE') return 'Неизвестно';
					if (val == 'REGISTERED') return 'Ожидает';
					if (val == 'IN_PROGRESS') return 'В работе';
					if (val == 'ON_DELIVERY') return 'На доставке';
					if (val == 'DELIVERED') return 'Завершен';
					if (val == 'RETURNED') return 'Возврат';
					if (val == 'CANCELED') return 'Отменен';
					return val;
				}
            },
            {text: "Тип", dataIndex: 'type', width:110, 
            	renderer: function(val) {
					if (val == 'BAR') return 'На бар';
					if (val == 'DELIVERY') return 'Доставка';
					if (val == 'DELIVERY_IN_TIME') return 'Ко времени';
					if (val == 'SELF_SERVICE') return 'Самовывоз';
					return val;
				}
            },
            {text: "Время заказа", dataIndex: 'orderDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 140},
			{text: "Время доставки", dataIndex: 'deliveryDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 140},
	],
	plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
        		'<p><b>Адрес:</b> {clientAddress}</p>',
        		'{reason:this.isExistReason}',
        		{
                    isExistReason: function(v){
                        if (v != null && v.length > 0)
                        	return '<p><b style="color:red;">Причина:</b> ' + v + '</p>';
                        return '';
                    }
                }
		),
    }],
    
    bbar: {
    	xtype: 'pagingtoolbar',
        store: 'OrderStore',
        displayInfo: true,
        displayMsg: 'Показано записей {0} - {1} из {2}',
        emptyMsg: "Нет данных для отображения",
        items:[]
    },
    
    initComponent: function() {
        this.callParent(arguments);
    },
    
});