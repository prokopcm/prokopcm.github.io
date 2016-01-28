/// <reference path="../objects/GameObject.ts" />

module Trade.Objects {
    
    interface CollisionOptions {
        /** x-position */
        x?: number;
        
        /** y-position */
        y?: number;
        
        /** collision width */
        w?: number;
        
        /** collision height */
        h?: number;
        
        /** collision radius */
        r?: number;
        
        /** Collision bounding shape -- "circle" | "square" */
        collisionType?: Config.collisionTypes;
        
        /** Whether the position should be considered relative to its parent */
        relativeToParent?: boolean;
        
        /** Function to perform on successful collision test */
        collisionFunction?: (collider: GameObject) => any;
        
        /** Function to perform on successful collision test */
        uncollisionFunction?: (collider: GameObject) => any;
    }
    
    export class Collision extends GameObject {
        
        type = Trade.Config.objectTypes.COLLISION;
        
        /** collision radius */
        r: number;
        
        /** Collision bounding shape -- "circle" | "square" */
        collisionType: Config.collisionTypes;
        
        /** Whether the position should be considered relative to its parent */
        relativeToParent: boolean;
        
        /** Function to perform on successful collision test */
        collisionFunction: (collider: GameObject) => boolean;
        
        /** Function to perform on successful collision test */
        uncollisionFunction: (collider: GameObject) => boolean;
        
        constructor(options: CollisionOptions) {
            super({
                x: options.x || 100,
                y: options.y || 100,
                w: options.w || 100,
                h: options.h || 100
            });
            
            this.r = options.r || 0;
            this.collisionType = options.collisionType || Config.collisionTypes.CIRCLE;
            this.relativeToParent = options.relativeToParent || true;
            this.collisionFunction = options.collisionFunction || null;
            this.uncollisionFunction = options.uncollisionFunction || null;
        }
    }
}