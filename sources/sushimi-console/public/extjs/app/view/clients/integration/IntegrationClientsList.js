Ext.define('SushimiConsole.view.clients.integration.IntegrationClientsList' ,{
    extend: 'Ext.panel.Panel',
    controller: 'clients.integration',
    alias: 'widget.clients.IntegrationClientsList',
    requires: [
   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   		
   	    'SushimiConsole.view.clients.integration.IntegrationClientsListController',

   	    ],
	
	layout: 'border',
	bodyBorder: true,
	title: 'Управление клиентами: объединение клиентов',
	defaults: {
        collapsible: true,
        split: true,
        bodyPadding: '0 0 0 0'
    },
    items: [        
             {  
            	collapsible: false,
                region: 'west',
                margin: '0 0 0 0',
           	  	flex: 3,
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
                        			id:'searchMainClientNameField',
                        			name: 'clientName',
                        			margin: '0 15 0 0',
                        			width: 150,
                        			listeners:{
                        				specialkey: function(f,o){
                        					if(o.getKey()==13){
                        						Ext.getCmp('searchMainClientButton').fireEvent('click');
                        					}
                        				}
                        			},  
                        		}, 
                        		{
                        			fieldLabel: 'Телефон',
                        			xtype: 'textfield',
                        			id: 'searchMainClientPhoneField',
                        			name: 'clientPhoneField',
                        			margin: '0 15 0 0',
                        			width: 65,
                        			listeners:{
                        				specialkey: function(f,o){
                        					if(o.getKey()==13){
                        						Ext.getCmp('searchMainClientButton').fireEvent('click');
                        					}
                        				}
                        			},
                        		}, 
                        		{
                        			id: 'searchMainClientButton',
                        			xtype: 'button',
                        			text: 'Найти',
                        			listeners: {
                        				click : 'searchMainClient' 
                        			},
                        			//handler: 'searchClient',
                        			width: 50,
                        		}, ],
                        	}],
                },
                {
                	title: 'Выбор клиентов для объединения',
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
                	 controller: 'clients.integration',
                	 height: 550,
                	 scroll: true,
                	        
                	 tbar: [{text: "Добавить на объединение", handler: 'AddClientIntegration'},
                	        {text: "Обновить", handler: 'onRefreshStore'}
                	       ],
                	        
                	             	  	
                	  columns: [
                	         {text: "№", dataIndex: 'id', width: 100},
                	         {text: "Имя", dataIndex: 'name' , width: 200},
        	                  {text: "Номер телефона", dataIndex: 'phoneNumber', width: 150},
         	                  {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width: 150},
                              {text: "E-mail", dataIndex: 'email', width:200},
                              {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width:150}
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
                            	},
	                        },
                },
                {
                	title: 'Адрес клиента',
                	region: 'south',
                    height: 350,

                    items: [{
                    	id: 'integrationMainClientsAddresGridId',
                    	viewConfig: { stripeRows: true },
                    	xtype: 'grid',
                    	store: 'InfoClientsAddresStore',
                    	stateful: false,
                    	scroll: true,           	
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
                    }]
                }]
             },
             {  
             	collapsible: false,
                 region: 'center',
                 margin: '0 0 0 0',
            	 flex: 3,
                 items: [

                         {
                        		title: 'Список клиентов для объединения',
                 	        viewConfig: {
                 	        	stripeRows: true
                 	        },

                 	        
                 	        
                 	        
                 	        id: 'integrationClientsStoreId',
                 	        reference: 'integrationClientsStoreId',
                 	        xtype: 'grid',
                 	        store: 'IntegrationClientsStore',
                 	        scroll: true,
                 	        region: 'center',
                 	        stateful: false,
                 	        controller: 'clients.integration',
                 	        height: 585,
                 	        scroll: true,
                 	        
                	        tbar: [{text: "Объединить всех клиентов", handler: 'onClientIntegration'},
                 	               {text: "Убрать клиента", handler: 'onDeleteRecord'},
                	               {text: "Главный клиент", handler: 'onSetMainClient'},
                 	               //{text: "Очистить список", handler: 'onRefreshClientsStore'}
                	               ],
                 	        
            	  	
                 	        columns: [
                 	                  {text: "№", dataIndex: 'id', width: 100},
									  {text: "Имя", dataIndex: 'name' , width: 200},
 									  {text: "Номер телефона", dataIndex: 'phoneNumber', width: 150},
 									  {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width: 150},
  									  {text: "E-mail", dataIndex: 'email', width:200},
 									  {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width:150},
                 	                  {text: "Главный клиент", dataIndex: 'mainClient' , width: 150, xtype:'booleancolumn', trueText:'Да', falseText:'Нет'},
            
            	              			  ],
 		



            	              listeners: {
            	            	  viewready: function(){
            	            	  this.store.load();
 	       					  this.view.refresh();
 	                          },
	                        	selectionchange: function(model, records) {
                            		var integrationClientsAddresGrid = Ext.getCmp('integrationClientsAddresGridId');
                            		var record = records[0];
                            		if (record != null && record.getData() != null) {
                            			integrationClientsAddresGrid.store.proxy.api.read = 'rest/clients/information/addres/store/read?clientId=' + record.getData().id;

                					}
                            		integrationClientsAddresGrid.getStore().reload();
                            	},
 	                        
 	                        },
                 },
                 {
                 	title: 'Адрес клиента',
                 	region: 'south',
                     height: 350,

                     items: [{
                     	id: 'integrationClientsAddresGridId',
                     	viewConfig: { stripeRows: true },
                     	xtype: 'grid',
                     	store: 'IntegrationClientsAddresStore',
                     	stateful: false,
                     	scroll: true,           	
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

                 		          ],
                     }]
                 }]
              }
             
             
             
             ],
             
       initComponent: function() {
        	  this.callParent(arguments);
          },
});