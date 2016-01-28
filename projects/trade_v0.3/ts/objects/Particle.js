/******************************************************************************
 * Trade.Objects.Particle
 * A 2D particle object
 * (c) 2013 Michael Prokopchuk
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
        var Particle = (function (_super) {
            __extends(Particle, _super);
            function Particle(options) {
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.PARTICLE;
                var self = this;
                this.w = options.w || 50;
                this.h = options.h || 20;
                this.sXv = options.sXv || .002;
                this.sYv = options.sYv || .001;
                this.startLife = options.startLife || Math.floor(Math.random() * 350) + 100;
                this.life = options.life || this.startLife;
                this.fillStyle = options.fillStyle || "#77EEFF";
                this.renderFunction = options.renderFunction.bind(this) || function (context) {
                    var x = Math.floor(self.x), y = Math.floor(self.y), width = Math.floor(self.w * self.sX), height = Math.floor(self.h * self.sY);
                    context.fillStyle = self.fillStyle;
                    context.fillRect(x, y, width, height);
                };
                this._options = options;
                this.addComponent(new Trade.Components.Renderable({
                    renderType: "function",
                    renderFunction: this.renderFunction
                }));
            }
            Particle.prototype.update = function (time) {
                this.life--;
                // TODO: treat these as vector values for the scale
                // Multiply, don't add!
                this.sX *= (1 + this.sXv);
                this.sY *= (1 + this.sYv);
                return this;
            };
            /**
             * Resets a particle's position and scale. If no params are passed,
             * reuses options sent in during initialization.
             * @param {number} [x] the new x-position of the particle
             * @param {number} [y] the new y-position of the particle
             * @return {Trade.Objects.Particle} the particle instance
             */
            Particle.prototype.reset = function (x, y) {
                this.x = x || this._options.x;
                this.y = y || this._options.y;
                this.sX = 1;
                this.sY = 1;
                this.startLife = this._options.startLife || Math.floor(Math.random() * 350) + 100;
                this.life = this._options.life || this.startLife;
                return this;
            };
            return Particle;
        })(Trade.Objects.GameObject);
        Objects.Particle = Particle;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Particle.js.map