Ext.define('SushimiConsole.view.clients.address.IntegrationAddressListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clients.address',
    
    windowMode : 'add',
    

    /**
     * Обновить стор (после поиска)
     */
    onRefreshStore : function() {
    	var clientName = Ext.getCmp('searchClientNameField');
    	var clientPhone = Ext.getCmp('searchClientPhoneField');
    	var clientMainGrid = Ext.getCmp('integrationMainClientsStoreId');
    	clientMainGrid.store.proxy.api.update = 'rest/clients/information/store/read';
    	clientMainGrid.getStore().reload();
    	clientName.reset();
    	clientPhone.reset();
    },
    
    /**
     * Очистка всей таблицы адресов на объединение
     */
    onRefreshAddressStore : function() {
    	var clientAddress = Ext.getCmp('integrationAddresGridId');
      	 clientAddress.getStore().each(function(record){
        		clientAddress.store.remove(record);
        	});
    },
    
    
    /**
     * Удаление записи из store
     */
    onDeleteRecord: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        var client = Ext.getCmp('integrationAddresGridId');
        console.log(selection);
        if (selection) {
            client.store.remove(selection);
        }
    },
    
    /**
     * Поиск клиента по параметрам
     */
    searchClient: function() {
    	var clientMainNameField = Ext.getCmp('searchClientNameField');
    	var clientMainPhoneField = Ext.getCmp('searchClientPhoneField');
    	var clientMainSearchGrid = Ext.getCmp('integrationMainClientsStoreId');
    	clientMainSearchGrid.store.proxy.api.read = 'rest/client/search/store/read?name=' + clientMainNameField.getValue() + '&phone=' + clientMainPhoneField.getValue();
    	clientMainSearchGrid.getStore().reload();
    }, 
    
    

    /**
     * Добавление адреса для объединение
     */
    addClientAddressIntegration: function() {
    	 var selection = this.getView().getSelectionModel().getSelection()[0];
    	 console.log(selection);
    	 selection.data.mainAddress = false;
    	 var client = Ext.getCmp('integrationAddresGridId');
         client.store.insert(0,selection);
    }, 
    
    /**
     * Установка главного адреса
     */
    onSetMainAddressClient: function() {
    	var selection = this.getView().getSelectionModel().getSelection()[0];
   	 console.log(selection.data.mainClient);
   	 var client = Ext.getCmp('integrationAddresGridId');
   	 
        if (selection) {
            client.store.remove(selection);
        }
   	 
   	 client.getStore().each(function(record){
   		record.data.mainAddress = false;
   	});
    	 
   	 

   	 selection.data.mainAddress = true;
        client.store.insert(0,selection);
        

    }, 
    

    
    
    /**
     * Объединение клиентов
     */
    onAddressIntegration: function() {
    	var model = new SushimiConsole.model.InfoClientsAddresModel();
    	
    	var grid = Ext.getCmp('integrationAddresGridId');
    	var address = Ext.getCmp('integrationMainClientsAddresGridId');
    	
      	var i = 0;
    	model.data.addresses = new Array();
    	grid.getStore().each(function(record){
    		model.data.addresses[i] = {addressId: record.data.id, mainAddress: record.data.mainAddress };
    		i++;
    	});
    	
    	model.data.id = 0;
    	var data = model.getData();
    	console.log(data);

    	Ext.Ajax.request({
		    url: '/rest/clients/address/store/create',
		    jsonData : data,
		    
		    success: function(response){
		    	Ext.MessageBox.alert('Успешно','Адреса успешно объединены');
		    	grid.getStore().reload();
		    	address.getStore().removeAll();
		    },
		    failure: function(batch) {
		    	
				Ext.MessageBox.alert('Внимание','Ошибка выполнения запроса');
			}
		});
    	
    	
 }, 
});