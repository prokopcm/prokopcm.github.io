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

/// <reference path="../components/Renderable.ts" />


module Trade.Objects {
    
    export class WaterBackground extends GameObject {

        type = Config.objectTypes.WATER_BACKGROUND;
        
        fillStyle: string;
        
        // TODO: emitter
        waves: Emitter;
        
        constructor(options) {
            super(options);
            
            this.waves = new Emitter({
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h,
                particleFillStyle: "#77EEFF"
            });
            
            this.fillStyle = options.fillStyle || "#00CCFF";
            
            this.addComponent(new Components.Renderable({
                renderType: "function",
                renderFunction: (context:CanvasRenderingContext2D) => {
                    context.fillStyle = this.fillStyle;
                    context.fillRect(this.x, this.y, this.w, this.h);
                    //context.fillRect(0, 0, this.w, this.h);
                    // TODO: RenderSystem
                    this.waves.components['renderable'].render(context);
                }
            }));
        }
        
        update(time) {
            this.waves.update(time);
        }
    }
}