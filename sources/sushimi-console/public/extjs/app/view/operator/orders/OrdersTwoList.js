Ext.define('SushimiConsole.view.operator.orders.OrdersTwoList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'operator.orders.ordersTwoList',
    alias: 'operator.orders.ordersTwoList',
    xtype: 'ordersTwoList',
    requires: [
   		   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   		'Ext.grid.plugin.RowExpander',
   		'Ext.toolbar.Paging',
   		'Ext.ux.GMapPanel',
   		
   	    'SushimiConsole.view.operator.orders.OrdersTwoListController',
  	    'SushimiConsole.view.operator.orders.OrdersActionMenu',
  		'SushimiConsole.view.operator.orders.window.PreviewOrderWindow',
   		'SushimiConsole.view.operator.orders.window.PreviewOrderWindowController',
  		'SushimiConsole.view.operator.orders.window.CancelOrderWindow',
   		'SushimiConsole.view.operator.orders.window.CancelSiteOrderWindow',
   		'SushimiConsole.view.order.window.NewOrderWindow',
   		'SushimiConsole.view.operator.orders.window.CourierWindow',
   		'SushimiConsole.view.operator.orders.window.CourierMapWindow',
   		'SushimiConsole.view.operator.orders.window.NewCourierWindow',
   		],

	viewConfig: {
        stripeRows: true,
        loadMask: false,
        getRowClass: function(record, rowIndex, rowParams, store) {
        	  if (record.get('typeGrouping') == "A_NEW") return 'operatorNewOrder';
        	 }
    },
	//title: 'Текущие заказы',
    store: 'operator.OrdersStore',
    id: 'ordersAll',
    loadMask: false,
	stateful: false,
	rowMenu: null,
	
	tbar: [
           {
        	   text: 'Отобразить все заказы',
        	   hidden: false,
        	   id: 'onOrdersId',
        	   icon: 'public/images/orders.png',
        	   handler: 'onAllOrders'
           },
           {
        	   text: 'Отображать только текущие заказы',
        	   hidden: true,
        	   id: 'offOrdersId',
        	   icon: 'public/images/orders.png',
        	   handler: 'offAllOrders'
           },
	       ],

	columns: [
				{text: "Номер", dataIndex: 'orderNumber' , 
					renderer : function (value, metaData, record, row, col, store, gridView) {
						if (record.get('typeGrouping') == "A_NEW") return '<b><font color="3366FF">' + value + '</font></b>';
						else return value;
					},
					width: 100},
			
				{text: "Доставка", dataIndex: 'deliveryDate', xtype: 'datecolumn',
						renderer : function (value, metaData, record, row, col, store, gridView) {
							if (record.get('typeGrouping') == "A_NEW") return '<b><font color="3366FF">' + Ext.Date.format(value, "d.m  H.i") + '</font></b>';
							else return Ext.Date.format(value, "d.m  H.i");
						},
						 width: 100},
				
				{text: "Осталось", dataIndex: 'timer', 
					
					renderer : function (value, metaData, record, row, col, store, gridView) {
						if (record.get('status') == 1 && record.get('typeGrouping') != "A_NEW") return '<b>'+value+'</b>';
						else if (record.get('typeGrouping') == "A_NEW") return '<b><font color="3366FF">' + value + '</font></b>';
						else return value;
					},
					
					width: 90},
	            
				{text: "", dataIndex: 'type', width: 70,
	            	renderer : function(value, metaData, record, row, col, store, gridView) {
	            		if (value == "DELIVERY") {
	            			var string = '<img src="/public/images/delivery.png" title="Доставка">';
	            			if (record.get('comment') == "") {
	            				//string = string + '<img src="/public/images/no.png" title="Без комментариев">';
	            				if (record.get('source') == "WEB")
	            					string = string + '<img src="/public/images/Website.png" style="margin:0 0 0 29px;" title="Заказ с сайта">';
	            				else if (record.get('source') == "MOBILE")
	            					string = string + '<img src="/public/images/mobile.png" style="margin:0 0 0 29px;" title="Заказ из мобильного приложения">';
	            				else
	            					string = string + '<img src="/public/images/call_center.png" style="margin:0 0 0 29px;" title="Заказ с Call-центра">';
	            			}
	            			
	            			else if (record.get('comment') != "") {
	            				string = string + '<img src="/public/images/yes.png" style="margin:0 0 0 8px;" title="Комментарий: ' + record.get('comment') + '">';
	            				if (record.get('source') == "WEB")
	            					string = string + '<img src="/public/images/Website.png" style="margin:0 0 0 8px;" title="Заказ с сайта">';
	            				else if (record.get('source') == "MOBILE")
	            					string = string + '<img src="/public/images/mobile.png" style="margin:0 0 0 8px;" title="Заказ из мобильного приложения">';
	            				else
	            					string = string + '<img src="/public/images/call_center.png" style="margin:0 0 0 8px;" title="Заказ с Call-центра">';
	            			}
	            			return string;
	            		}
	            		
	            		else if (value == "SELF_SERVICE") {
	            			var string = '<img src="/public/images/self_service.png" title="Самовывоз">';
	            			if (record.get('comment') == "") {
	            				//string = string + '<img src="/public/images/no.png" title="Без комментариев">';
	            				if (record.get('source') == "WEB")
	            					string = string + '<img src="/public/images/Website.png" style="margin:0 0 0 29px;" title="Заказ с сайта">';
	            				else if (record.get('source') == "MOBILE")
	            					string = string + '<img src="/public/images/mobile.png" style="margin:0 0 0 29px;" title="Заказ из мобильного приложения">';
	            				else
	            					string = string + '<img src="/public/images/call_center.png" style="margin:0 0 0 29px;" title="Заказ с Call-центра">';
	            			}
	            			
	            			else if (record.get('comment') != "") {
	            				string = string + '<img src="/public/images/yes.png" style="margin:0 0 0 8px;" title="Комментарий: ' + record.get('comment') + '">';
	            				if (record.get('source') == "WEB")
	            					string = string + '<img src="/public/images/Website.png" style="margin:0 0 0 8px;" title="Заказ с сайта">';
	            				else if (record.get('source') == "MOBILE")
	            					string = string + '<img src="/public/images/mobile.png" style="margin:0 0 0 8px;" title="Заказ из мобильного приложения">';
	            				else
	            					string = string + '<img src="/public/images/call_center.png" style="margin:0 0 0 8px;" title="Заказ с Call-центра">';
	            			}
	            			return string;
	            		}
	            		
	            		else if (value == "DELIVERY_IN_TIME") {
	            			var string = '<img src="/public/images/delivery_in_time.png" title="Доставка ко времени">';
	            			if (record.get('comment') == "") {
	            				//string = string + '<img src="/public/images/no.png" title="Без комментариев">';
	            				if (record.get('source') == "WEB")
	            					string = string + '<img src="/public/images/Website.png" style="margin:0 0 0 29px;" title="Заказ с сайта">';
	            				else if (record.get('source') == "MOBILE")
	            					string = string + '<img src="/public/images/mobile.png" style="margin:0 0 0 29px;" title="Заказ из мобильного приложения">';
	            				else
	            					string = string + '<img src="/public/images/call_center.png" style="margin:0 0 0 29px;" title="Заказ с Call-центра">';
	            			}
	            			
	            			else if (record.get('comment') != "") {
	            				string = string + '<img src="/public/images/yes.png" style="margin:0 0 0 8px;" title="Комментарий: ' + record.get('comment') + '">';
	            				if (record.get('source') == "WEB")
	            					string = string + '<img src="/public/images/Website.png" style="margin:0 0 0 8px;" title="Заказ с сайта">';
	            				else if (record.get('source') == "MOBILE")
	            					string = string + '<img src="/public/images/mobile.png" style="margin:0 0 0 8px;" title="Заказ из мобильного приложения">';
	            				else
	            					string = string + '<img src="/public/images/call_center.png"  style="margin:0 0 0 8px;" title="Заказ с Call-центра">';
	            			}
	            			return string;
	            		}
	                },			
	            },
				{text: "Имя клиента", dataIndex: 'clientName' ,
					renderer : function (value, metaData, record, row, col, store, gridView) {
						if (record.get('typeGrouping') == "A_NEW") return '<b><font color="3366FF">' + value + '</font></b>';
						else return value;
					},
					flex: 1},
	            {text: "Телефон", dataIndex: 'clientPhone', 
						renderer : function (value, metaData, record, row, col, store, gridView) {
							if (record.get('typeGrouping') == "A_NEW") return '<b><font color="3366FF">' + value + '</font></b>';
							else return value;
						},
						width:120},
	            {text: "Адрес", dataIndex: 'clientAddress', 
							renderer : function (value, metaData, record, row, col, store, gridView) {
								if (record.get('typeGrouping') == "A_NEW") return '<b><font color="3366FF">' + value + '</font></b>';
								else return value;
							},
							flex: 2},
				],
	
	
	
    features: [{
	     ftype: 'grouping',
	     groupHeaderTpl: [
	                   
	                      '{name:this.formatName} ({children.length} шт.)</b>',
	                      {
	                      formatName: function(name) {
	                    	if (name == 'A_NEW') return '<b><font color="red">Новые заказы</font>';
	                    	else if (name == 'B_REGISTERED') return '<b>Зарегистрированные заказы';
	                    	else if (name == 'C_IN_PROGRESS') return '<b>Заказы на кухне';
	                    	else if (name == 'D_WAITING_FOR_DELIVERY') return '<b>Заказы ожидающие доставки';
	                    	else return '<b>Заказы на доставке';
	                      }
	                      }
	               ],
	     enableNoGroups:true
	}],
		
    initComponent: function() {
        this.callParent(arguments);
    },


	listeners: {
		
	
		itemcontextmenu: function(view, record, item, index, e){
			e.stopEvent();
			
			if (this.rowMenu == null)
				this.rowMenu = new SushimiConsole.view.operator.orders.OrdersActionMenu();
			
			 if (record.get('state') == "REGISTERED") {
				 Ext.getCmp('newSiteOrderId').setVisible(false);
				 Ext.getCmp('cancelSiteOrderId').setVisible(false);
				 Ext.getCmp('sendToWorkId').setVisible(true);
				 Ext.getCmp('cancelOrderId').setVisible(true);
				 Ext.getCmp('sendToDeliveryOrderId').setVisible(false);
				 Ext.getCmp('completeOrderId').setVisible(false);
				 Ext.getCmp('courierNameId').setVisible(false);
				 Ext.getCmp('sendToWaitDeliveryOrderId').setVisible(false);
				 Ext.getCmp('newCourier').setVisible(false);
				 this.rowMenu.showAt(e.getXY());
			 }
			 
			 else if (record.get('state') == "WAITING_FOR_DELIVERY") {
				 Ext.getCmp('newSiteOrderId').setVisible(false);
				 Ext.getCmp('cancelSiteOrderId').setVisible(false);
				 Ext.getCmp('sendToWorkId').setVisible(false);
				 Ext.getCmp('sendToDeliveryOrderId').setVisible(true);
				 Ext.getCmp('cancelOrderId').setVisible(true);
				 Ext.getCmp('completeOrderId').setVisible(false);
				 Ext.getCmp('courierNameId').setVisible(false);
				 Ext.getCmp('sendToWaitDeliveryOrderId').setVisible(false);
				 Ext.getCmp('newCourier').setVisible(false);
				 this.rowMenu.showAt(e.getXY());
			 }
			 
			 else if (record.get('state') == "NONE") {
				 Ext.getCmp('newSiteOrderId').setVisible(true);
				 Ext.getCmp('cancelSiteOrderId').setVisible(true);
				 Ext.getCmp('sendToWorkId').setVisible(false);
				 Ext.getCmp('sendToDeliveryOrderId').setVisible(false);
				 Ext.getCmp('cancelOrderId').setVisible(false);
				 Ext.getCmp('completeOrderId').setVisible(false);
				 Ext.getCmp('courierNameId').setVisible(false);
				 Ext.getCmp('sendToWaitDeliveryOrderId').setVisible(false);
				 Ext.getCmp('newCourier').setVisible(false);
				 this.rowMenu.showAt(e.getXY());
			 }
			 
			 else if (record.get('state') == "IN_PROGRESS") {
				 Ext.getCmp('newSiteOrderId').setVisible(false);
				 Ext.getCmp('cancelSiteOrderId').setVisible(false);
				 Ext.getCmp('sendToWorkId').setVisible(false);
				 Ext.getCmp('sendToWaitDeliveryOrderId').setVisible(true);
				 Ext.getCmp('sendToDeliveryOrderId').setVisible(false);
				 Ext.getCmp('cancelOrderId').setVisible(true);
				 Ext.getCmp('completeOrderId').setVisible(false);
				 Ext.getCmp('courierNameId').setVisible(false);
				 Ext.getCmp('newCourier').setVisible(false);				 
				 this.rowMenu.showAt(e.getXY());
			 }
			 
			 else if (record.get('state') == "ON_DELIVERY") {
				 Ext.getCmp('newSiteOrderId').setVisible(false);
				 Ext.getCmp('cancelSiteOrderId').setVisible(false);
				 Ext.getCmp('sendToWaitDeliveryOrderId').setVisible(false);
				 Ext.getCmp('sendToWorkId').setVisible(false);
				 Ext.getCmp('sendToDeliveryOrderId').setVisible(false);
				 Ext.getCmp('cancelOrderId').setVisible(true);
				 Ext.getCmp('completeOrderId').setVisible(true);
				 Ext.getCmp('courierNameId').setText("Курьер: " + record.get('courierName'));
				 Ext.getCmp('courierNameId').setVisible(true);
				 Ext.getCmp('newCourier').setVisible(true);
				 this.rowMenu.showAt(e.getXY()); 
			 }
	    },

	    viewready: function(){
	       this.store.load();
	       this.view.refresh();
	    }
	 },

});