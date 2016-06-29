/******************************************************************************
 * Trade.Objects.WaterBackground
 * A waterey background object
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />
/// <reference path="../objects/Particle.ts" />
/// <reference path="../components/Renderable.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Objects;
    (function (Objects) {
        var Emitter = (function (_super) {
            __extends(Emitter, _super);
            function Emitter(options) {
                var _this = this;
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.EMITTER;
                this._particles = [];
                this._maxParticles = options.maxParticles || 100;
                this.particleFillStyle = options.particleFillStyle || "#77EEFF";
                this._initParticles();
                // TODO: add render system
                this.addComponent(new Trade.Components.Renderable({
                    renderType: "function",
                    renderFunction: function (context) {
                        _this._particles.forEach(function (particle) {
                            particle.components['renderable'].render(context);
                        });
                    }
                }));
            }
            Emitter.prototype.update = function (time) {
                var _this = this;
                this._particles.forEach(function (particle) {
                    if (particle.life === 0) {
                        var x = Math.floor(Math.random() * _this.w) + _this.x;
                        var y = Math.floor(Math.random() * _this.h) + _this.y;
                        particle.reset(x, y);
                    }
                    else {
                        particle.update(time);
                    }
                });
            };
            Emitter.prototype._initParticles = function () {
                var fillStyle = this.particleFillStyle, 
                // TODO: refactor this--weird architecture
                renderFunction = function (context) {
                    var x = Math.floor(this.x), y = Math.floor(this.y), width = Math.floor(this.w * this.sX), height = Math.floor(this.h * this.sY), life = this.life / this.startLife, opacity = 1, fade;
                    if (life < 0.3) {
                        fade = life / 0.3;
                        opacity = fade;
                    }
                    else if (life > 0.85) {
                        // TODO: fix--this is not right...
                        fade = life / 1.15;
                        opacity = fade;
                    }
                    context.fillStyle = this.fillStyle;
                    context.globalAlpha = 0.2 * opacity;
                    context.fillRect(x, y, width, height);
                    context.globalAlpha = 1;
                }, x, y;
                for (var i = 0; i < this._maxParticles; i++) {
                    x = Math.floor(Math.random() * this.w) + this.x;
                    y = Math.floor(Math.random() * this.w) + this.y;
                    this._particles.push(new Objects.Particle({
                        x: x,
                        y: y,
                        renderFunction: renderFunction,
                        fillStyle: fillStyle
                    }));
                }
            };
            return Emitter;
        })(Objects.GameObject);
        Objects.Emitter = Emitter;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Emitter.js.map