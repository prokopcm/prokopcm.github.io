/******************************************************************************
 * Trade.Objects.Particle
 * A 2D particle object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />
/// <reference path="../components/Renderable.ts" />


module Trade.Objects {
    
    export class Particle extends Trade.Objects.GameObject {

        type = Trade.Config.objectTypes.PARTICLE;
        
        /** The amount of life a particle should start with */
        startLife: number;
        
        /** The current amount of life a particle has */
        life: number;
        
        /** The color of the particle */
        fillStyle: string;
        
        renderFunction: (context: CanvasRenderingContext2D) => any;
        
        private _options;
        
        constructor(options) {
			super(options);
            
            var self = this;
			
			this.w = options.w || 50;
			this.h = options.h || 20;
			this.sXv = options.sXv || .002;
            this.sYv = options.sYv || .001;
            this.startLife = options.startLife || Math.floor(Math.random() * 350) + 100;
            this.life = options.life || this.startLife;
            this.fillStyle = options.fillStyle || "#77EEFF";
            this.renderFunction = options.renderFunction.bind(this) || function(context:CanvasRenderingContext2D) {
                var x = Math.floor(self.x),
                    y = Math.floor(self.y),
                    width = Math.floor(self.w * self.sX),
                    height = Math.floor(self.h * self.sY);
                context.fillStyle = self.fillStyle;
                context.fillRect(x, y, width, height);
            };
            
            this._options = options;
            
            this.addComponent(new Trade.Components.Renderable({
                renderType: "function",
                renderFunction: this.renderFunction
            }));
        }
        
        update(time) {
            this.life--;
            
            // TODO: treat these as vector values for the scale
            // Multiply, don't add!
            this.sX *= (1 + this.sXv);
            this.sY *= (1 + this.sYv);
            
            return this;
        }
        
        /**
         * Resets a particle's position and scale. If no params are passed, 
         * reuses options sent in during initialization.
         * @param {number} [x] the new x-position of the particle
         * @param {number} [y] the new y-position of the particle
         * @return {Trade.Objects.Particle} the particle instance
         */
        reset(x?: number, y?: number): Trade.Objects.Particle {
            this.x = x || this._options.x;
            this.y = y || this._options.y;
            this.sX = 1;
            this.sY = 1;
            this.startLife = this._options.startLife || Math.floor(Math.random() * 350) + 100;
            this.life = this._options.life || this.startLife;
            
            return this;
        }
    }
}