
Ext.define("SushimiWebAdmin.view.dictionaries.announcements.AnnouncementsList",{
    extend: "Ext.grid.Panel",

    requires: [
        "SushimiWebAdmin.view.dictionaries.announcements.AnnouncementsListController",
        "SushimiWebAdmin.view.dictionaries.announcements.EditWindowAnnouncementsList"
    ],

    controller: "dictionaries-announcements-announcementslist",
    viewConfig: { stripeRows: true },
    
   	title: 'Справочник новостей',
    store: 'AnnouncementsStore',
   	stateful: false,
    columnLines: true,
  //  enableLocking: true,
   	
   	tbar: [
   	       {
           text: 'Изменить',
           handler: 'editCurrentAnnouncement'
       },{
           text: 'Обновить',
           handler: 'onRefreshStore',
       }],
   	
   	columns: [
   			{text: "Название", dataIndex: 'title' , flex: 1},
   			{text: "Описание", dataIndex: 'description' , flex: 2},
            {text: "Публикция", dataIndex: 'published', xtype:'booleancolumn', trueText:'Да', falseText:'Нет', align: 'center', width: 90},
            {text: "Год", dataIndex: 'year', width: 60},
            {text: "Начало публикации", dataIndex: 'publishedDate', xtype: 'datecolumn', align: 'center', format: 'd.m.Y', width: 150},
            {text: "Конец публикации", dataIndex: 'endDate', xtype: 'datecolumn', align: 'center', format: 'd.m.Y', width: 150},
   			
            ],
            
      plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                		'<b>Контент:</b></br> {content:this.isExistContent}', {
                			isExistContent: function(v){
                                return v;
                            }

                		}
                		
        		),
            }],
   		
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
