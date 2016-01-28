/******************************************************************************
 * Trade.Objects.Marker
 * A camera object
 * (c) 2015 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />
/// <reference path="../components/Renderable.ts" />

module Trade.Objects {
    
    interface IMarkerOptions extends IGameObjectOptions {
        /** The maximum number of game time unis the object should be alive */
        maxTimeAlive?: number;
        
        /** The current number of game time units the object has been alive */
        timeAlive?: number;
    }
    
    export class Marker extends GameObject {

        type = Trade.Config.objectTypes.MARKER;
        
        /** The maximum number of game time unis the object should be alive */
        private _maxTimeAlive: number;
        
        /** The current number of game time units the object has been alive */
        private _timeAlive: number;
        
        constructor(options: IMarkerOptions) {
            super(options);
            this.w = options.w || 20;
            this.h = options.h || 20;
            
            this.render.bind(this);
            this._maxTimeAlive = options.maxTimeAlive || 50;
            this._timeAlive = options.timeAlive || 0;

            this.addComponent(new Components.Renderable({
                renderType: "function",
                renderFunction: (context) => {
                    if (this._timeAlive >= this._maxTimeAlive) {
                        radio("marker:remove").broadcast(this.id);
                        return;
                    }
                    this._timeAlive++;
                    
                    var scale = this.sX * (this._timeAlive / 10);
                    context.strokeStyle = "#FF6622";
                    context.beginPath();
                    context.arc(this.x, this.y, this.w * scale / 3, 0 , 2 * Math.PI, false);
                    context.closePath();
                    context.globalAlpha = 1 - scale / 5;
                    context.lineWidth = 2;
                    context.stroke();
                    context.globalAlpha = 1;
                }
            }));
        }
        
        render(context: CanvasRenderingContext2D) {
            if (this._timeAlive >= this._maxTimeAlive) {
                radio("marker:remove").broadcast(this.id);
                return;
            }
            this._timeAlive++;
            
            var scale = this.sX * (this._timeAlive / 10);
            context.strokeStyle = "#FF6622";
            context.beginPath();
            context.arc(this.x, this.y, this.w * scale / 3, 0 , 2 * Math.PI, false);
            context.closePath();
            context.globalAlpha = 1 - scale / 5;
            context.lineWidth = 2;
            context.stroke();
            context.globalAlpha = 1;
        }
    }
}