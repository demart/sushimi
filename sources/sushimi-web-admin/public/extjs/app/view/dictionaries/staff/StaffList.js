
Ext.define("SushimiWebAdmin.view.dictionaries.staff.StaffList",{
    extend: "Ext.grid.Panel",

    
    	requires: [
    	           "SushimiWebAdmin.view.dictionaries.staff.StaffListController",
    	           "SushimiWebAdmin.view.dictionaries.staff.EditWindowStaffList",
    	           ],

       controller: "dictionaries-staff-stafflist",

        viewConfig: { stripeRows: true },
           
       	title: 'Справочник персонала',
        store: 'StaffStore',
       	stateful: false,
        columnLines: true,
        enableLocking: true,
       	
       	tbar: [{
               text: 'Добавить',
               handler: 'addNewStaff'
           }, {
               text: 'Изменить',
               handler: 'editCurrentStaff'
           },{
               text: 'Обновить',
               handler: 'onRefreshStore',
           }],
       	
       	columns: [
       			{text: "Имя", dataIndex: 'name' , flex: 1},
       			{text: "Логин", dataIndex: 'login' , flex: 1},
                {text: "Пароль", dataIndex: 'password', flex: 1},
                {text: "Код", dataIndex: 'code', flex: 1},
                {text: "Роль", dataIndex: 'role', renderer: function (value) {
                	if (value == "OPERATOR") return "Оператор";
                	else if (value == "DIRECTOR") return "Директор";
                	else if (value == "COURIER") return "Курьер";
                	else if (value == "COOK") return "Повар";
                } ,flex: 1},
                {text: "Статус", dataIndex: 'enabled', renderer: function (value) {
                	if (value == true) return "Активен";
                	else if (value == false) return "Отключен";

                } ,flex: 1},
       			
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
