Ext.define('SushimiConsoleARM.view.auth.AuthFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth.AuthFormController',

    onAuthenticateButtonClick : function() {
    	var passwordField = Ext.getCmp('passwordField');
    	passwordField.setDisabled(true);
    	var password = passwordField.getValue();
    	if (password == null || password == undefined || password.length < 1) {
    		passwordField.setDisabled(false);
    		Ext.MessageBox.show({
    	           title: 'Внимание',
    	           msg: 'Введите пароль!',
    	           buttons: Ext.MessageBox.OK,
    	           icon: Ext.MessageBox.WARNING
    	       });
    		return;
    	}
    	
    	Ext.getBody().mask().show();
    	
    	var ctl = this;
    	
    	Ext.Ajax.request({
    	    url: '/arm/login',
    	    method: 'POST',          
    	    params: { login: password,},
    	    success: function(response, conn, options, eOpts) {
    	    	var json = Ext.util.JSON.decode(response.responseText);
    	    	if (json.success) {
    	    		//console.log('json: ' + response.responseText);
    	    		if (json.data == null) {
    	    			Ext.MessageBox.show({
     	    	           title: 'Внимание',
     	    	           msg: 'Ошибка при попытке авторизации: ' + json.message,
     	    	           buttons: Ext.MessageBox.OK,
     	    	           icon: Ext.MessageBox.WARNING
     	    	       });
    	    			return;
    	    		}
    	    		
    	    		if (json.data.role == "COOK") {
    	    			ctl.redirectTo('kitchen');
    	    			return;
    	    		}
    	    		
    	    		if (json.data.role == "COURIER") {
    	    			ctl.redirectTo('delivery');
    	    			return;
    	    		}
    	    		
    	    		if (json.data.role == "WAITER") {
    	    			ctl.redirectTo('bar');
    	    			return;
    	    		}
    	    		
    	    	} else {
    	    		passwordField.setDisabled(false);
    	    		Ext.MessageBox.show({
    	    	           title: 'Внимание',
    	    	           msg: 'Ошибка при попытке авторизации: ' + json.message,
    	    	           buttons: Ext.MessageBox.OK,
    	    	           icon: Ext.MessageBox.WARNING
    	    	       });
    	    		return;
    	    	}
    	    },                                    
    	    failure: function(conn, response, options, eOpts){
    	    	var respObj = Ext.JSON.decode(response.responseText);
    	    	Ext.Msg.alert("Error", respObj.status.statusMessage);
    	    	console.log('failure' + response);
	    	}
    	});
    	
    	Ext.getBody().mask().hide();
    	passwordField.setDisabled(false);
    	
    },
    
});