Ext.define('SushimiConsole.store.WarehouseIncomeTypeStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.WarehouseIncomeTypeModel',
    alias: 'store.warehouseIncomeType',
    storeId: 'warehouseIncomeType',
    data: [
           ['NONE', 'Не указано'],
           ['PURCHASE', 'Закуп'],
     ],
});