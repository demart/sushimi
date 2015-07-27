Ext.define('SushimiConsole.store.CategoryTypeStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.CategoryTypeModel',
    alias: 'store.categoryType',
    storeId: 'categoryType',
    data: [
           ['NONE', 'Не указано'],
           ['SUSHI', 'Суши'],
           ['ANTISUSHI', 'Антисуши'],
           ['BOTH', 'Общее']
     ],
});