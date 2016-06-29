/******************************************************************************
 * Trade.Components.Selectable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="Component.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Movable = (function (_super) {
            __extends(Movable, _super);
            function Movable(options) {
                _super.call(this);
                this.type = "movable";
                this.movable = true;
                this.dirX = 1;
                this.dirY = 1;
                this.moving = options.moving || false;
                this.vx = options.vx;
                this.vy = options.vy;
                this.destX = options.destY;
                this.destY = options.destX;
                this.maxSpeed = options.maxSpeed;
                this.inertia = options.inertia;
                this.initialInertia = options.initialInertia;
            }
            /** Sets an object's destination coordinates and starts an object moving
             *  towards that position.
             */
            Movable.prototype.setDestination = function (dest) {
                this.moving = true;
                this.destX = dest.x;
                this.destY = dest.y;
                if (dest.vx) {
                    this.vx = dest.vx;
                }
                if (dest.vy) {
                    this.vy = dest.vy;
                }
                if (dest.dirX) {
                    this.dirX = dest.dirX;
                }
                if (dest.dirY) {
                    this.dirY = dest.dirY;
                }
            };
            return Movable;
        })(Components.Component);
        Components.Movable = Movable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Movable.js.map