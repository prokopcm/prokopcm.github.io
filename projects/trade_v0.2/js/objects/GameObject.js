/******************************************************************************
 * Trade.Objects.GameObject
 * A base city class for tradegame
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};
Trade.Objects = Trade.Objects || {};

Trade.Objects.GameObject = function(options) {
    this.id = options.id || Helpers.generateId();
    this.type = options.type || "GameObject";
    this.owner = options.owner || Trade.Config.owners.WORLD;

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.h = options.h || 0;
    this.w = options.w || 0;
    this.sX = options.sX || 1;
    this.sY = options.sY || 1;

    // math operations
    this.radiusSq = Math.pow(this.w * 1.5, 2),
    this.centerX = this.x + this.w / 2,
    this.centerY = this.y + this.h / 2;

    this.components = options.components || {};

    this.systems = options.systems || {};

    this.children = options.children || [];

    $.extend(this, new Trade.Components.Eventable({}));
};

Trade.Objects.GameObject.prototype.addComponent = function(component) {
    this.components[component.type] = component;
};

Trade.Objects.GameObject.prototype.removeComponent = function(component) {
    for (var key in this.components) {
        if (this.components[key].id === componentId) {
            delete this.components[key];

            return true;
        }
    }

    return false;
};

Trade.Objects.GameObject.prototype.addSystem = function(system) {
    this.systems[system.type] = system;
};

Trade.Objects.GameObject.prototype.removeSystem = function(systemId) {
    for (var key in this.systems) {
        if (this.systems[key].id === systemId) {
            delete this.systems[key];

            return true;
        }
    }

    return false;
};

Trade.Objects.GameObject.prototype.destroy = function() {
    // TODO: remove all references
};

Trade.Objects.GameObject.prototype.toString = function() {
    return this.id;
};