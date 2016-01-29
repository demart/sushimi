Ext.define('SushimiWebAdmin.model.AnnouncementsListModel', {
    extend: 'Ext.data.Model',
   
    idProperty: 'id',
    fields: [
		{ name: 'id', type: 'int'},
		{ name: 'title'},
		{ name: 'content'},
		{ name: 'description'},
		{ name: 'publishedDate'},
		{ name: 'endPublished'},
		{ name: 'endDate'},
		{ name: 'published'},
		{ name: 'year'}

		],

});
