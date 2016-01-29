Ext.define('SushimiWebAdmin.view.dictionaries.staff.EditWindowStaffList', {
    extend: 'Ext.window.Window',
    xtype: 'staff-edit-window',
    
    reference: 'staffEditWindow',
    
    title: 'Добавить/Изменить запись',
    width: 200,
    minWidth: 300,
    height: 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'name',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'staffEditWindowForm',
        
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
	            fieldLabel: 'Имя',
	            allowBlank: false
	        }, 
	        {
	            flex: 1,
	            name: 'login',
	            itemId: 'login',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Логин',
	            allowBlank: false
	        },
	        {
	            flex: 1,
	            name: 'password',
	            itemId: 'password',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Пароль',
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
	            reference: 'colorCombo',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Роль:',
                displayField: 'name',
                valueField: 'role',
                id: 'roleComboListForStaff',
                anchor: '-15',
                labelWidth: 130,
                autoRender: true,
                store: {
                    fields: [
                         {name: 'role'},
                         {name: 'name'},
                    ],
                    data: [
                           ['OPERATOR', 'Оператор'],
                           ['DIRECTOR', 'Директор'],
                           ['COOK', 'Повар'],
                           ['COURIER', 'Курьер'],

                     ],
                },
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'role',
	            value: 'Не указана',
	            itemId: 'role',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        },	
	        {
	            reference: 'enabledStaffCombo',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Статус:',
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
                           ['true', 'Активирован'],
                           ['false', 'Отключен'],
                         

                     ],
                },
                minChars: 5,
                queryParam: 'q',
                queryMode: 'remote',
	            name: 'enabled',
	            value: 'Не указан',
	            itemId: 'enabled',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
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
