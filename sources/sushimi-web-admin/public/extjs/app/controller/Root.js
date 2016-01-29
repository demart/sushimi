Ext.define('SushimiWebAdmin.controller.Root', {
    extend: 'Ext.app.Controller',
    	
    	
        
    	config: {
            refs: {
                main: 'app-main',
            },
        },
        
        routes : {
        	'logout' : 'onLogoutRoute',
        	'dictionary/city' : 'onDicCity',
        	'control/users/information' : 'onControlUsersInformation',
        	'dictionary/staff' : 'onDicStaff',
        	'control/users/integration' : 'onControlUsersIntegration',
        	'dictionary/category' : 'onDicCategory',
        	'dictionary/product' : 'onDicProduct',
        	'dictionary/announcements' : 'onDicAnnouncements'

        },
        
        
        
        onLogoutRoute : function() {
            console.log("onLogoutRoute route");
            
            Ext.Ajax.request({
        	    url: '/admin/panel/logout',
        	    method: 'POST',          
        	    params: { },
        	    success: function(response, conn, options, eOpts) {
        	    	var json = Ext.util.JSON.decode(response.responseText);
        	    	if (json.success) {}
        	    },
        	    failure: function(conn, response, options, eOpts){
        	    	var respObj = Ext.JSON.decode(response.responseText);
        	    	Ext.Msg.alert("Error", respObj.status.statusMessage);
        	    	console.log('failure' + response);
    	    	}
        	});
        	
    		window.document.location = "/login";
        },
        
               
        onDicStaff: function () {
        	console.log("onDicStaff route");
        	this.getMain().getComponent('mainBody').removeAll(true);
            this.getMain().getComponent('mainBody').add(Ext.create('SushimiWebAdmin.view.dictionaries.staff.StaffList'));
       },
       
       onDicCategory: function () {
    	   console.log("onDicCategory route");
    	   this.getMain().getComponent('mainBody').removeAll(true);
           this.getMain().getComponent('mainBody').add(Ext.create('SushimiWebAdmin.view.dictionaries.category.CategoryList'));
      },
      
      onDicProduct: function () {
   	   console.log("onDicCategory route");
   	   this.getMain().getComponent('mainBody').removeAll(true);
          this.getMain().getComponent('mainBody').add(Ext.create('SushimiWebAdmin.view.dictionaries.products.ProductsList'));
     },
     
     onDicAnnouncements: function () {
     	   console.log("onDicAnnouncements route");
     	   this.getMain().getComponent('mainBody').removeAll(true);
            this.getMain().getComponent('mainBody').add(Ext.create('SushimiWebAdmin.view.dictionaries.announcements.AnnouncementsList'));
       },
          	
});
