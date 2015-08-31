Ext.define('SushimiConsole.view.clients.integration.IntegrationClientsListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clients.integration',
    
    windowMode : 'add',
    
   
    

    
    /**
     * Обновление store после поиска, выводит всех клиентов.
     */
    onRefreshStore : function() {
    	var clientMainGrid = Ext.getCmp('integrationMainClientsStoreId');
    	clientMainGrid.store.proxy.api.read = 'rest/clients/information/store/read';
    	clientMainGrid.getStore().reload();
    },
    

    onRefreshClientsStore: function() {
    	var clientsGrid = Ext.getCmp('integrationClientsStoreId');
    	clientsGrid.getStore().each(function(record) {
    		clientsGrid.store.remove(record);
    	});
    	
    },
    
    /**
     * удаление выделенного клиента из списка клиентов на объединение
     */
    onDeleteRecord: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        var client = Ext.getCmp('integrationClientsStoreId');
        console.log(selection);
        if (selection) {
            client.store.remove(selection);
        }
        
        var address = Ext.getCmp('integrationClientsAddresGridId');
        address.getStore().each(function(record){
        	console.log(record);
    		address.store.remove(record);
    	});
        
        address.store.reload();
        
                
    },
    
    /**
     * Поисква клиента по критериям
     */
    searchMainClient: function() {
    	var clientMainNameField = Ext.getCmp('searchMainClientNameField');
    	var clientMainPhoneField = Ext.getCmp('searchMainClientPhoneField');
    	var clientMainSearchGrid = Ext.getCmp('integrationMainClientsStoreId');
    	clientMainSearchGrid.store.proxy.api.read = 'rest/client/search/store/read?name=' + clientMainNameField.getValue() + '&phone=' + clientMainPhoneField.getValue();
    	clientMainSearchGrid.getStore().reload();
    }, 
    
    

    /**
     * Добавление клиента на объединение
     */
    AddClientIntegration: function() {
    	 var selection = this.getView().getSelectionModel().getSelection()[0];
    	 selection.data.mainClient = false;
    	 console.log(selection);
    	 var client = Ext.getCmp('integrationClientsStoreId');
         client.store.insert(0,selection);
    }, 
    
    /**
     * Установка главного клиента
     */
    onSetMainClient: function() {
    	 var selection = this.getView().getSelectionModel().getSelection()[0];
    	 console.log(selection.data.mainClient);
    	 var client = Ext.getCmp('integrationClientsStoreId');
    	 
         if (selection) {
             client.store.remove(selection);
         }
    	 
    	 client.getStore().each(function(record){
    		record.data.mainClient = false;
    	});
     	 
    	 

    	 selection.data.mainClient = true;
         client.store.insert(0,selection);
         
    	 client.getStore().reload();

    }, 
    
    
    
    /**
     * Объединение клиентов
     */
    onClientIntegration: function() {
    	var model = new SushimiConsole.model.IntegrationClientsModel();
    	
    	var grid = Ext.getCmp('integrationClientsStoreId');
    	var addressClient = Ext.getCmp('integrationMainClientsAddresGridId');
    	var addresses = Ext.getCmp('integrationClientsAddresGridId');
    	var clients = Ext.getCmp('integrationMainClientsStoreId');
      	var i = 0;
    	model.data.clients = new Array();
    	grid.getStore().each(function(record){
    		model.data.clients[i] = {clientId: record.data.id, mainClient: record.data.mainClient, orderSum: record.data.currentTotalOrderSum };
    		i++;
    	});
    	
    	model.data.id = 0;
    	var data = model.getData();
    	console.log(data);
    	
 

    	Ext.Ajax.request({
		    url: '/rest/clients/integration/store/create',
		    jsonData : data,
		    
		    success: function(response){
		    	Ext.MessageBox.alert('Успешно','Клиенты  успешно объединены');
		     	 grid.getStore().removeAll();
		     	 addressClient.getStore().reload();
		     	 addresses.getStore().removeAll();
		     	 clients.getStore().reload();
		     	 
		    	
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
			}
		});
    	
    	
 }, 
    

    

    
   
    
});