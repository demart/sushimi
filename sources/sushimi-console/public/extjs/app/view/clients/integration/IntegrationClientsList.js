Ext.define('SushimiConsole.view.clients.integration.IntegrationClientsList' ,{
    extend: 'Ext.panel.Panel',
    controller: 'clients.integration',
    alias: 'widget.clients.IntegrationClientsList',
    initComponent: function() {
    	var grid = Ext.getCmp('integrationMainClientsAddresGridId');
    	grid.store.reload();
    	},
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
                        			name: 'clientNameClients',
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
                        			name: 'clientPhoneClients',
                        			margin: '0 15 0 0',
                        			width: 150,
                        			listeners:{
                        				specialkey: function(f,o){
                        					if(o.getKey()==13){
                        						Ext.getCmp('searchMainClientButton').fireEvent('click');
                        					}
                        				}
                        			},
                        		}, /*
                        		{
                        			id: 'searchMainClientButton',
                        			xtype: 'button',
                        			text: 'Найти',
                                    scale: 'small',
                        			listeners: {
                        				click : 'searchMainClient' 
                        			},
                        			//handler: 'searchClient',
                        			width: 50,
                        		},
                        		{
                        			id: 'onRefreshStoreButton',
                        			xtype: 'button',
                        			color: 'green',
                                    scale: 'small',
                        			text: 'Очистить фильтры',
                        			listeners: {
                        				click : 'onRefreshStore' 
                        			},
                        			//handler: 'searchClient',
                        			width: 50,
                        		},*/
                        		
                        		{
                        			region: 'center',
                        			items: [{
                        				id: 'searchMainClientButton',
                        				region: 'east',
                        				xtype: 'button',
                            			margin: '0 15 0 0',
                        				text: 'Найти',
                        				listeners: {
                            				click : 'searchMainClient' 
                            			},
                        			},
                        			
                        			{region: 'west',
                        				xtype: 'button',
                            			id: 'onRefreshStoreButton',
                        				text:  'Очистить фильтры',
                        				listeners: {
                            				click : 'onRefreshStore' 
                            			},}
                        			        ]
                        		},],
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
                	 store: 'clients.InformationListClientsStore',
                	 scroll: true,
                	 region: 'center',
                	 stateful: false,
                	 controller: 'clients.integration',
                	 height: 450,
                	 scroll: true,
                	        
                	 tbar: [{text: "Добавить на объединение", handler: 'AddClientIntegration'}
                	       ],
                	        
                	             	  	
                	  columns: [
                	         {text: "№", dataIndex: 'id', width: 50},
                	         {text: "Имя", dataIndex: 'name' , flex: 1},
        	                  {text: "Телефон", dataIndex: 'phoneNumber', width: 100},
                              {text: "E-mail", dataIndex: 'email', width:150},
                              {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width:100}
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
                    height: 450,

                    items: [{
                    	id: 'integrationMainClientsAddresGridId',
                    	viewConfig: { stripeRows: true },
                    	xtype: 'grid',
                    	store: 'InformationClientsAddressStore',
                    	stateful: false,
                    	scroll: true,           	
                		columns: [
                		          {text: "№", dataIndex: 'id', width: 100},
               	                 {text: "Адрес", dataIndex: 'cityName', flex: 1, renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                 	                  var string = '';
                 	                  if (value != null && record.get("streetName") == null && record.get("house") == null && record.get("flat") == null && record.get("building") == null)
                 	                	 string = 'г. ' + value;
                 	                  if (value == null && record.get("streetName") != null && record.get("flat") == null && record.get("house") == null && record.get("building") == null)
                 	                	  string = 'ул. ' + record.get("streetName");
                 	                  else if (record.get("streetName") != null && value != null && record.get("flat") == null && record.get("house") == null && record.get("building") == null)
                 	                	 string = 'г. ' + value + ', ул. ' + record.get("streetName");
                 	                  else if (record.get("streetName") != null && value == null && record.get("house") != null && record.get("flat") == null && record.get("building") == null)
               	                	  string = 'ул. ' + record.get("streetName") + ', д. ' + record.get("house");
                 	                  else if (record.get("streetName") == null && value != null && record.get("house") != null && record.get("flat") == null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', д. ' + record.get("house");    
                 	                  else if (record.get("streetName") == null && value == null && record.get("house") != null && record.get("flat") == null && record.get("building") == null)
                 	                	  string = 'д. ' + record.get("house");
                 	                  else if (record.get("streetName") == null && value != null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', кв. ' + record.get("house");
                 	                  else if (record.get("streetName") != null && value == null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'ул. ' + record.get("streetName") + ', кв.' + record.get("flat");
                 	                  else if (record.get("streetName") != null && value == null && record.get("house") != null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'ул. ' + record.get("streetName") + ', д. ' + record.get("house") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") == null && value == null && record.get("house") != null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'д. ' + record.get("house") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") == null && value == null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && value != null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', кв. ' + record.get("flat");       
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', д. ' + record.get("house") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") == null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', д. ' + record.get("house");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") == null && record.get("building") != null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', д. ' + record.get("house") + '/' + record.get("building");
                 	                  else if (record.get("streetName") == null && record.get("house") != null && value != null && record.get("flat") != null && record.get("building") != null)
                 	                	  string = 'г. ' + value +  ', д. ' + record.get("house") + '/' + record.get("building") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value == null && record.get("flat") != null && record.get("building") != null)
                 	                	  string = 'ул. ' + record.get("streetName") + ', д. ' + record.get("house") + '/' + record.get("building") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") != null && record.get("building") != null)
                 	                	  string =  'г. ' + value + ', ул. ' + record.get("streetName") + ', д. ' + record.get("house") + '/' + record.get("building") + ', кв. ' + record.get("flat");
                 	                  return string;
                 	             
               	                 }},

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
                 	        store: 'clients.IntegrationClientsStore',
                 	        scroll: true,
                 	        region: 'center',
                 	        stateful: false,
                 	        controller: 'clients.integration',
                 	        height: 485,
                 	        scroll: true,
                 	        
                	        tbar: [{text: "Объединить всех клиентов", handler: 'onClientIntegration'},
                 	               {text: "Убрать клиента", handler: 'onDeleteRecord'},
                	               {text: "Главный клиент", handler: 'onSetMainClient'},
                 	               //{text: "Очистить список", handler: 'onRefreshClientsStore'}
                	               ],
                 	        
            	  	
                 	        columns: [
                 	                  {text: "№", dataIndex: 'id', width: 50},
									  {text: "Имя", dataIndex: 'name' , flex: 1},
 									  {text: "Телефон", dataIndex: 'phoneNumber', width: 100},
 									  {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width: 100},
  									  {text: "E-mail", dataIndex: 'email', width:150},
 									  {text: "Главный клиент", dataIndex: 'mainClient' , width: 100, xtype:'booleancolumn', trueText:'Да', falseText:'Нет'},
            
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
                     height: 450,

                     items: [{
                     	id: 'integrationClientsAddresGridId',
                     	viewConfig: { stripeRows: true },
                     	xtype: 'grid',
                     	store: 'IntegrationClientsAddresStore',
                     	stateful: false,
                     	scroll: true,           	
                 		columns: [
                 		          {text: "№", dataIndex: 'id', width: 100},
               	                 {text: "Адрес", dataIndex: 'cityName', flex: 1, renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                 	                  var string = '';
                 	                  if (value != null && record.get("streetName") == null && record.get("house") == null && record.get("flat") == null && record.get("building") == null)
                 	                	 string = 'г. ' + value;
                 	                  if (value == null && record.get("streetName") != null && record.get("flat") == null && record.get("house") == null && record.get("building") == null)
                 	                	  string = 'ул. ' + record.get("streetName");
                 	                  else if (record.get("streetName") != null && value != null && record.get("flat") == null && record.get("house") == null && record.get("building") == null)
                 	                	 string = 'г. ' + value + ', ул. ' + record.get("streetName");
                 	                  else if (record.get("streetName") != null && value == null && record.get("house") != null && record.get("flat") == null && record.get("building") == null)
               	                	  string = 'ул. ' + record.get("streetName") + ', д. ' + record.get("house");
                 	                  else if (record.get("streetName") == null && value != null && record.get("house") != null && record.get("flat") == null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', д. ' + record.get("house");    
                 	                  else if (record.get("streetName") == null && value == null && record.get("house") != null && record.get("flat") == null && record.get("building") == null)
                 	                	  string = 'д. ' + record.get("house");
                 	                  else if (record.get("streetName") == null && value != null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', кв. ' + record.get("house");
                 	                  else if (record.get("streetName") != null && value == null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'ул. ' + record.get("streetName") + ', кв.' + record.get("flat");
                 	                  else if (record.get("streetName") != null && value == null && record.get("house") != null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'ул. ' + record.get("streetName") + ', д. ' + record.get("house") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") == null && value == null && record.get("house") != null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'д. ' + record.get("house") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") == null && value == null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && value != null && record.get("house") == null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', кв. ' + record.get("flat");       
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") != null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', д. ' + record.get("house") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") == null && record.get("building") == null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', д. ' + record.get("house");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") == null && record.get("building") != null)
                 	                	  string = 'г. ' + value + ', ул. ' + record.get("streetName") + ', д. ' + record.get("house") + '/' + record.get("building");
                 	                  else if (record.get("streetName") == null && record.get("house") != null && value != null && record.get("flat") != null && record.get("building") != null)
                 	                	  string = 'г. ' + value +  ', д. ' + record.get("house") + '/' + record.get("building") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value == null && record.get("flat") != null && record.get("building") != null)
                 	                	  string = 'ул. ' + record.get("streetName") + ', д. ' + record.get("house") + '/' + record.get("building") + ', кв. ' + record.get("flat");
                 	                  else if (record.get("streetName") != null && record.get("house") != null && value != null && record.get("flat") != null && record.get("building") != null)
                 	                	  string =  'г. ' + value + 'ул. ' + record.get("streetName") + ', д. ' + record.get("house") + '/' + record.get("building") + ', кв. ' + record.get("flat");
                 	                  console.log(record.get("building"));
                 	                  return string;
                 	              }},

                 		          ],
                     }]
                 }]
              }
             
             
             
             ],
             
       initComponent: function() {
        	  this.callParent(arguments);
          },
});