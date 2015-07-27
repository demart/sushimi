Ext.define('SushimiConsole.view.warehouse.WarehouseOutcomeEditWindow', {
    extend: 'Ext.window.Window',
    xtype: 'warehouse-outcome-edit-window',
    
    reference: 'warehouseOutcomeEditWindow',
    
    title: 'Добавить/Изменить запись',
    width: 450,
    minWidth: 300,
    minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'code',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'warehouseOutcomeEditWindowForm',
        
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
				reference: 'warehouseOutcomeTypeCbx',
			    xtype: 'combo',
			    fieldLabel: 'Тип расхода',
			    displayField: 'name',
			    valueField: 'id',
			    anchor: '-15',
			    labelWidth: 130,
			    queryMode: 'local',
			    name: 'type',
			    itemId: 'type',
			    store: {
			    	 type: 'warehouseOutcomeType'
			    },
			    afterLabelTextTpl: [
			        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
			    ],
			    allowBlank: false,
			},/* {
			    flex: 1,
			    xtype: 'datefield',
			    name: 'outcomeDate',
			    itemId: 'outcomeDate',
			    format: 'd.m.Y',
			    fieldLabel: 'Дата расхода',
			    afterLabelTextTpl: [
	                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
	            ],
	            allowBlank: false,
			},*/  {
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
			    name: 'amount',
			    itemId: 'amount',
			    afterLabelTextTpl: [
			        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
			    ],
			    fieldLabel: 'Кол-во',
			    allowBlank: false
			}, {
			    flex: 1,
			    name: 'outcomeReason',
			    itemId: 'outcomeReason',
			    afterLabelTextTpl: [
			        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
			    ],
			    fieldLabel: 'Причина',
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
