Ext.define('SushimiConsole.view.order.window.ProductWindow', {
    extend: 'Ext.window.Window',
    xtype: 'create-new-order-product-window',
    
    id: 'newOrderProductGridWindow',
    reference: 'newOrderProductWindow',
    controller: 'order.window.newOrderWindow',

    title: 'Продукция',
    width: 600,
    minWidth: 200,
    minHeight: 400,
    layout: 'fit',
    resizable: true,
    maximized: false,
    modal: true,
    closeAction: 'hide',
    defaultFocus: 'productSearchTextField',
    tbar: [ 
        {
			id: 'productSearchTextField',
			xtype: 'textfield',
			fieldLabel: 'Поиск',
			enableKeyEvents: true,
			listeners: {
				change: function(field, newValue, oldValue, eOpts ) {
					var plugin = Ext.getCmp('newOrderProductGrid').filters;
					var filter = plugin.cmp.columns[1].filter;
					filter.setValue(newValue);
				}
			}
    	}
    ],
    items: [
        {
			fieldLabel: 'Продукция',
			id: 'newOrderProductGrid',
			reference: 'newOrderProductGrid',
			xtype: 'grid',
			viewConfig: { stripeRows: true },
	        store: 'order.ProductStore',
	    	stateful: false,
	    	height: 300,
	    	plugins: 'gridfilters',
	    	columns: [
				{text: "№", dataIndex: 'id', width: 50},
	            {text: "Продукт", dataIndex: 'name' , flex: 2, 
					filter: {
		                type: 'string',
		                active: true,
		            }
				},
	            {text: "Категория", dataIndex: 'categoryName', width: 100},
	            {text: "Цена", dataIndex: 'cost', width: 100},
	            {text: "Цена на бар", dataIndex: 'barCost', width: 100},
	    	],
		}, 
	],

	bbar: [
       {
    	   id: 'newOrderProductCountField',
    	   xtype: 'numberfield',
    	   fieldLabel: 'Кол-во',
    	   name: 'basic',
    	   value: 1,
    	   minValue: 1,
    	   maxValue: 125
		},
		{ text: 'Добавить в заказ', handler: 'addProductToOrder' },
	],
});