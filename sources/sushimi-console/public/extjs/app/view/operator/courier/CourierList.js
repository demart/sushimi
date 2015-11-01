Ext.define('SushimiConsole.view.operator.courier.CourierList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'operator.courier.courierList',
    alias: 'operator.courier.courierList',
    xtype: 'courierList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.operator.courier.CourierListController',

	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Список курьеров',
    store: 'operator.CourierStore',
	stateful: false,
	
	tbar: [],
	
	columns: [
			{text: "ID", dataIndex: 'id', width: 50},
			{text: "Курьер", dataIndex: 'name' , width: 110},
			{text: "Заказы", dataIndex: 'ordersOnDelivery', flex: 1},

            
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