Ext.define('SushimiConsole.view.clients.information.InfoClientsList' ,{
    extend: 'Ext.panel.Panel',
    controller: 'clients.information',
    alias: 'widget.clients.InfoClientsList',
    requires: [
   		'Ext.MessageBox',
   		'Ext.layout.container.Border',
   		
   	    'SushimiConsole.view.clients.information.InfoClientsListController',
   	    'SushimiConsole.view.clients.information.InfoClientsEditWindow',
   	    
   	    'SushimiConsole.view.clients.information.InfoClientsAddresListController',
   	    'SushimiConsole.view.clients.information.InfoClientsAddresEditWindow',
	],

	layout: 'border',
	bodyBorder: true,
	defaults: {
        collapsible: true,
        split: true,
        bodyPadding: '0 0 0 0'
    },
    items: [ 
            

            
            
             {          
            	title: 'Управление клиентами: информация о клиентах',
                collapsible: false,
                region: 'center',
                margin: '0 0 0 0',
                
                items: [{
                	viewConfig: {
                        stripeRows: true
                    },
                    id: 'clientsInfoClientsStoreId',
                    xtype: 'grid',
                	store: 'InfoClientsStore',
                	scroll: true,
                	stateful: false,
                	controller: 'clients.information',
                	height: 650,
                	scroll: true,
                	
                    tbar: [
                           { text: 'Добавить', handler: 'showAddWindow' }, 
                           { text: 'Изменить', handler: 'showEditWindow' },
                           { text: 'Удалить', handler: 'onDeleteRecord', },
                           { text: 'Обновить', handler: 'onRefreshStore', },
                           ],
	
                     columns: [
                            {text: "№", dataIndex: 'id', width: 100},
                            {text: "Имя", dataIndex: 'name' , flex: 3},
                            {text: "Номер телефона", dataIndex: 'phoneNumber' , width: 200},
                            {text: "E-mail", dataIndex: 'email', width:200},
                            {text: "Сумма заказов", dataIndex: 'currentTotalOrderSum', width:200},
                            ],
		
          
                        	listeners: {
                        	    viewready: function(){
                        	       this.store.load();
                        	       this.view.refresh();
                        	    },
                            	selectionchange: function(model, records) {
                            		var infoClientsAddresGrid = Ext.getCmp('infoClientsAddresGridId');
                            		var record = records[0];
                            		if (record != null && record.getData() != null) {
                						infoClientsAddresGrid.store.proxy.api.read = 'rest/clients/information/addres/store/read?clientId=' + record.getData().id;
                						infoClientsAddresGrid.store.proxy.api.create = 'rest/clients/information/addres/store/create?clientId=' + record.getData().id;
                						infoClientsAddresGrid.store.proxy.api.destroy = 'rest/clients/information/addres/store/destroy?clientId=' + record.getData().id;
                						infoClientsAddresGrid.store.proxy.api.update = 'rest/clients/information/addres/store/update?clientId=' + record.getData().id;
                					}
                            		infoClientsAddresGrid.getStore().reload();
                            	},
                        	 },

            
                      
                }]
                
   
            },
            {
            	title: 'Адреса клиентов',
                region: 'south',
                height: 300,
                minHeight: 100,
                maxHeight: 250,
                items: [{
                	id: 'infoClientsAddresGridId',
                	viewConfig: { stripeRows: true },
                    xtype: 'grid',
                    store: 'InfoClientsAddresStore',
                	stateful: false,
                	controller: 'clients.infoClientsAddres',
                	
                	tbar: [{ text: 'Добавить', handler: 'showAddWindow' }, 
                	       { text: 'Изменить', handler: 'showEditWindow' },
                	       { text: 'Удалить',  handler: 'onDeleteRecord', },
                	       { text: 'Обновить', handler: 'onRefreshStore', },
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

                	],
                }]
            }         
            
            
            
            ],
         
            			initComponent: function() {
            				this.callParent(arguments);
            			},

});