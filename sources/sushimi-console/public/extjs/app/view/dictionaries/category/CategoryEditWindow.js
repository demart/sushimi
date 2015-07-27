Ext.define('SushimiConsole.view.dictionaries.category.CategoryEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'category-edit-window',
    
    reference: 'categoryEditWindow',
    
    title: 'Добавить/Изменить запись',
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
	            name: 'code',
	            itemId: 'code',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Артикул категории',
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
	        	/*bind: {
	                disabled: '{!parentCategory.checked}'
	            },*/
	            reference: 'parentCategoryCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Выберите родительскую категорию',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
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
	            name: 'parentCategoryId',
	            itemId: 'parentCategoryId',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: true,
	        }, {
	            xtype: 'button',
	            text: 'Очистить категорию',
	            reference: 'parentCategory',
	            listeners: {
	            	click: 'changeParentCategory'
	            }
	        }, {
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Тип категории',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                queryMode: 'local',
	            name: 'type',
	            itemId: 'type',
	            store: {
	            	 type: 'categoryType'
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
