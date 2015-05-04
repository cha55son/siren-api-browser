define([
    'models/action',
    'models/link'
], function(Action, Link) {
    var Entity = function(data) {
        this.payload = data || { };
        this.parseProperties();
        this.parseEntities();
        this.parseActions();
        this.parseLinks();
    };
    // Properties specific to an entity
    Entity.prototype.parseProperties = function() {
        this.properties = this.payload.properties || { };
        this.classes = this.payload.class || []; 
        this.title = this.payload.title || '';
        this.rels = this.payload.rel || [];
        this.href = this.payload.href || '';
    };
    Entity.prototype.parseEntities = function() {
        this.entities = [];
        var entities = this.payload.entities || [];
        for (var i in entities) {
            this.entities.push(new Entity(entities[i]));
        }
    };
    Entity.prototype.parseActions = function() {
        this.actions = [];
        var actions = this.payload.actions || [];
        for (var i in actions) {
            this.actions.push(new Action(actions[i]));
        }
    };
    Entity.prototype.parseLinks = function() {
        this.links = [];
        var links = this.payload.links || [];
        for (var i in links) {
            this.links.push(new Link(links[i]));
        }
    };
    return Entity;
});
