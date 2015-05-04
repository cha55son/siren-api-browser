define(function() {
    var Link = function(data) {
        this.payload = data || { };
        this.parseProperties();
    };
    Link.prototype.parseProperties = function() {
        this.rels = this.payload.rel || [];
        this.href = this.payload.href || '';
        this.title = this.payload.title || '';
        this.type = this.payload.type || '';
    };
    return Link;
});
