Ext.define('SushimiConsole.view.clients.address.IntegrationAddressList' ,{
    extend: 'Ext.panel.Panel',
    controller: 'clients.address',
    alias: 'widget.clients.IntegrationAddressList',
    requires: [
   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   		
   	    'SushimiConsole.view.clients.address.IntegrationAddressListController',


	],
	
	layout: 'border',
	bodyBorder: true,
	title: 'Управление клиентами: объединение адресов',
	defaults: {
        collapsible: true,
        split: true,
        bodyPadding: '0 0 0 0'
    },
    items: [        
             {  
            	collapsible: false,
                region: 'north',
                margin: '0 0 0 0',
           	  	width: 450,
                items: [{
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
                        		}, 
                        		{
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
                        		}, 
                        		{
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
                },
                {
                	title: 'Выбор клиента',
                    viewConfig: {
                	        stripeRows: true
                	        	},

                	 id: 'integrationMainClientsStoreId',
                	 reference: 'integrationMainClientsStoreId',
                	 xtype: 'grid',
                	 store: 'InfoClientsStore',
                	 scroll: true,
                	 region: 'center',
                	 stateful: false,
                	 controller: 'clients.address',
                	 height: 350,

                	 scroll: true,
                	        
                	 tbar: [
                	        {text: "Обновить", handler: 'onRefreshStore'}
                	       ],
                	        
                	             	  	
                	  columns: [
                	         {text: "№", dataIndex: 'id', width: 100},
                	         {text: "Имя", dataIndex: 'name' , flex: 3},
           	              	 {text: "Номер телефона", dataIndex: 'phoneNumber' , width: 150},
                             {text: "E-mail", dataIndex: 'email', width:200},
                             {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width:200},
                    	       ],
		



           	           listeners: {
           	            	  viewready: function(){
           	            	  this.store.load();
	       					  this.view.refresh();
	                          },
	                        	selectionchange: function(model, records) {
                            		var integrationMainClientsAddresGrid = Ext.getCmp('integrationMainClientsAddresGridId');
                            		var record = records[0];
                            		if (record != null && record.getData() != null) {
                            			integrationMainClientsAddresGrid.store.proxy.api.read = 'rest/clients/information/addres/store/read?clientId=' + record.getData().id;

                					}
                            		integrationMainClientsAddresGrid.getStore().reload();
                            		
                            		var integrationAddressClients = Ext.getCmp('integrationClientsAddresGridId');
                            		integrationAddressClients.getStore().reload();
                   			       	
                            	},
	                        },
                }]
             },
             {
                 region: 'south',
                 collapsible: true,
                 split: true,
                 height: 320,
                 //flex: 13,
                 title: 'Объединение адресов клиента',
                 layout: {
                     type: 'border',
                     padding: 5
                 },
                 items: [{
                     title: 'Адреса клиента',
                     region: 'center',
                     flex: 1,
                     split: true,
                     //collapsible: true
                     id: 'integrationMainClientsAddresGridId',
                  	reference: 'integrationMainClientsAddresGridId',
                  	viewConfig: { stripeRows: true },
                  	xtype: 'grid',
                  	store: 'InfoClientsAddresStore',
                  	stateful: false,
                  	controller: 'clients.address',
                  	scroll: true,    
                  	
                  	tbar: [
              	        {text: "Добавить на объединение", handler: 'addClientAddressIntegration'}
              	       ],
                  	
              		columns: [
              		          {text: "№", dataIndex: 'id', width: 100},
              		          {text: "Город", dataIndex: 'cityName' , width: 100},
            		          {text: "Улица", dataIndex: 'streetName' , flex: 2},
            		          {text: "Дом", dataIndex: 'house' , width: 100},
                              {text: "Строение", dataIndex: 'building' , width: 100},
                              {text: "Корпус", dataIndex: 'corpus' , width: 100},
                              {text: "Этаж", dataIndex: 'floor' , width: 100},
              		          {text: "Квартира", dataIndex: 'flat' , width: 100},

              		          ],
                 }, {
                     title: 'Адреса для объединения',
                     region: 'east',
                     flex: 1,
                     split: true,
                     //collapsible: true
                     id: 'integrationClientsAddresGridId',
                     reference: 'integrationClientsAddresGridId',
                  	viewConfig: { stripeRows: true },
                  	xtype: 'grid',
                  	store: 'IntegrationClientsAddresStore',
                  	stateful: false,
                  	scroll: true,   
                  	controller: 'clients.address',
                  	
                 	tbar: [
                	        {text: "Убрать адрес", handler: 'onDeleteRecord'},
                	        {text: "Главный адрес", handler: 'onSetMainAddressClient'},
                	        {text: "Объединить", handler: 'onAddressIntegration'},
                	        {text: "Очистить список", handler: 'onRefreshAddressStore'}
                	       ],
                  	
              		columns: [
              		          {text: "№", dataIndex: 'id', width: 100},
              		          {text: "Город", dataIndex: 'cityName' , width: 100},
            		          {text: "Улица", dataIndex: 'streetName' , flex: 2},
            		          {text: "Дом", dataIndex: 'house' , width: 100},
                              {text: "Строение", dataIndex: 'building' , width: 100},
                              {text: "Корпус", dataIndex: 'corpus' , width: 100},
                              {text: "Этаж", dataIndex: 'floor' , width: 100},
                              {text: "Подъезд", dataIndex: 'porch', width: 100},
              		          {text: "Квартира", dataIndex: 'flat' , width: 100},
              		          {text: "Главный адрес", dataIndex: 'mainAddress' , width: 150, xtype:'booleancolumn', trueText:'Да', falseText:'Нет'},
              		          

              		          ],
                    
                 }]
             }
             
             
             
             
             ],
             
       initComponent: function() {
        	  this.callParent(arguments);
          },
});