Ext.define('SushimiConsole.view.dictionaries.product.ProductCostingEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'product-costing-edit-window',
    
    reference: 'productCostingEditWindow',
    
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
        reference: 'productCostingEditWindowForm',
        
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
	            reference: 'warehouseItemCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Выберите ингедиент склада',
                displayField: 'ingredientName',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                pageSize: 300,
                store: {
                    model: 'SushimiConsole.model.WarehouseItemModel',
                    pageSize: 300,
                    proxy: {
                        type: 'ajax',
                        url: '/rest/warehouse/item/store/read',
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
	            name: 'warehouseItemId',
	            itemId: 'warehouseItemId',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        }, {
	            flex: 1,
	            name: 'amount',
	            itemId: 'amount',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Кол-во ингредиента',
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
