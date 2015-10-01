Ext.define('SushimiConsole.view.warehouse.WarehouseIncomeEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'warehouse-income-edit-window',
    
    reference: 'warehouseIncomeEditWindow',
    
    requires: [
	'SushimiConsole.model.UserModel'          
   ],
    
    title: 'Добавить/Изменить запись',
    width: 550,
    minWidth: 300,
    minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'code',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'warehouseIncomeEditWindowForm',
        
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
            layout: 'form',
            defaultType: 'textfield',
            fieldDefaults: {
                labelAlign: 'left'
            },
        
	        items: [{
	        	reference: 'warehouseIncomeTypeCbx',
	            xtype: 'combo',
                fieldLabel: 'Тип прихода',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                queryMode: 'local',
	            name: 'type',
	            itemId: 'type',
	            store: {
	            	 type: 'warehouseIncomeType'
	            },
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        },/* {
	            flex: 1,
	            name: 'invoiceNumber',
	            itemId: 'invoiceNumber',
	            fieldLabel: 'Номер накладной',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        },*/ /*{
	            flex: 1,
	            xtype: 'datefield',
	            name: 'incomeDate',
	            itemId: 'incomeDate',
	            format: 'd.m.Y',
	            format: 'd.m.Y H:i:s',
	            fieldLabel: 'Дата закупа',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        }, */ {
	            reference: 'warehouseItemCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Позиция на складе',
                displayField: 'ingredientName',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
				pageSize: 300,
                store: {
                    model: 'SushimiConsole.model.WarehouseItemModel',
                    proxy: {
                        type: 'ajax',
                        url: '/rest/warehouse/item/store/read',
						pageSize: 300,
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
	            name: 'grossWeight',
	            itemId: 'grossWeight',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Вес (брутто)',
	            allowBlank: false
	        }, {
	            reference: 'grossUnitCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Единица измерения (брутто)',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                store: {
                    model: 'SushimiConsole.model.UnitModel',
                    proxy: {
                        type: 'ajax',
                        url: '/rest/dictionary/unit/store/read',
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
	            name: 'grossUnitId',
	            itemId: 'grossUnitId',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
	        },{
	            flex: 1,
	            name: 'netWeight',
	            itemId: 'netWeight',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Вес (нетто)',
	            allowBlank: false
	        }, {
	            flex: 1,
	            name: 'price',
	            itemId: 'price',
	            afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            fieldLabel: 'Цена закупа',
	            allowBlank: false
	        }, {
	            reference: 'purchaseUserCbx',
	            flex: 1,
	            xtype: 'combo',
                fieldLabel: 'Закупщик',
                displayField: 'name',
                valueField: 'id',
                anchor: '-15',
                labelWidth: 130,
                store: {
                    model: 'SushimiConsole.model.UserModel',
                    proxy: {
                        type: 'ajax',
                        url: '/rest/user/store/read',
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
	            name: 'purchaseUserId',
	            itemId: 'purchaseUserId',
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
