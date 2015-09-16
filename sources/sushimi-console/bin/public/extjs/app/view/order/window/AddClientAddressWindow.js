Ext.define('SushimiConsole.view.order.window.AddClientAddressWindow', {
    extend: 'Ext.window.Window',
    xtype: 'order-add-client-address-window',
    
    id: 'addClientAddressWindow',
    reference: 'addClientAddressWindow',
    controller: 'order.window.newOrderWindow',

    title: 'Адрес клиента',
    width: 600,
    minWidth: 250,
    minHeight: 450,
    layout: 'fit',
    resizable: true,
    maximized: false,
    modal: true,
    closeAction: 'hide',
    defaultFocus: 'streetNameField',
    
    items: [{
    	layout: 'form',
    	bodyPadding: 0,
    	autoScroll: true,
    	defaults: {
            border:false
        },
        
        fieldDefaults: {
            labelWidth: 60,
            anchor: '100%'
        },

        layout: {
            type: 'vbox',
            align: 'stretch'  // Child items are stretched to full width
        },
        
        items: [{
            xtype: 'form',
            id: 'addClientAddressWindowForm',
            reference: 'addClientAddressWindowForm',
            
            border: false,
            bodyPadding: 0,
            
            fieldDefaults: {
                msgTarget: 'side',
                labelAlign: 'left',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            
            items: [{
	        	xtype:'tabpanel',
	        	bodyPadding: 10,
	        	items: [{
	                title: 'Адресные данные',
	                items: [
						/*{
				            flex: 1,
				            xtype: 'combo',
			                fieldLabel: 'Город',
			                displayField: 'name',
			                valueField: 'id',
			                anchor: '-15',
			                store: {
			                    model: 'SushimiConsole.model.CityModel',
			                    proxy: {
			                        type: 'ajax',
			                        url: '/rest/dictionary/city/store/read',
			                        reader: {
			                        	type: 'json',
			                            rootProperty: 'data',
			                            successProperty: 'success',
			                            totalProperty: 'totalCount',
			                            idProperty: 'id'
			                        }
			                    },
			                    autoDestroy: true
			                },
			                minChars: 5,
			                queryParam: 'q',
			                queryMode: 'remote',
				            name: 'cityId',
				            itemId: 'cityId',
				            afterLabelTextTpl: [
				                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				            ],
				            allowBlank: false,
				        }, {
		    	            reference: 'addAddressTypeCbx',
		    	            flex: 1,
		    	            xtype: 'combo',
		                    fieldLabel: 'Тип адреса',
		                    displayField: 'name',
		                    valueField: 'id',
		                    anchor: '-15',
		                    store: {
		                        fields: [
		                             {name: 'id'},
		                             {name: 'name'},
		                        ],
		                        data: [
		                               ['NONE', 'Не указано'],
		                               ['HOME', 'Домашний адрес'],
		                               ['OFFICE', 'Офис'],
		                         ],
		                    },
		                    minChars: 5,
		                    queryParam: 'q',
		                    queryMode: 'remote',
		    	            name: 'addressType',
		    	            itemId: 'addressType',
		    	            afterLabelTextTpl: [
		    	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
		    	            ],
		    	            allowBlank: false,
		    	        },  {
						    xtype: 'textfield',
						    name: 'phoneNumber',
						    fieldLabel: 'Телефон',
						    itemId: 'phoneNumber',
						    allowBlank: true,
						}, */
						{
							id:'streetNameField',
							xtype: 'textfield',
						    name: 'streetName',
						    fieldLabel: 'Улица',
						    itemId: 'streetName',
						    afterLabelTextTpl: [
				                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				            ],
						    allowBlank: false,
						    width: 560,
						}, 
						{
							xtype: 'container',
							layout: {
						        type: 'hbox',
						        pack: 'start',
						        align: 'stretch'
						    },
						    bodyPadding: 5,

						    items: [{
						    	margin: '0 10 0 0',
						    	items: [
						    	{
								    xtype: 'textfield',
								    name: 'house',
								    fieldLabel: 'Дом',
								    itemId: 'house',
								    allowBlank: true,
								}, {
								    xtype: 'textfield',
								    name: 'corpus',
								    fieldLabel: 'Корпус',
								    itemId: 'corpus',
								    allowBlank: true,
								}, {
								    xtype: 'textfield',
								    name: 'building',
								    fieldLabel: 'Здание',
								    itemId: 'building',
								    allowBlank: true,
								}, {
								    xtype: 'textfield',
								    name: 'flat',
								    fieldLabel: 'Квартира',
								    itemId: 'flat',
								    allowBlank: true,
								},] 
						    }, {
						    	items: [
						    	{
								    xtype: 'textfield',
								    name: 'porch',
								    fieldLabel: 'Подъезд',
								    itemId: 'porch',
								    allowBlank: true,
								}, {
								    xtype: 'textfield',
								    name: 'doorCode',
								    fieldLabel: 'Код домофона',
								    itemId: 'doorCode',
								    allowBlank: true,
								}, {
								    xtype: 'textfield',
								    name: 'floor',
								    fieldLabel: 'Этаж',
								    itemId: 'floor',
								    allowBlank: true,
								}, {
								    xtype: 'textfield',
								    name: 'room',
								    fieldLabel: 'Номер комнаты',
								    itemId: 'room',
								    allowBlank: true,
								}, {
								    xtype: 'textfield',
								    name: 'office',
								    fieldLabel: 'Номер офиса',
								    itemId: 'office',
								    allowBlank: true,
								},]
						    }],
						},
						 {
						    xtype: 'textareafield',
						    name: 'comment',
						    fieldLabel: 'Комментарии',
						    itemId: 'comment',
						    allowBlank: true,
						    width: 560,
						},
	                ]
	            },{
	                title: 'Геопозиция',
	                items: [
						{
						    xtype: 'textfield',
						    name: 'geoLatitude',
						    itemId: 'geoLatitude',
						    fieldLabel: 'Широта',
						    allowBlank: true,
						}, {
						    xtype: 'textfield',
						    name: 'geoLongitude',
						    fieldLabel: 'Долгота',
						    itemId: 'geoLongitude',
						    allowBlank: true,
						}, {
							id: 'yandexMapId',
							xtype: 'panel',
							frame: true,
							width: 580,
							height: 280,
							title: 'Карта',
							html: '<iframe src="/client/address/chooseOnMap" style="width:575px; height:244px;"></iframe>',
						} 
	                ],
	            }],
            }],
        }],
	
    buttons: [{
        text: 'Выбрать клиента и адрес доставки',
        handler: 'onAddClientAddressFormClick'
    }, {
        text: 'Закрыть',
        handler: 'onResetAddClientAddressFormtClick'
    }],
    
    }],
});