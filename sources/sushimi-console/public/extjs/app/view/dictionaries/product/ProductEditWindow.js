Ext.define('SushimiConsole.view.dictionaries.product.ProductEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'product-edit-window',
    
    reference: 'productEditWindow',
    
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
        reference: 'productEditWindowForm',
        
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
        
	        items: [{
	            flex: 1,
	            name: 'code',
	            itemId: 'code',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Артикул товара',
	            allowBlank: false
	        }, {
	            flex: 1,
	            name: 'name',
	            itemId: 'name',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Название',
	            allowBlank: false
	        }, {
	            flex: 1,
	            name: 'description',
	            itemId: 'description',
	            /*afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],*/
	            fieldLabel: 'Описание',
	            allowBlank: true,
	        }, {
	            flex: 1,
	            name: 'costPrice',
	            itemId: 'costPrice',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Себестоимость',
	            allowBlank: false
	        }, {
	            flex: 1,
	            name: 'cost',
	            itemId: 'cost',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Цена на сайте',
	            allowBlank: false
	        }, {
	            flex: 1,
	            name: 'barCost',
	            itemId: 'barCost',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Цена в баре',
	            allowBlank: false
	        }, {
	            reference: 'categoryCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Выберите категорию',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 100,
                pageSize: 300,
                store: {
                    model: 'SushimiConsole.model.CategoryModel',
                    pageSize: 300,
                    proxy: {
                        type: 'ajax',
                        url: '/rest/dictionary/category/store/read',
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
	            name: 'categoryId',
	            itemId: 'categoryId',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        }, {
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Тип',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                queryMode: 'local',
	            name: 'type',
	            itemId: 'type',
	            store: {
	            	type: 'productType'
	            },
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        }, {
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Чей продукт',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                queryMode: 'local',
	            name: 'owner',
	            itemId: 'owner',
	            store: {
	            	type: 'productOwnerType'
	            },
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: true,
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
