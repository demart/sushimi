$(function () {
    var replaceCarrency = function () {

    };

    $('c').live('create', function () {
        var $this = $this(this);
        if ($this.text() == 'a') { $this.text('ð'); }
    });
})