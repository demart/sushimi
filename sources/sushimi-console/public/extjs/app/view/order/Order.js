Ext.define('SushimiConsole.view.order.Order' ,{
    extend: 'Ext.panel.Panel',
    controller: 'order.order',
    alias: 'widget.order.Order',

    requires: [
   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   		'Ext.grid.plugin.RowExpander',
   		'Ext.toolbar.Paging',
   		'Ext.tree.Panel',
   		'Ext.grid.column.Date',
   		
   		'SushimiConsole.view.order.OrderController',
   		'SushimiConsole.view.order.OrderList',
   		
   		'SushimiConsole.view.order.SiteOrderListController',
   		'SushimiConsole.view.order.SiteOrderList',
	],
	
	layout: 'border',
	bodyBorder: true,
	autoDestroy: true,
	
	defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },
    
    listeners: {
    },
    
    items: [{
    	title: 'Дерево',
    	region:'west',
        floatable: false,
        margin: '5 0 0 0',
        width: 350,
        minWidth: 250,
        maxWidth: 400,
        tools: [
                { 
                	id: 'refreshTreeGridButton',
                	type: 'refresh',
                    tooltip: 'Обновить',
                	listeners: {
                		click : 'treeRefreshClick',
                	}
                },
            ],
        items: [{
        	xtype: 'treepanel',
        	reference: 'treeOrderPanel',
        	id: 'treeOrderPanel',
        	useArrows: true,
            rootVisible: false,
            multiSelect: false,
            singleExpand: false,
            collapsed : false,
            collapsible : false,
        	store: 'OrderTreeStore',
			height: 300,
        	columns: [{
                xtype: 'treecolumn',
                text: 'Раздел',
                flex: 2,
                sortable: true,
                dataIndex: 'name'
            },{
                text: 'Кол-во',
                flex: 1,
                sortable: false,
                dataIndex: 'count',
                align: 'center',
                renderer : function(obj, v1, value) {
                	if (value.data.id == 51) {
                		if (value.data.count > 0)
                			return '<span style="color:red; font-weight:bold;">' + value.data.count + '</span>';
                		else 
                			return '<span>' + value.data.count + '</span>';
                	}                	
                	return value.data.count;
                }
            }],
            
            listeners: {
            	select : 'selectOrderTreeNode',
            }
        }],
    }, {
    	title: 'Заказы',
    	collapsible: false,
        region: 'center',
        margin: '5 0 0 0',
        layout: 'fit',
        items: [{
			xtype: 'orderList',
			reference: 'orderList',
			hidden: false,
    	}, {
    		xtype: 'siteOrderList',
			reference: 'siteOrderList',
			hidden: true,
        }],
    }],
    
    initComponent: function() {
    	//create the delayed task instance with our callback
    	var view = this;
    	var task = Ext.create('Ext.util.DelayedTask', function() {
    	    //server calling method
    		Ext.getCmp('refreshTreeGridButton').fireEvent('click');
    	    // The task will be called after each 10000 ms
    	    task.delay(10000);
    	}, this);

    	//The function will start after 0 milliseconds - so we want to start instantly at first
    	task.delay(10000);
    	
        this.callParent(arguments);
    },
    
 
});