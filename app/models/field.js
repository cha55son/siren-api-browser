define(function() {
    var Field = function(data) {
        this.payload = data || { };
        this.parseProperties();
    };
    Field.prototype.parseProperties = function() {
        this.name = this.payload.name || '';
        this.type = this.payload.type || 'text';
        this.value = this.payload.value || '';
        this.title = this.payload.title || '';
    };
    return Field;
});
