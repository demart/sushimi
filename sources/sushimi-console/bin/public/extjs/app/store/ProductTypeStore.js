Ext.define('SushimiConsole.store.ProductTypeStore', {
    extend: 'Ext.data.Store',
    model: 'SushimiConsole.model.ProductTypeModel',
    alias: 'store.productType',
    storeId: 'productType',
    data: [
           ['NONE', 'Не указано'],
           ['SUSHI', 'Суши'],
           ['PIZZA', 'Пицца'],
           ['SOY', 'Соевый соус'],
           ['VASABI', 'Васаби'],
           ['IMBIR', 'Имбирь'],
           ['STICKS', 'Палочки для еды'],
           ['CHEWING_GUM', 'Жевательная резинка'],
           ['PACKAGING', 'Коробка'],
           ['SMALL_SAUCE_CONTAINER', 'Маленький котейнер'],
           ['BIG_SAUCE_CONTAINER', 'Большой котейнер'],
     ],
});