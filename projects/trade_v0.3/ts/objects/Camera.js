/******************************************************************************
 * Trade.Objects.Camera
 * A camera object
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Objects;
    (function (Objects) {
        var Camera = (function (_super) {
            __extends(Camera, _super);
            function Camera(options) {
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.CAMERA;
            }
            return Camera;
        })(Objects.GameObject);
        Objects.Camera = Camera;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Camera.js.map