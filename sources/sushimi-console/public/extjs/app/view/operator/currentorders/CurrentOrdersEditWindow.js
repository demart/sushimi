Ext.define('SushimiConsole.view.operator.currentorders.CurrentOrdersEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'currentorders-edit-window',
    
    reference: 'currentOrdersEditWindow',
    
    title: 'Добавить/Изменить запись',
    width: 200,
    minWidth: 300,
    minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'name',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'currentOrdersEditWindowForm',
        
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
	            name: 'clientName',
	            itemId: 'clientName',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Название',
	            allowBlank: false
	        }, ],
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
