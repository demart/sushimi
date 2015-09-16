Ext.define('SushimiConsole.view.order.window.CancelOrderWindow', {
    extend: 'Ext.window.Window',
    xtype: 'cancel-order-window',
    
    reference: 'cancelOrderWindow',
    
    title: 'Оменить заказ',
    width: 200,
    minWidth: 300,
    minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'code',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'cancelOrderWindowForm',
        
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
	            reference: 'cancelOrderTypeCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Тип отмены заказа:',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                store: {
                    fields: [
                         {name: 'id'},
                         {name: 'name'},
                    ],
                    data: [
                           ['CANCELED', 'Отменен'],
                           ['RETURNED', 'Возврат (Отказ по доставке)']
                     ],
                },
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'state',
	            itemId: 'state',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        }, {
	            flex: 1,
	            xtype: 'textareafield',
	            name: 'reason',
	            itemId: 'reason',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Причина отказа',
	            allowBlank: false
	        }],
        }],

        buttons: [{
            text: 'Отмена',
            handler: 'onCancelOrderFormCancel'
        }, {
            text: 'Cформировать отказ',
            handler: 'onCancelOrderFormSubmit'
        }]
    }]
});