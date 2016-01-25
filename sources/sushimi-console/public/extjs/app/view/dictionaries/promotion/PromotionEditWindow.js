Ext.define('SushimiConsole.view.dictionaries.promotion.PromotionEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'promotion-edit-window',
    
    reference: 'promotionEditWindow',
    
    
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
        reference: 'promotionEditWindowForm',
        
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
	            fieldLabel: 'Название акции',
	            allowBlank: false
	        },
	        {
	            flex: 1,
	            name: 'orderSum',
	            itemId: 'orderSum',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Сумма заказа',
	            allowBlank: false
	        },
	        {
	            flex: 1,
	            name: 'discount',
	            itemId: 'discount',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Скидка',
	            allowBlank: false
	        },

	        {
			    xtype: 'datefield',
			    name: 'fromTime',
			    fieldLabel: 'Начало акции',
			    itemId: 'fromTime',
			  //  minValue: new Date(),
			    reference: 'fromTime',
			  //  value: null,
			    id: 'fromTime',
			    margin: '0 15 0 0',
			    //allowBlank: false

	        },
	        {
			    xtype: 'datefield',
			    name: 'toTime',
			    id: 'toTime',
			    itemId: 'toTime',
			   // minValue: new Date(),
			   // value: null,
			    width: 170,
			    margin: '0 15 0 0',
			    fieldLabel: 'Конец акции',
			  // allowBlank: false
	        },
	        {
	            xtype: 'radiogroup',
	            fieldLabel : 'Публикация',
	           // defaultType: 'radiogroup',
	            columns: 1,
	            vertical: true,
	            allowBlank: false,
	            afterLabelTextTpl: [
	            	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            	            ],
	            items: [
	                {
	                    boxLabel  : 'Да',
	                    name      : 'isPublished',
	                    inputValue: 'true',
	                    //checked: true,
	                    id        : 'checkbox1'
	                }, {
	                    boxLabel  : 'Нет',
	                    name      : 'isPublished',
	                    inputValue: 'false',
	                    //checked   : true,
	                    id        : 'checkbox2'
	                }]
	        },
	        {
	            xtype: 'radiogroup',
	            fieldLabel : 'Тип акции',
	           // defaultType: 'radiogroup',
	            columns: 1,
	            vertical: true,
	            allowBlank: false,
	            afterLabelTextTpl: [
	            	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            	            ],
	            items: [
	                    {
		                    boxLabel  : 'По времени',
		                    name      : 'type',
		                    inputValue: 'PERIOD',
		                    id        : 'checkbox3'
		                   // checked: true,
		                   // id        : 'checkbox1'
		                }, {
		                    boxLabel  : 'День рождение',
		                    name      : 'type',
		                    inputValue: 'BIRTHDATE',
		                    id        : 'checkbox4'
		                   // checked   : true,
		                    //id        : 'checkbox2'
		                }]
	        },	       
	        	        
	        {
	        	xtype: 'radiogroup',
	            fieldLabel : 'Тип подарка',
	           // defaultType: 'radiogroup',
	            columns: 1,
	            vertical: true,
	            allowBlank: false,
	            afterLabelTextTpl: [
	            	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            	            ],
	            items: [
	                {
	                    boxLabel: 'Скидка',
	                    name: 'valueType',
	                    inputValue: 'DISCOUNT',
	                    id        : 'checkbox5'
	                }, {
	                    boxLabel: 'Скидка на все',
	                     name: 'valueType',
	                     inputValue: 'DISCOUNT_ALL',
	                     id        : 'checkbox6'
	                }, {
	                	 boxLabel: 'Скидка и продукт',
	                      name: 'valueType',
	                      inputValue: 'DP',
	                      id        : 'checkbox7'
	                },
	                {
	                	 boxLabel: 'Продукт',
	                      name: 'valueType',
	                      inputValue: 'PRODUCT',
	                      id        : 'checkbox8'
	                }
	                
	                
	                ]
	        },
	       

		    {
	            reference: 'product',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Выберите продукт',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                pageSize: 300,
                store: {
                    model: 'SushimiConsole.model.ProductModel',
                    pageSize: 300,
                    proxy: {
                        type: 'ajax',
                        url: '/rest/dictionary/product/store/read',
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
	            name: 'productId',
	            itemId: 'productId',
	            value: '0',
	            allowBlank: true,
	        },
	        {
	            flex: 1,
	            name: 'productCount',
	            itemId: 'productCount',
	            fieldLabel: 'Количество',
	            value: '0',
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
