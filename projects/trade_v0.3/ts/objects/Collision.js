/// <reference path="../objects/GameObject.ts" />
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
        var Collision = (function (_super) {
            __extends(Collision, _super);
            function Collision(options) {
                _super.call(this, {
                    x: options.x || 100,
                    y: options.y || 100,
                    w: options.w || 100,
                    h: options.h || 100
                });
                this.type = Trade.Config.objectTypes.COLLISION;
                this.r = options.r || 0;
                this.collisionType = options.collisionType || Trade.Config.collisionTypes.CIRCLE;
                this.relativeToParent = options.relativeToParent || true;
                this.collisionFunction = options.collisionFunction || null;
                this.uncollisionFunction = options.uncollisionFunction || null;
            }
            return Collision;
        })(Objects.GameObject);
        Objects.Collision = Collision;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Collision.js.map