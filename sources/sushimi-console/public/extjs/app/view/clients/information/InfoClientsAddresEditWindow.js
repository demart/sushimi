Ext.define('SushimiConsole.view.clients.information.InfoClientsAddresEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'info-clients-addres-edit-window',
    
    reference: 'InfoClientsAddresEditWindow',
    
    title: 'Добавить/Изменить запись',
    width: 400,
    minWidth: 300,
    minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'code',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'InfoClientsAddresEditWindowForm',
        
        border: false,
        bodyPadding: 10,
        
        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold'
        },
        
        items: [{
            xtype: 'fieldcontainer',
            labelStyle: 'font-weight:bold;padding:0;',
            layout: 'fit',
            defaultType: 'textfield',
            fieldDefaults: {
                labelAlign: 'left'
            },
        
	        items: [
             {
	            flex: 1,
	            name: 'cityName',
	            itemId: 'cityName',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Город',
	            allowBlank: false
	        }, {
	            flex: 1,
	            name: 'streetName',
	            itemId: 'streetname',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Улица',
	            allowBlank: false
	        },
	        {
	            flex: 1,
	            name: 'house',
	            itemId: 'house',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Дом',
	            allowBlank: false
	        },
	        {
	            flex: 1,
	            name: 'building',
	            itemId: 'building',
	            fieldLabel: 'Строение',
	            allowBlank: true
	        },
	        {
	            flex: 1,
	            name: 'corpus',
	            itemId: 'corpus',
	            fieldLabel: 'Корпус',
	            allowBlank: true
	        },
	        {
	            flex: 1,
	            name: 'floor',
	            itemId: 'floor',
	            fieldLabel: 'Этаж',
	            allowBlank: true
	        },
	        {
	            flex: 1,
	            name: 'porch',
	            itemId: 'porch',
	            fieldLabel: 'Подъезд',
	            allowBlank: true
	        },
	        {
	            flex: 1,
	            name: 'flat',
	            itemId: 'flat',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Квартира',
	            allowBlank: false
	        }],
        }],

        buttons: [{
            text: 'Отмена',
            handler: 'onFormCancel'
        }, {
            text: 'Сохранить',
            handler: 'onFormSubmit'
        }]
    }]
});