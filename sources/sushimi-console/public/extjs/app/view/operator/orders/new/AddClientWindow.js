Ext.define('SushimiConsole.view.operator.orders.new.AddClientWindow', {
    extend: 'Ext.window.Window',
    xtype: 'order-add-client-window',
    
    id: 'addClientWindow',
    reference: 'addClientWindow',
    controller: 'operator.orders.new.newOrderWindow',

    title: 'Информация о клиенте',
    width: 400,
    minWidth: 250,
    minHeight: 450,
    layout: 'fit',
    resizable: true,
    maximized: false,
    modal: true,
    closeAction: 'hide',
    defaultFocus: 'addClientNameField',
    
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
            id: 'addClientWindowForm',
            reference: 'addClientWindowForm',
            
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
                    labelAlign: 'top'
                },
            
    	        items: [{
    	            flex: 1,
    	            id: 'addClientNameField',
    	            xtype: 'textfield',
    	            name: 'name',
    	            itemId: 'name',
    	            afterLabelTextTpl: [
    	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
    	            ],
    	            fieldLabel: 'ФИО',
    	            allowBlank: false,
    	            
    	        },	
    	        /* {
    	            flex: 1, xtype: 'textfield', name: 'iin', itemId: 'iin', fieldLabel: 'ИНН', allowBlank: true,
    	        },*/ 
    	        {
    	            flex: 1,
    	            xtype: 'numberfield',
    	            name: 'phoneNumber',
    	            itemId: 'phoneNumber',
    	            afterLabelTextTpl: [
    	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
    	            ],
    	            fieldLabel: 'Телефон',
    	            allowBlank: false,
    	            
    	        }, {
    	            flex: 1, xtype: 'textfield', name: 'email', itemId: 'email', fieldLabel: 'Email', allowBlank: true,
    	        }, {
    	            reference: 'addClientTypeCbx',
    	            flex: 1,
    	            xtype: 'combo',
                    fieldLabel: 'Тип клиента',
                    displayField: 'name',
                    valueField: 'id',
                    value: 'PHYSICAL',
                    anchor: '-15',
                    labelWidth: 130,
                    store: {
                        fields: [
                             {name: 'id'},
                             {name: 'name'},
                        ],
                        data: [
                               ['PHYSICAL', 'Физическое лицо'],
                               ['LEGAL', 'Юридическое лицо']
                         ],
                    },
                    minChars: 5,
                    queryParam: 'q',
                    queryMode: 'remote',
    	            name: 'type',
    	            itemId: 'type',
    	            afterLabelTextTpl: [
    	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
    	            ],
    	            allowBlank: false,
    	        }, {
    	            reference: 'addClientStatusCbx',
    	            flex: 1,
    	            xtype: 'combo',
                    fieldLabel: 'Статус клиента',
                    displayField: 'name',
                    valueField: 'id',
                    value: 'ORDINAL',
                    anchor: '-15',
                    labelWidth: 130,
                    store: {
                        fields: [
                             {name: 'id'},
                             {name: 'name'},
                        ],
                        data: [
                               ['ORDINAL', 'Клиент'],
                               ['VIP', 'VIP'],
                               ['BLOCKED', 'Заблокированный'],
                         ],
                    },
                    minChars: 5,
                    queryParam: 'q',
                    queryMode: 'remote',
    	            name: 'status',
    	            itemId: 'status',
    	            afterLabelTextTpl: [
    	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
    	            ],
    	            allowBlank: false,
    	        }, {
    	            flex: 1, xtype: 'textareafield', name: 'comment', itemId: 'comment',
    	            fieldLabel: 'Доп. информация', allowBlank: true,
    	        }],
            }],
	
    buttons: [{
        text: 'Выбрать клиента и адрес доставки',
        handler: 'onAddClientFormClick'
    }, {
        text: 'Закрыть',
        handler: 'onResetAddClientFormtClick'
    }],
	
    }],
    
    }],
});