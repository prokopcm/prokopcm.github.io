/// <reference path="../objects/GameObject.ts" />
/// <reference path="../objects/Collision.ts" />
/// <reference path="../util/Config.ts" />

/******************************************************************************
 * Trade.Systems.CollisionSystem
 * System that handles and updates object collisions.
 * (c) 2014 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
module Trade.Systems {

    export class CollisionSystem implements Interfaces.ISystem {
        
        type = 'collision';

        objects: {string: Objects.GameObject};

        private _cachedCollisions: Object = {};

        private _prevCollisions: Object  = {};

        private _currentCollisions: Object  = {};
        
        constructor(options?) {
            options = options || {};

            this.objects = options.objects || {};
        }

        update() {
            var objs = this.objects,
                collisions = {};

            for (var key1 in objs) {
                for (var key2 in objs) {

                    // don't compare an object with itself
                    if (objs[key1] !== objs[key2]) {

                        // store unique key by comining ids, always take the lower number id first
                        // so we only have to do one lookup
                        var keyHash = key1 < key2 ? key1.toString() + key2.toString() : 
                            key2.toString() + key1.toString();
                        
                        // only calculate collisions between objects once per update
                        if (!collisions[keyHash]) {
                            collisions[keyHash] = true;

                            this.testCollisions(objs[key1], objs[key2]);
                        }
                    }
                }
            }

            this._prevCollisions = this._currentCollisions;
            this._currentCollisions = {};
        }

        testCollisions(obj1: Objects.GameObject, obj2: Objects.GameObject) {
            var obj1c = obj1.components['collidable'].collisions,
                obj2c = obj2.components['collidable'].collisions,
                collided = [],
                types = Config.componentTypes;

            for (var i = obj1c.length - 1; i >= 0; i--) {
                for (var j = obj2c.length - 1; j >= 0; j--) {
                    var col1 = this._getCollisionData(obj1, obj1c[i]),
                        col2 = this._getCollisionData(obj2, obj2c[i]);

                    // TODO: compare these bitches & call fxn if collide!
                    if (col1.type === col2.type) {
                        if (col1.type === Config.collisionTypes.CIRCLE) {
                            this._compareCircleBoundaries(col1, col2);
                        } else {
                            // TODO: SQUARES
                        }
                    } else {
                        // circle vs square
                    }
                }
            }
        }

        addObject(obj: Objects.GameObject) {
            if (obj.components.hasOwnProperty("collidable")) {
                this.objects[obj.id] = obj;
            }
        }

        removeObject(obj: Objects.GameObject) {
            if (this.objects[obj.id]) {
                delete this.objects[obj.id];
            }
        }

        private _getCollisionData(obj: Objects.GameObject, collision) {
            var objContext = null;
            // NB: may need to remove references from cache when removing object
            // from world to prevent memory leaks...

            // start with obj properties
            if (!obj.components['movable'] && this._cachedCollisions[obj.id]) {
                objContext = this._cachedCollisions[obj.id];
            } else {
                objContext = {
                    id: collision.id,
                    x: collision.x,
                    y: collision.y,
                    obj: collision.parent || obj,
                    collisionFunction: collision.collisionFunction,
                    uncollisionFunction: collision.uncollisionFunction,
                    type: collision.collisionType
                };

                if (!obj.components['movable']) {
                    this._cachedCollisions[obj.id] = objContext;
                }
            }

            // then add in collision properties to get collision boundaries
            // TODO
            if (collision.relativeToParent) {
                objContext.x = obj.x + collision.x;
                objContext.y = obj.y + collision.y;
            }

            if (objContext.type === Trade.Config.collisionTypes.CIRCLE) {
                objContext.r = collision.r;
                objContext.radiusSq = Math.pow(collision.r, 2);
            } else {
                // TODO: square properties?
            }

            return objContext; 
        }

        private _compareCircleBoundaries(col1, col2): boolean {
            var distX = col1.x - col2.x,
                distY = col1.y - col2.y,
                squaredist = (distX * distX) + (distY * distY);

            var intersect = squaredist <= (col1.r + col2.r) * (col1.r + col2.r);

            if (intersect) {

                var key = this._makeKeyHash(col1.id, col2.id);
                this._currentCollisions[key] = true;

                if (col1.collisionFunction) {
                    col1.collisionFunction(col2.obj);
                }

                if (col2.collisionFunction) {
                    col2.collisionFunction(col1.obj);
                }
            } else {
                this._checkForUncollision(col1, col2);
            }

            return intersect;
        }

        private _compareSquareBoundaries(obj1, obj2) {
            // TODO
            /* NOT (
            (Rect1.Bottom < Rect2.Top) OR
            (Rect1.Top > Rect2.Bottom) OR
            (Rect1.Left > Rect2.Right) OR
            (Rect1.Right < Rect2.Left)
            */
        }

        private _compareCircleSquareBoundaries(circle, square) {
            // TODO
        }

        // change to Collion, not GameObject
        private _checkForUncollision(obj1: Objects.GameObject, obj2: Objects.GameObject)  {
            var key = this._makeKeyHash(obj1.id, obj2.id);
            if (this._prevCollisions[key]) {
                // fire uncollide
                if (obj1['uncollisionFunction']) {
                    obj1['uncollisionFunction'](obj2['obj1']);
                }
                if (obj2['uncollisionFunction']) {
                    obj2['uncollisionFunction'](obj1['obj']);
                }
            }
        }

        private _makeKeyHash(key1: string, key2: string): string {
            var keyHash = key1 < key2 ? key1.toString() + key2.toString() : 
            key2.toString() + key1.toString();
        
            return keyHash;
        }
    }
}