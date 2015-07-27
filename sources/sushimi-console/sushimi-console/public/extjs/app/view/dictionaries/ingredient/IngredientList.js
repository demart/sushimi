Ext.define('SushimiConsole.view.dictionaries.ingredient.IngredientList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'dictionaries.ingredient',
    alias: 'widget.dictionaries.IngredientList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.dictionaries.ingredient.IngredientListController',
   	    'SushimiConsole.view.dictionaries.ingredient.IngredientEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Справочник ингридиентов',
    store: 'IngredientStore',
	stateful: false,
	
	tbar: [{
        text: 'Добавить',
        handler: 'showAddWindow'
    }, {
        text: 'Изменить',
        handler: 'showEditWindow'
    },{
        text: 'Удалить',
        handler: 'onDeleteRecord',
    },{
        text: 'Обновить',
        handler: 'onRefreshStore',
    }],
	
	columns: [
			{text: "№", dataIndex: 'id', width: 50},
            {text: "Наименование", dataIndex: 'name' , flex: 3},
            {text: "Единица измерения", dataIndex: 'unitName' , flex: 2},
            {text: "Пользователь", dataIndex: 'user', width:150},
			{text: "Дата создания", dataIndex: 'createdDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 150},
			{text: "Дата изменения", dataIndex: 'modifiedDate', xtype: 'datecolumn', format: 'd.m.Y H:i:s', width: 150},
	],
		
    initComponent: function() {
        this.callParent(arguments);
    },


	listeners: {
	    viewready: function(){
	       this.store.load();
	       this.view.refresh();
	    }
	 },

});