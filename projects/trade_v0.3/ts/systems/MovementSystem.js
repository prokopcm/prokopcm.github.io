/******************************************************************************
 * Trade.Systems.MovementSystem
 * System that handles and updates movement of an object.
 * (c) 2013 Michael Prokopchuk
 *
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../interfaces/ISystem.ts" />
var Trade;
(function (Trade) {
    var Systems;
    (function (Systems) {
        var MovementSystem = (function () {
            function MovementSystem(options) {
                this.type = 'movement';
                this.objects = options.objects;
            }
            /**
             * Checks for a rotatable object, and if that object
             * has a rotation->movement constraint that could
             * prevent the object from moving.
             * @param  {Trade.Objects.GameObject} obj   the object to check
             * @param  {Trade.Components.Component[]} comps the object's components
             * @return {boolean}       whether the object can move
             */
            MovementSystem.prototype._checkForRotationConstraint = function (obj, comps) {
                // N.B. If active, this will return the opposite of whether the
                // constraint is active.
                if (comps.hasOwnProperty("rotatable")) {
                    var rotatable = comps['rotatable'];
                    return !comps['rotatable'].rotationConstraint.active;
                }
                return true;
            };
            MovementSystem.prototype._rotate = function (obj, comps) {
                if (!comps['rotatable'].rotating) {
                    return;
                }
                var rot = comps['rotatable'];
                // TODO: move formula into rot->mov constraint in 
                // Components.Rotatable?
                if (Math.abs(rot.destRotation - rot.rotation) > Math.PI / 3) {
                    rot.rotationConstraint.active = true;
                }
                else {
                    rot.rotationConstraint.active = false;
                }
                var rotPlus = Math.abs(rot.destRotation + (rot.rotation + rot.rotationVelocity)), rotMinus = Math.abs(rot.destRotation - (rot.rotation - rot.rotationVelocity)), diff = rot.destRotation - rot.rotation;
                // TODO: rotate objects more efficiently
                if (rot.rotation < rot.destRotation) {
                    rot.rotation = rot.rotation + rot.rotationVelocity;
                }
                else {
                    rot.rotation = rot.rotation - rot.rotationVelocity;
                }
                if (Math.abs(rot.destRotation - rot.rotation) <= rot.rotationVelocity * 1.1) {
                    rot.rotation = rot.destRotation;
                    rot.rotating = false;
                }
            };
            MovementSystem.prototype._move = function (obj, comps) {
                var movable = comps['movable'];
                var vx = ((movable.vx > 1) ? movable.maxSpeed : movable.maxSpeed * movable.vx) * movable.dirX, vy = ((movable.vx > 1) ? movable.maxSpeed / movable.vx : movable.maxSpeed) * movable.dirY;
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
                if (movable.destX > 0 && movable.dirX === 1
                    || movable.destX < 0 && movable.dirX === -1) {
                    movable.destX -= vx;
                    obj.x += vx;
                }
                else {
                    movable.destX = 0;
                }
                if (movable.destY > 0 && movable.dirY === 1
                    || movable.destY < 0 && movable.dirY === -1) {
                    movable.destY -= vy;
                    obj.y += vy;
                }
                else {
                    movable.destY = 0;
                }
                if (movable.destX === 0 && movable.destY === 0) {
                    movable.moving = false;
                }
            };
            /**
             * A function to calculate an object's movement
             * @param  {GameObject} obj   a movable game object
             * @param  {Trade.Components} comps a list of the object's components
             * @private
             */
            MovementSystem.prototype._updateObjectMovement = function (obj, comps) {
                var doMovement = true;
                if (comps.hasOwnProperty("rotatable")) {
                    this._rotate(obj, comps);
                    doMovement = this._checkForRotationConstraint(obj, comps);
                }
                if (comps.hasOwnProperty("movable") && doMovement && comps['movable'].moving) {
                    this._move(obj, comps);
                }
            };
            MovementSystem.prototype.addObject = function (obj) {
                if (obj.components.hasOwnProperty("movable")) {
                    this.movables.push({
                        lastMove: { x: 0, y: 0 },
                        object: obj
                    });
                }
            };
            MovementSystem.prototype.removeObject = function (object) {
                // TODO
            };
            MovementSystem.prototype.update = function (tick) {
                var objs = this.objects, len = objs.length;
                for (var i = 0; i < len; i++) {
                    var obj = objs[i], comps = obj.components;
                    this._updateObjectMovement(obj, comps);
                }
            };
            MovementSystem.prototype.setNewDestination = function (x, y) {
                for (var key in this.objects) {
                    var obj = this.objects[key];
                    var clickX = (obj.x - (x - obj.w)) * -1, clickY = (obj.y - (y - obj.h / 2)) * -1, absX = Math.abs(clickX), absY = Math.abs(clickY), vx = absX / absY, vy = absY / absX, dirX = (absX === clickX) ? 1 : -1, dirY = (absY === clickY) ? 1 : -1;
                    if (obj.components.hasOwnProperty("movable")) {
                        var movable = obj.components['movable'];
                        movable.setDestination({
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
            /** Calculates a new rotation vector */
            MovementSystem.prototype.setNewRotation = function (x, y) {
                for (var key in this.objects) {
                    var obj = this.objects[key];
                    if (obj.components.hasOwnProperty("rotatable")) {
                        var boxCenter = [obj.x, obj.y + obj.h / 2], angle = Math.atan2(x - boxCenter[0], -(y - boxCenter[1]));
                        angle = angle - (Math.PI / 2);
                        var rotatable = obj.components['rotatable'];
                        rotatable.setRotation(angle);
                    }
                }
            };
            return MovementSystem;
        })();
        Systems.MovementSystem = MovementSystem;
    })(Systems = Trade.Systems || (Trade.Systems = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=MovementSystem.js.map