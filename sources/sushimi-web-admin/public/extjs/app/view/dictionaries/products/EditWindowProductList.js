Ext.define('SushimiWebAdmin.view.dictionaries.products.EditWindowProductList', {
    extend: 'Ext.window.Window',
    xtype: 'product-edit-window',
    
    reference: 'productEditWindow',
    
    title: 'Добавить/Изменить запись',
    width: 200,
    minWidth: 300,
    height: 450,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'name',
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
                labelAlign: 'top'
            },
        
	        items: [{
	            flex: 1,
	            name: 'name',
	            itemId: 'name',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Название',
	            allowBlank: false
	        }, 
	        {
	            flex: 1,
	            name: 'code',
	            itemId: 'code',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Код',
	            allowBlank: false
	        },
	        {
	            flex: 1,
	            name: 'cost',
	            itemId: 'cost',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Цена',
	            allowBlank: false
	        },
	        {
	            flex: 1,
	            name: 'description',
	            itemId: 'description',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Описание',
	            allowBlank: false
	        },
	        {
	            reference: 'typeCombo',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Тип:',
                displayField: 'name',
                valueField: 'type',
                id: 'typeComboListForCategory',
                anchor: '-15',
                labelWidth: 130,
                autoRender: true,
                store: {
                    fields: [
                         {name: 'type'},
                         {name: 'name'},
                    ],
                    data: [
                           ['SUSHI', 'Суши'],
                           ['PIZZA', 'Пицца'],
                           ['NONE', 'Без типа'],
                           ['SOY', 'Соя'],
                           ['IMBIR', 'Имбирь'],
                           ['VASABI', 'Васаби']
                         

                     ],
                },
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'type',
	            value: 'Не указан',
	            itemId: 'type',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        },
	        {
	            reference: 'publishedCombo',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Публикация:',
                displayField: 'name',
                valueField: 'answer',
                id: 'publishedComboListForCategory',
                anchor: '-15',
                labelWidth: 130,
                autoRender: true,
                store: {
                    fields: [
                         {name: 'answer'},
                         {name: 'name'},
                    ],
                    data: [
                           ['true', 'Да'],
                           ['false', 'Нет'],
                         

                     ],
                },
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'published',
	            value: 'Не указана',
	            itemId: 'published',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        },
		    {
	            reference: 'categoryOfProduct',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Категория',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                publishes: 'value',
                store: 'CategoryComboStore',
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'categoryId',
	            itemId: 'categoryId',
	            value: '0',
	            allowBlank: true,
	        },
	        ],
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
