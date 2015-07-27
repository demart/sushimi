Ext.define('SushimiConsole.store.WarehouseOutcomeTypeStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.WarehouseOutcomeTypeModel',
    alias: 'store.warehouseOutcomeType',
    storeId: 'warehouseOutcomeType',
    data: [
           ['NONE', 'Не указано'],
           ['OUTCOME', 'Расход на продукцию'],
           ['WRITEOFF', 'Списание продуктов'],
     ],
});