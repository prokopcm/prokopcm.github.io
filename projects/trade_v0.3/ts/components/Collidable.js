/// <reference path="Component.ts" />
/// <reference path="../objects/Collision.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Collidable = (function (_super) {
            __extends(Collidable, _super);
            function Collidable(options) {
                _super.call(this);
                this.type = "collidable";
                this.collisions = options.collisions || [];
            }
            return Collidable;
        })(Components.Component);
        Components.Collidable = Collidable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Collidable.js.map