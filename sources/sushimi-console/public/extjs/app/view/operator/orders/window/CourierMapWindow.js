Ext.define('SushimiConsole.view.operator.orders.window.CourierMapWindow', {
    extend: 'Ext.window.Window',
    xtype: 'courier-map-window',
    
    reference: 'courierMapWindow',
    controller: 'operator.orders.ordersTwoList',
    alias: 'widget.operator.orders.courierMapWindow',
    
    requires: [
               'Ext.ux.GMapPanel',
               'SushimiConsole.view.operator.orders.ActionCourierMenu',
          		'Ext.grid.plugin.RowExpander',
           		'Ext.toolbar.Paging',
    ],
    
    title: 'Информация по курьерам',
    width: 900,
    height: 750,
    layout: 'border',
    resizable: true,
    id: 'mapWindow',
    maximized: false,
    maximizable: true,
    modal: true,
    closeAction: 'hide',
    scroll: true,
    
    items: [
            
            {
        		reference: 'couriersOnMap',
        		xtype: 'grid',
        		region: 'north',

        		viewConfig: { stripeRows: true },
                store: 'operator.CourierStore',
                id: 'couriersOnMapId',
                minHeight: 100,
                maxHeight: 400,
            	stateful: false,
            	border: true,
            	//contentEl: 'YMapsID',
            	tbar: [
            	       {text: "Показать всех курьеров", handler: 'allCourierView'},
            	       {text: "Обновить", handler: 'onRefreshStore'}
            	       ],
            	
            	columns: [
        		    {text: "Имя", dataIndex: 'name' , flex: 2},
                    {text: "Последняя активность", dataIndex: 'timeActive', flex: 2},
                    {text: "Взятые заказы", dataIndex: 'ordersOnDelivery', flex: 2}
            	],
            	
            	plugins: [{
                    ptype: 'rowexpander',
                    rowBodyTpl : new Ext.XTemplate(
                    		'<p>{addressesOnDelivery}</p>'

            		),
                }],
                
                listeners: {
                	
                	 cellclick: function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
         		        var record = iView.getRecord(iRowEl);
         		        var point = new YMaps.GeoPoint(record.data.geoLatitude, record.data.geoLongitude);
         		        console.log(record.data.geoLatitude, record.data.geoLongitude);
         		        Ext.getCmp('maps').map.setZoom( 16 );
         		        Ext.getCmp('maps').map.setCenter([record.data.geoLatitude, record.data.geoLongitude], 16, {checkZoomRange: true});
         		        console.log(Ext.getCmp('maps').map.getZoom());
         		        console.log(Ext.getCmp('maps').map.getCenter());
         		       // Ext.getCmp('maps').map.setCenter(point ,13);
         		        
         		    },
         		    
            		viewready: function () {
            			var grid = Ext.getCmp('couriersOnMapId');
            			this.store.load();
            			var styleIcon = null;
            	    	grid.getStore().each(function(record){
            	    		//console.log(record.data.geoLatitude + "   " + record.data.geoLongitude);
            	    		var point = new YMaps.GeoPoint(record.data.geoLatitude, record.data.geoLongitude);
            	    		//console.log(record.data.status);
            	    		if (record.data.status == 0)
            	    			styleIcon = "twirl#greyStretchyIcon";
            	    		else
            	    			styleIcon = "twirl#greenStretchyIcon";
            	    			
            	    		 var myPlacemark = new ymaps.Placemark([record.data.geoLatitude, record.data.geoLongitude], {
            	    			   
            	    			    iconContent: record.data.name
            	    			}, {
            	    			    preset: styleIcon,
            	    			    balloonCloseButton: false,
            	    			    hideIconOnBalloonOpen: false
            	    			});
            	    		Ext.getCmp('maps').myCollection.add(myPlacemark);
              	    	});
            	    	Ext.getCmp('maps').map.geoObjects.add( Ext.getCmp('maps').myCollection );
            		},
            		
            		
            		itemcontextmenu: function(view, record, item, index, e){
            			
             			e.stopEvent();
            			
            			if (this.rowMenu == null)
            				this.rowMenu = new SushimiConsole.view.operator.orders.ActionCourierMenu();

            				 this.rowMenu.showAt(e.getXY());
            			 }
            	}
            		
        	},
            
        	{
        		region: 'center',
        		myCollection: new ymaps.GeoObjectCollection(),
        		polyline: new ymaps.Polyline([], {hintContent: "Ломаная линия"}, {draggable: true, strokeColor: '#ff0000', strokeWidth: 5}),
        		contentEl: 'YMapsID',
        		id: 'maps',
        		map: new ymaps.Map("YMapsID", {center: [51.160893, 71.4500473], behaviors: ['default', 'scrollZoom'], zoom: 11}),
        		
				listeners: {
					viewready: function () {
						var grid = Ext.getCmp('couriersOnMapId');
						//console.log(store.getStore());
				    	grid.getStore().each(function(record){
				    		console.log(record);
				    		var point = new YMaps.GeoPoint(record.data.geoLatitude, record.data.geoLongitude);
				    		var placemark = new YMaps.Placemark(point, {style:"default#lightbluePoint"});
				    		console.log (placemark);
				    		this.map.addOverlay(placemark);
				
				
				
				    	});
					}
					}



                },
                
                  
    	
    	 ],
    	 
 

       
});