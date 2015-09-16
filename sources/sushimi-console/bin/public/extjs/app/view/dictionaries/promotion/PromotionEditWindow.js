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
    			fieldLabel: 'Опубликовать',
                xtype: 'checkbox',
                boxLabel: 'ДА',
	           // itemId: 'isPublished',
                name: 'isPublished',
                inputValue: 'true',
              //  checked:'false',
	        },
	        {
                xtype: 'checkbox',
                boxLabel: 'НЕТ',
	           // itemId: 'isPublished',
                name: 'isPublished',
                inputValue: 'false',
                //checked:'false',
	        },

	        
	        {
    			fieldLabel: 'Тип акции',
                xtype: 'checkbox',
                boxLabel: 'По времени',
                name: 'type',
                inputValue: 'PERIOD',
               // checked:'true',
	        },
	        {
                xtype: 'checkbox',
                boxLabel: 'День рождение',
                name: 'type',
                inputValue: 'BIRTHDATE',
              //  checked:'true',
	        },
	       {
	        			fieldLabel: 'Тип подарка',
	                    xtype: 'checkbox',
	                    boxLabel: 'Продукт',
	                    name: 'valueType',
	    	            itemId: 'valueType',
	                    inputValue: 'PRODUCT',
	                    //checked:'true',
	        },
		    {
                xtype: 'checkbox',
                boxLabel: 'Скидка',
	          //  itemId: 'valueType',
                name: 'valueType',
                inputValue: 'DISCOUNT',
               // checked:'true',
		    },
		    {
                xtype: 'checkbox',
                boxLabel: 'Скидка на все',
	           // itemId: 'valueType',
                name: 'valueType',
                inputValue: 'DISCOUNT_ALL',
               // checked:'true',
		    },
		    {
                xtype: 'checkbox',
                boxLabel: 'Скидка и продукт',
	           // itemId: 'valueType',
                name: 'valueType',
                inputValue: 'DP',
               // checked:'true',
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
