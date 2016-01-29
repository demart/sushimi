/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SushimiWebAdmin.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    /**
     * Нажатие на кнопку выход
     */
    onLogoutBtn: function () {
    	console.log("onLogoutBtn click");
    	this.redirectTo('logout');
    },
    
       
     /**
     * Справочник персонала
     */
    onDicStaffClick: function () {
    	console.log("onDicStaffBtn click");
    	this.redirectTo('dictionary/staff');
    },
    
    /**
     * Справочник категорий
     */
    onDicCategoryClick: function () {
    	console.log("onDicCategoryBtn click");
    	this.redirectTo('dictionary/category');
    },
    
    /**
     * Справочник продуктов
     */
    onDicProductClick: function () {
    	console.log("onDicProductBtn click");
    	this.redirectTo('dictionary/product');
    },
    
    /**
     * Справочник новостей
     */
    onDicAnnouncementsClick: function () {
    	console.log("onDicAnnouncementsBtn click");
    	this.redirectTo('dictionary/announcements');
    },
   
});
