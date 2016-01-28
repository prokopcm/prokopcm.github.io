/******************************************************************************
 * Trade.Objects.Marker
 * A camera object
 * (c) 2015 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />
/// <reference path="../components/Renderable.ts" />
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
        var Marker = (function (_super) {
            __extends(Marker, _super);
            function Marker(options) {
                var _this = this;
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.MARKER;
                this.w = options.w || 20;
                this.h = options.h || 20;
                this.render.bind(this);
                this._maxTimeAlive = options.maxTimeAlive || 50;
                this._timeAlive = options.timeAlive || 0;
                this.addComponent(new Trade.Components.Renderable({
                    renderType: "function",
                    renderFunction: function (context) {
                        if (_this._timeAlive >= _this._maxTimeAlive) {
                            radio("marker:remove").broadcast(_this.id);
                            return;
                        }
                        _this._timeAlive++;
                        var scale = _this.sX * (_this._timeAlive / 10);
                        context.strokeStyle = "#FF6622";
                        context.beginPath();
                        context.arc(_this.x, _this.y, _this.w * scale / 3, 0, 2 * Math.PI, false);
                        context.closePath();
                        context.globalAlpha = 1 - scale / 5;
                        context.lineWidth = 2;
                        context.stroke();
                        context.globalAlpha = 1;
                    }
                }));
            }
            Marker.prototype.render = function (context) {
                if (this._timeAlive >= this._maxTimeAlive) {
                    radio("marker:remove").broadcast(this.id);
                    return;
                }
                this._timeAlive++;
                var scale = this.sX * (this._timeAlive / 10);
                context.strokeStyle = "#FF6622";
                context.beginPath();
                context.arc(this.x, this.y, this.w * scale / 3, 0, 2 * Math.PI, false);
                context.closePath();
                context.globalAlpha = 1 - scale / 5;
                context.lineWidth = 2;
                context.stroke();
                context.globalAlpha = 1;
            };
            return Marker;
        })(Objects.GameObject);
        Objects.Marker = Marker;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Marker.js.map