Ext.define('SushimiConsole.view.order.window.CancelSiteOrderWindow', {
    extend: 'Ext.window.Window',
    xtype: 'cancel-site-order-window',
    
    reference: 'cancelSiteOrderWindow',
    
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
        reference: 'cancelSiteOrderWindowForm',
        
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
            handler: 'onCancelSiteOrderFormCancel'
        }, {
            text: 'Отменить заказ',
            handler: 'onCancelSiteOrderFormSubmit'
        }]
    }]
});