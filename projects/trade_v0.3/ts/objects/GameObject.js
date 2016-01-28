/// <reference path="../components/Eventable.ts" />
/// <reference path="../util/Helpers.ts" />
/// <reference path="../util/Config.ts" />
/// <reference path="../interfaces/IComponent.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Trade;
(function (Trade) {
    var Objects;
    (function (Objects) {
        var GameObject = (function (_super) {
            __extends(GameObject, _super);
            function GameObject(options) {
                _super.call(this);
                /** The unique type of game object */
                this.type = Trade.Config.objectTypes.GAME_OBJECT;
                // TODO: stricter type
                this.components = {};
                // TODO: stricter type
                this.systems = {};
                // TODO: stricter type
                this.children = [];
                options = options || {};
                this.id = options.id || Helpers.generateId();
                this.x = options.x || 0;
                this.y = options.y || 0;
                this.w = options.w || 0;
                this.h = options.h || 0;
                this.sX = options.sX || 1;
                this.sY = options.sY || 1;
                this.centerX = options.centerX || this.x + this.w / 2;
                this.centerY = options.centerY || this.y + this.h / 2;
                this.owner = options.owner || Trade.Config.owners.WORLD;
            }
            GameObject.prototype.update = function (time) { };
            /**
             * Adds a component to an object
             */
            GameObject.prototype.addComponent = function (component) {
                this.components[component.type] = component;
            };
            /**
             * Adds a component to an object
             */
            GameObject.prototype.addSystem = function (system) {
                this.systems[system.type] = system;
            };
            GameObject.prototype.removeComponent = function (type) {
                // TODO
            };
            return GameObject;
        })(Trade.Components.Eventable);
        Objects.GameObject = GameObject;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=GameObject.js.map