
Ext.define("SushimiWebAdmin.view.dictionaries.category.CategoryList",{
    extend: "Ext.grid.Panel",

    requires: [
        "SushimiWebAdmin.view.dictionaries.category.CategoryListController",
        "SushimiWebAdmin.view.dictionaries.category.EditWindowCategoryList"
    ],

    controller: "dictionaries-category-categorylist",
    viewConfig: { stripeRows: true },
    
   	title: 'Справочник категорий',
    store: 'CategoryStore',
   	stateful: false,
    columnLines: true,
    enableLocking: true,
   	
   	tbar: [
   	       {
           text: 'Изменить',
           handler: 'editCurrentCategory'
       },{
           text: 'Обновить',
           handler: 'onRefreshStore',
       }],
   	
   	columns: [
   			{text: "Название", dataIndex: 'name' , flex: 1},
   			{text: "Тип", dataIndex: 'type' , renderer: function (value) {
            	if (value == "SUSHI") return "Суши";
            	else if (value == "ANTISUSHI") return "Антисуши";
            	else if (value == "BOTH") return "Напитки";
            }, flex: 1},
   			{text: "Родительская категория", dataIndex: 'parentName' , flex: 1},
            {text: "Публикция", dataIndex: 'published', xtype:'booleancolumn', trueText:'Да', falseText:'Нет', flex: 1},
            {text: "Нахождение в меню", dataIndex: 'topMenu', xtype:'booleancolumn', trueText:'Да', falseText:'Нет', flex: 1},

   			
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
