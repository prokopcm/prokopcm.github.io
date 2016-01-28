/******************************************************************************
 * Trade.Objects.WaterBackground
 * A waterey background object
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />
/// <reference path="../util/Config.ts" />
/// <reference path="Emitter.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../components/Renderable.ts" />
var Trade;
(function (Trade) {
    var Objects;
    (function (Objects) {
        var WaterBackground = (function (_super) {
            __extends(WaterBackground, _super);
            function WaterBackground(options) {
                var _this = this;
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.WATER_BACKGROUND;
                this.waves = new Objects.Emitter({
                    x: this.x,
                    y: this.y,
                    w: this.w,
                    h: this.h,
                    particleFillStyle: "#77EEFF"
                });
                this.fillStyle = options.fillStyle || "#00CCFF";
                this.addComponent(new Trade.Components.Renderable({
                    renderType: "function",
                    renderFunction: function (context) {
                        context.fillStyle = _this.fillStyle;
                        context.fillRect(_this.x, _this.y, _this.w, _this.h);
                        //context.fillRect(0, 0, this.w, this.h);
                        // TODO: RenderSystem
                        _this.waves.components['renderable'].render(context);
                    }
                }));
            }
            WaterBackground.prototype.update = function (time) {
                this.waves.update(time);
            };
            return WaterBackground;
        })(Objects.GameObject);
        Objects.WaterBackground = WaterBackground;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=WaterBackground.js.map