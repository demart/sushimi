
Ext.define('SushimiConsole.model.OrderTreeModel', {
    extend: 'Ext.data.TreeModel',
    fields: [
     { name: 'name', type: 'string'},  
     { name: 'count', type: 'int'},
     { name: 'id', type: 'int'},
    ]
}); 