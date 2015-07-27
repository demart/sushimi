Ext.define('SushimiConsole.view.order.SiteOrderList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'order.siteOrderList',
    alias: 'order.siteOrderList',
    xtype: 'siteOrderList',
    requires: [
   		'Ext.MessageBox',
   		'Ext.data.*', 
   	    'Ext.grid.*',
   		'Ext.toolbar.Paging',
   		
   		'SushimiConsole.view.order.SiteOrderListController',
   		
   		'SushimiConsole.view.order.window.PreviewSiteOrderWindowController',
   		'SushimiConsole.view.order.window.PreviewSiteOrderWindow',
   		
   		'SushimiConsole.view.order.window.CancelSiteOrderWindow',   		
	],

	viewConfig: {
        stripeRows: true
    },
    store: 'SiteOrderStore',
	stateful: false,
	
	
    listeners: {
    	select: function(obj, record, index, eOpts) {
    		this.controller.selectOrderRow(obj, record, index, eOpts);
    	},
    },
	
	tbar: [{
		reference: 'previewSiteOrderBtn',
        text: 'Просмотр заказа',
        handler: 'previewOrder',
        hidden: false,
    }, {
    	reference: 'registerSiteOrderBtn',
        text: 'Оформить заказ',
        handler: 'registerSiteOrder',
        hidden: true,
    }, {
    	reference: 'cancelSiteOrderBtn',
    	text: 'Отменить заказ',
        handler: 'cancelSiteOrder',
        hidden: true,
    }, '-', {
    	reference: 'refreshOrderGridBtn',
        text: 'Обновить',
        handler: 'refreshOrderGrid',
    }],
	
	columns: [
			{text: "№", dataIndex: 'id', width: 60},
			{text: "Клиент", dataIndex: 'clientName' , flex: 3},
			{text: "Телефон", dataIndex: 'clientPhone',  width:100},
            {text: "Сумма", dataIndex: 'sum', width:80, align: 'right',
				renderer: function(val) {
					return Ext.util.Format.number(val, '0,000').replace(',', ' ') + ' тнг.';
				}
            },
            {text: "Статус", dataIndex: 'status', width:100, 
            	renderer: function(val) {
					if (val == 'NONE') return 'Неизвестно';
					if (val == 'RECEIVED') return 'Получен';
					if (val == 'REGISTERED') return 'Обработан';
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
                        	return '<p><b style="color:red;">Причина отмены:</b> ' + v + '</p>';
                        return '';
                    }
                }
		),
    }],
    
    bbar:  {
    	xtype: 'pagingtoolbar',
        store: 'SiteOrderStore',
        displayInfo: true,
        displayMsg: 'Показано записей {0} - {1} из {2}',
        emptyMsg: "Нет данных для отображения",
        items:[]
    },
  
    initComponent: function() {
        this.callParent(arguments);
    },

});