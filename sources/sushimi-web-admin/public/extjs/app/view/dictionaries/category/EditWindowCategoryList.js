Ext.define('SushimiWebAdmin.view.dictionaries.category.EditWindowCategoryList', {
    extend: 'Ext.window.Window',
    xtype: 'category-edit-window',
    
    reference: 'categoryEditWindow',
    
    title: 'Добавить/Изменить запись',
    width: 200,
    minWidth: 300,
    height: 380,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'name',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'categoryEditWindowForm',
        
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
                           ['ANTISUSHI', 'Антисуши'],
                           ['BOTH', 'Напитки'],
                         

                     ],
                },
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'type',
	            value: 'Не указана',
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
	            reference: 'parentCategory',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Основная категория',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                publishes: 'value',
                store: 'CategoryComboStore',
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'parentId',
	            itemId: 'parentId',
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
