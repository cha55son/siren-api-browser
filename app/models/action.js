define(['models/field'], function(Field) {
    var Action = function(data) {
        this.payload = data || { };
        this.parseProperties();
        this.parseFields();
        this.className = 'Action';
    };
    Action.prototype.parseProperties = function() {
        this.name = this.payload.name || '';
        this.classes = this.payload.class || [];
        this.method = (this.payload.method || 'GET').toLowerCase();
        this.href = this.payload.href || '';
        this.title = this.payload.title || '';
        this.type = this.payload.type || 'application/x-www-form-urlencoded';
    };
    Action.prototype.parseFields = function() {
        this.fields = [];
        var fields = this.payload.fields || [];
        for (var i in fields) {
            this.fields.push(new Field(fields[i]));
        }
    };
    return Action;
});
