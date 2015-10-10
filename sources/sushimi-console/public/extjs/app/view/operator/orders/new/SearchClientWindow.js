Ext.define('SushimiConsole.view.operator.orders.new.SearchClientWindow', {
    extend: 'Ext.window.Window',
    xtype: 'order-search-client-window',
    
    id: 'searchClientGridWindow',
    reference: 'searchClientWindow',
    controller: 'operator.orders.new.newOrderWindow',

    title: 'Поиск клиента',
    width: 600,
    minWidth: 500,
    minHeight: 550,
    layout: 'fit',
    resizable: true,
    maximized: false,
    modal: true,
    closeAction: 'hide',
    defaultFocus: 'searchClientNameField',
    
    items: [{
    	id: 'searchClientGridWindowForm',
    	reference: 'searchClientGridWindowForm',
    	xtype: 'form',
    	layout: 'form',
    	bodyPadding: 0,
    	autoScroll: true,
    	
    	defaults: {
            border:false
        },
        
        fieldDefaults: {
            labelWidth: 60,
            anchor: '100%'
        },

        layout: {
            type: 'vbox',
            align: 'stretch'  // Child items are stretched to full width
        },
        
        items: [{
	    	xtype: 'panel',
	    	layout: 'fit',
	    	reference: 'siteClientInfoPanel',
	    	bodyPadding: 5,
	    	items: [{
		        xtype: 'fieldcontainer',
		        fieldLabel: 'В заказе',
		        labelWidth: 80,
		        combineErrors: true,
		        msgTarget : 'side',
		        layout: 'hbox',
		        defaults: {
		            flex: 1,
		            hideLabel: false,
		            labelWidth: 60,
		        },
		        items: [{
		    		xtype: 'textfield',
		            reference: 'siteclientNameField',
		            margin: '0 15 0 0',
		            width: 150,
		    	}, {
		    		fieldLabel: 'Телефон',
		    		xtype: 'textfield',
		    		reference: 'searchSiteClientPhoneField',
		            name: 'siteClientPhoneField',
		            margin: '0 15 0 0',
		            width: 65,
		    	},],
	    	}],
    }, {
	    	xtype: 'panel',
	    	layout: 'fit',
	    	bodyPadding: 5,
	    	items: [{
		        xtype: 'fieldcontainer',
		        fieldLabel: 'ФИО',
		        labelWidth: 40,
		        combineErrors: true,
		        msgTarget : 'side',
		        layout: 'hbox',
		        defaults: {
		            flex: 1,
		            hideLabel: false,
		            labelWidth: 60,
		        },
		        items: [{
		    		xtype: 'textfield',
		    		id:'searchClientNameField',
		            name: 'clientName',
		            margin: '0 15 0 0',
		            width: 150,
		            listeners:{
		                specialkey: function(f,o){
		                    if(o.getKey()==13){
		                    	Ext.getCmp('searchClientButton').fireEvent('click');
		                    }
		                }
		            },  
		    	}, {
		    		fieldLabel: 'Телефон',
		    		xtype: 'textfield',
		    		id: 'searchClientPhoneField',
		            name: 'clientPhoneField',
		            margin: '0 15 0 0',
		            width: 65,
		            listeners:{
		                specialkey: function(f,o){
		                    if(o.getKey()==13){
		                    	Ext.getCmp('searchClientButton').fireEvent('click');
		                    }
		                }
		            },
		    	}, {
		    		id: 'searchClientButton',
		    		xtype: 'button',
		    		text: 'Найти',
		    		listeners: {
		    			click : 'searchClient' 
		    		},
		    		//handler: 'searchClient',
		    		width: 50,
		    	}, ],
	    	}],
    }, {
    	title: 'Клиенты',
		id: 'newOrderSearchClientGrid',
		reference: 'newOrderSearchClientGrid',
		xtype: 'grid',
		viewConfig: { stripeRows: true },
        store: 'order.ClientStore',
    	stateful: false,
    	height: 180,
    	
    	tbar: [
    	   {xtype:'button', text:'Добавить клиента', handler: 'showAddClientWindow'},
    	],
    	columns: [
			{text: "№", dataIndex: 'id', width: 50},
            {text: "ФИО", dataIndex: 'name' , flex: 2},
            {text: "Телефон", dataIndex: 'phoneNumber', width: 120},
            //{text: "Дата рождения", dataIndex: 'birthdate',  xtype: 'datecolumn', format: 'd.m.Y', width: 120},
            
            {text: "Сумма", dataIndex: 'currentTotalOrderSum', width: 80},
            {text: "Скидка", dataIndex: 'currentDiscountPercent',  width: 80},
            //{text: "Следующая сумма", dataIndex: 'nextDiscountSum',  width: 50},
            //{text: "Следующий процент", dataIndex: 'nextDiscountPercent',  width: 50},
    	],
    	
    	listeners: {
    	    viewready: function(){
    	    },
        	selectionchange: function(model, records) {
        		var clientAddressGrid = Ext.getCmp('newOrderClientAddressGrid');
        		var record = records[0];
        		if (!record) {
        			clientAddressGrid.getStore().removeAll();
        			return
        		}
        		clientAddressGrid.store.proxy.api.read = 'rest/client/address/search/store/read?clientId=' + record.getData().id;
        		clientAddressGrid.getStore().reload();
        	},
    	 },
    	
	}, {
		title: 'Адреса клиента',
		id: 'newOrderClientAddressGrid',
		reference: 'newOrderClientAddressGrid',
		xtype: 'grid',
		viewConfig: { stripeRows: true },
        store: 'order.ClientAddressStore',
    	stateful: false,
    	height: 160,
    	
    	tbar: [
    	   {xtype:'button', text:'Добавить адрес', handler: 'showAddClientAddressWindow'},
    	],
    	
    	columns: [
			{text: "№", dataIndex: 'id', width: 50},
            {text: "Адрес", dataIndex: 'address' , flex: 2},
    	],
    	
	},],
	
    buttons: [{
        text: 'Выбрать клиента и адрес доставки',
        handler: 'onSelectClientFormClick'
    }, {
        text: 'Закрыть',
        handler: 'onResetSearchClientFormClick'
    }],
	
    }],
});