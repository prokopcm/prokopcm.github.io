/******************************************************************************
 * Trade.Components.Selectable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="Component.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Rotatable = (function (_super) {
            __extends(Rotatable, _super);
            function Rotatable(options) {
                _super.call(this);
                this.type = "rotatable";
                this.rotatable = true;
                this.rotating = options.rotating || false;
                this.rotation = options.rotation || 0;
                this.destRotation = options.destRotation || 0;
                this.rotationVelocity = options.rotationVelocity || 0;
                this.inertia = options.inertia || 0;
                this.initialInertia = options.initialInertia || 0;
                this.rotationConstraint = options.rotationConstraint || {
                    active: false,
                    constraintFormula: function () { return true; }
                };
            }
            /** Immediately change an object's rotation */
            Rotatable.prototype.setRotationImmediate = function (rotation) {
                // TODO
            };
            /** Sets an object's destination rotation amount and starts an object
             *  rotating towards that rotation.
             */
            Rotatable.prototype.setRotation = function (rotation) {
                this.rotating = true;
                this.destRotation = rotation;
            };
            return Rotatable;
        })(Components.Component);
        Components.Rotatable = Rotatable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Rotatable.js.map