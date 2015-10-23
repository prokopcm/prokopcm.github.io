/******************************************************************************
 * Trade.Systems.MovementSystem
 * System that handles and updates movement of an object.
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Systems = Trade.Systems || {};

/** @namespace */
Trade.Systems.MovementSystem = function(options) {

    this.type = "movement";

    this.objects = options.objects;

    /**
     * Checks for a rotatable object, and if that object
     * has a rotation->movement constraint that could
     * prevent the object from moving.
     * @param  {Trade.GameObject} obj   the object to check
     * @param  {Trade.Components} comps the object's components
     * @return {boolean}       whether the object can move
     */
    function checkForRotationConstraint(obj, comps) {
        
        // N.B. If active, this will return the opposite of whether the
        // constraint is active.
        if (comps.hasOwnProperty("rotatable") && 
            comps.rotatable.rmConstraint.active) {
            return false;
        }
        return true;
    };

    function rotate(obj, comps) {
        if (!comps.rotatable.rotating) {
            return;
        }

        var rot = comps.rotatable;

        // TODO: move formula into rot->mov constraint in 
        // Components.Rotatable?
        if (Math.abs(rot.destRotation - rot.rotation) > Math.PI / 3) {
            rot.rmConstraint.active = true;
        } else {
            rot.rmConstraint.active = false;
        }

        var rotPlus = Math.abs(rot.destRotation + (rot.rotation + rot.vr)),
            rotMinus = Math.abs(rot.destRotation - (rot.rotation - rot.vr)),
            diff = rot.destRotation - rot.rotation;

        // TODO: rotate objects more efficiently
        if (rot.rotation < rot.destRotation) {
            rot.rotation = rot.rotation + rot.vr;
        } else {
            rot.rotation = rot.rotation - rot.vr;
        }

        if (Math.abs(rot.destRotation - rot.rotation) <= rot.vr * 1.1) {
            rot.rotation = rot.destRotation;
            rot.rotating = false;
        }
    };

    function move(obj, comps) {
        var vx = ((comps.movable.vx > 1) ? comps.movable.maxSpeed : comps.movable.maxSpeed * comps.movable.vx) * comps.movable.dirX,
            vy = ((comps.movable.vx > 1) ? comps.movable.maxSpeed / comps.movable.vx : comps.movable.maxSpeed) * comps.movable.dirY;

        // TODO: intertia
        /*
        // calculate inertia
        if (this.inertia > 1) {
            this.framesMoving++;

            if (this.framesMoving % 10 === 0) {
                this.inertia--;
            }
            
            vx = vx / this.inertia;
            vy = vy / this.inertia;
        }
         */
        
        if (comps.movable.destX > 0 && comps.movable.dirX === 1 
            || comps.movable.destX < 0 && comps.movable.dirX === -1) {
            comps.movable.destX -= vx;
            obj.x += vx;
        } else {
            comps.movable.destX = 0;
        }

        if (comps.movable.destY > 0 && comps.movable.dirY === 1 
            || comps.movable.destY < 0 && comps.movable.dirY === -1) {
            comps.movable.destY -= vy;
            obj.y += vy;
        } else {
            comps.movable.destY = 0;
        }

        if (comps.movable.destX === 0 && comps.movable.destY === 0) {
            comps.movable.moving = false;
        }
    }

    /**
     * A function to calculate an object's movement
     * @param  {GameObject} obj   a movable game object
     * @param  {Trade.Components} comps a list of the object's components
     * @private
     */
    function _updateObjectMovement(obj, comps) {
        var doMovement = true;

        if (comps.hasOwnProperty("rotatable")) {
            rotate(obj, comps);
            doMovement = checkForRotationConstraint(obj, comps);
        }

        if (comps.hasOwnProperty("movable") && doMovement && comps.movable.moving) {
            move(obj, comps);
        }
    };

    this.addObject = function(object) {
        if (obj.components.hasOwnProperty("movable")) {
            this.movables.push({
                lastMove: {x: 0, y: 0},
                object: obj
            });
        }
    };

    this.removeObject = function(object) {
        // TODO
    };

    this.update = function(tick) {
        var objs = this.objects,
            len = objs.length
        for (var i = 0; i < len; i++) {
            var obj = objs[i],
                comps = obj.components;

            _updateObjectMovement(obj, comps);
        }
    };

    this.setNewDestination = function(x, y) {
        for (var key in this.objects) {
            var obj = this.objects[key];

            var clickX = (obj.x - (x - obj.w)) * -1,
                clickY = (obj.y - (y - obj.h / 2)) * -1,
                absX = Math.abs(clickX),
                absY = Math.abs(clickY),
                vx = absX / absY,
                vy = absY / absX,
                dirX = (absX === clickX) ? 1 : -1,
                dirY = (absY === clickY) ? 1 : -1;

            if (obj.components.hasOwnProperty("movable")) {
                obj.components['movable'].setDestination({
                    x: clickX, 
                    y: clickY,
                    vx: vx,
                    vy: vy,
                    dirX: dirX,
                    dirY: dirY
                });
            }
        }  
    };

    /**
     * Calculates a new rotation vector thing
     * @param  {number} x the x-position of the destination chosen
     * @param  {number} y the y-position of the destination chosen
     */
    this.setNewRotation = function(x, y) {
        for (var key in this.objects) {
            var obj = this.objects[key];
            if (obj.components.hasOwnProperty("rotatable")) {
                
                var boxCenter = [obj.x, obj.y + obj.h / 2],
                    angle = Math.atan2(x - boxCenter[0], -(y - boxCenter[1]))
                    angle = angle - (Math.PI / 2);

                obj.components['rotatable'].setRotation({
                    destRot: angle
                });
            }
        }
    };
};