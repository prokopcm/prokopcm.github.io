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


module Trade.Objects {
    
    export class Emitter extends GameObject {

        type = Trade.Config.objectTypes.EMITTER;
        
        particleFillStyle: string;
        
        private _maxParticles: number;
        
        private _particles: Array<Particle> = [];
        
        constructor(options) {
            super(options);
           
           this._maxParticles = options.maxParticles || 100;
           
           this.particleFillStyle = options.particleFillStyle || "#77EEFF";
           
           this._initParticles();
           
           // TODO: add render system
           this.addComponent(new Trade.Components.Renderable({
               renderType: "function",
               renderFunction: (context:CanvasRenderingContext2D) => {
                   this._particles.forEach(particle => {
                       particle.components['renderable'].render(context);
                   });
               }
           }));
        }
        
        update(time) {
            this._particles.forEach((particle) => {
                if (particle.life === 0) {
                    var x = Math.floor(Math.random() * this.w) + this.x;
                    var y = Math.floor(Math.random() * this.h) + this.y;
                    particle.reset(x, y);
                } else {
                    particle.update(time);
                }
            });
        }
        
        _initParticles() {
            var fillStyle = this.particleFillStyle,
            
                // TODO: refactor this--weird architecture
                renderFunction = function(context: CanvasRenderingContext2D) {
                    var x = Math.floor(this.x),
                        y = Math.floor(this.y),
                        width = Math.floor(this.w * this.sX),
                        height = Math.floor(this.h * this.sY),
                        life = this.life / this.startLife,
                        opacity = 1,
                        fade;
                        
                    if (life < 0.3) {
                        fade = life / 0.3;
                        opacity = fade;
                    } else if (life > 0.85) {
                        // TODO: fix--this is not right...
                        fade = life / 1.15;
                        opacity = fade;
                    }
                    
                    context.fillStyle = this.fillStyle;
                    context.globalAlpha = 0.2 * opacity;
                    context.fillRect(x, y, width, height);
                    context.globalAlpha = 1;
                },
                x,
                y;
                
            for (var i = 0; i < this._maxParticles; i++) {
                x = Math.floor(Math.random() * this.w) + this.x;
                y = Math.floor(Math.random() * this.w) + this.y;
                this._particles.push(new Particle({
                    x: x,
                    y: y, 
                    renderFunction: renderFunction, 
                    fillStyle: fillStyle
                }));
            }
        }
    }
}