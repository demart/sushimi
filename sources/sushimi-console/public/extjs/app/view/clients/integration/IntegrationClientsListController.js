Ext.define('SushimiConsole.view.clients.integration.IntegrationClientsListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clients.integration',
    
    windowMode : 'add',
    
   
    

    
    // Обновить стор
    onRefreshStore : function() {
    	this.view.getStore().reload();
    },
    
    //удаление записи из стора
    onDeleteRecord: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        var client = Ext.getCmp('IntegrationClientsStoreId');
        console.log(selection);
        if (selection) {
            client.store.remove(selection);
        }
    },
    
    // Поиск клиента по критериям
    searchMainClient: function() {
    	var clientMainNameField = Ext.getCmp('searchMainClientNameField');
    	var clientMainPhoneField = Ext.getCmp('searchMainClientPhoneField');
    	var clientMainSearchGrid = Ext.getCmp('IntegrationMainClientsStoreId');
    	clientMainSearchGrid.store.proxy.api.read = 'rest/client/search/store/read?name=' + clientMainNameField.getValue() + '&phone=' + clientMainPhoneField.getValue();
    	clientMainSearchGrid.getStore().reload();
    }, 
    
    

    // добавление клиента для объединения
    AddClientIntegration: function() {
    	 var selection = this.getView().getSelectionModel().getSelection()[0];
    	 console.log(selection);
    	 var client = Ext.getCmp('IntegrationClientsStoreId');
         client.store.insert(0,selection);
    }, 
    
    // установка главного клиента
    onSetMainClient: function() {
    	 var selection = this.getView().getSelectionModel().getSelection()[0];
    	 selection.data.mainClient = true;
    	 console.log(selection.data.mainClient);

    }, 
    
    // удаление главного клиента
    onDelMainClient: function() {
    	 var selection = this.getView().getSelectionModel().getSelection()[0];
    	 selection.data.mainClient = null;
    	 console.log(selection.data.mainClient);
    }, 
    
    
    // объединение клиентов
    onClientIntegration: function() {
    	var model = new SushimiConsole.model.IntegrationClientsModel();
    	
    	var grid = Ext.getCmp('IntegrationClientsStoreId');
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
		    	Ext.MessageBox.alert('Успешно','Клиенты отправлены на сервер');
		    },
		    failure: function(batch) {
				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
			}
		});
    	
    	
 }, 
    

    

    
   
    
});