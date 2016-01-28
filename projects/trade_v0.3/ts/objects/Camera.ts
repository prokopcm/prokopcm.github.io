/******************************************************************************
 * Trade.Objects.Camera
 * A camera object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />

module Trade.Objects {
    
    export class Camera extends GameObject {

        type = Trade.Config.objectTypes.CAMERA;
        
        constructor(options) {
            super(options);
        }
    }
}