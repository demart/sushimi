Ext.define('SushimiConsole.store.ProductOwnerTypeStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.ProductOwnerTypeModel',
    alias: 'store.productOwnerType',
    storeId: 'productOwnerType',
    data: [
           ['SUSHIMI', 'Продукция Сушими'],
           ['ORHER', 'Продукция Робина'],
     ],
});