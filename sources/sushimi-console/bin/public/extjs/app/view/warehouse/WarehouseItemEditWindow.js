Ext.define('SushimiConsole.view.warehouse.WarehouseItemEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'warehouse-item-window',
    
    reference: 'warehouseItemEditWindow',
    
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
        reference: 'warehouseItemEditWindowForm',
        
        border: false,
        bodyPadding: 10,
        
        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 150,
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
	            reference: 'ingredientCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Выберите ингредиент',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                pageSize: 300,
                store: 'IngredientStore',
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'ingredientId',
	            itemId: 'ingredientId',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        },{
	            flex: 1,
	            name: 'amount',
	            itemId: 'amount',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Кол-во',
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
