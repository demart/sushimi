Ext.define('SushimiWebAdmin.view.dictionaries.announcements.EditWindowAnnouncementsList', {
    extend: 'Ext.window.Window',
    xtype: 'announcements-edit-window',
    
    reference: 'announcementsEditWindow',
    
    title: 'Добавить/Изменить запись',
    width: 300,
   // minWidth: 300,
    height: 610,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'name',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'announcementsEditWindowForm',
        
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
	            name: 'title',
	            itemId: 'title',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Заголовок',
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
	            flex: 1,
	            xtype: 'htmleditor',
	            name: 'content',
	            itemId: 'content',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Контент',
	            allowBlank: false
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
			    xtype: 'datefield',
			    name: 'publishedDate',
			    id: 'publishedDate',
			    itemId: 'publishedDate',
			    //width: 170,
			    margin: '0 15 0 0',
			    fieldLabel: 'Начало публикации',
	            afterLabelTextTpl: [
	            	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            	            ],
	            allowBlank: false,
	        },
	        {
			    xtype: 'datefield',
			    name: 'endDate',
			    id: 'endDate',
			    itemId: 'endDate',
			    //width: 170,
			   // margin: '0 15 0 0',
			    fieldLabel: 'Конец публикации',
	            afterLabelTextTpl: [
	            	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            	            ],
	            allowBlank: false,
	        },
	        {
	            flex: 1,
	            name: 'year',
	            itemId: 'year',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Год',
	            allowBlank: false
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
