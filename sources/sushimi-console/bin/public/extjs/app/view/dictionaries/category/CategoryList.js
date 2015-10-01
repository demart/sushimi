Ext.define('SushimiConsole.view.dictionaries.category.CategoryList' ,{
    extend: 'Ext.grid.Panel',
    controller: 'dictionaries.category',
    alias: 'widget.dictionaries.СategoryList',
    requires: [
   		'Ext.MessageBox',
   	    'SushimiConsole.view.dictionaries.category.CategoryListController',
   	    'SushimiConsole.view.dictionaries.category.CategoryEditWindow'
	],

	viewConfig: {
        stripeRows: true
    },
	title: 'Справочник категорий товаров',
    store: 'CategoryStore',
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
            {text: "Артикул", dataIndex: 'code' , flex: 1},
            {text: "Наименование", dataIndex: 'name' , flex: 4},
            {text: "Относиться к ", dataIndex: 'parentCategoryName' , flex: 2},
            {text: "Тип категории", dataIndex: 'type', width: 150},
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