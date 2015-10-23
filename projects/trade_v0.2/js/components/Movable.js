/******************************************************************************
 * Trade.Components.Movable
 * Allows movement of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Movable = function(options) {

    this.type = "movable";
    
    /**
     * Whether the object is currently in a moving state
     * @type {boolean}
     */
    this.moving = options.moving || false;

    /**
     * The object's X-velocity
     * @type {number}
     */
    this.vx = options.vx || 0;

    /**
     * The object's Y-velocity
     * @type {number}
     */
    this.vy = options.vy || 0;

    /**
     * The object's destination X-position
     * @type {number}
     */
    this.destX = options.destX || 0;

    /**
     * The object's destination Y-position
     * @type {number}
     */
    this.destY = options.destY || 0;

    this.dirX = 1;

    this.dirY = 1;

    /**
     * The object's maximum movement speed
     * @type {number}
     */
    this.maxSpeed = options.maxSpeed || 1;

    /**
     * The object's current movement inertia amount
     * @type {number}
     */
    this.inertia = options.inertia || 0;

    /**
     * The initial amount of movement inertia to apply when an object starts moving
     * @type {number}
     */
    this.initialInertia = options.initialInertia || 0;

    /**
     * Sets an object's destination coordinates and starts an object moving 
     * towards that position.
     * @param  {number} xPos the world X-position of the coordinate
     * @param  {number} yPos the world Y-position of the coordinate
     */
    this.setDestination = function(dest) {
        this.moving = true;

        this.destX = dest.x;
        this.destY = dest.y;
        this.vx = dest.vx;
        this.vy = dest.vy;
        this.dirX = dest.dirX;
        this.dirY = dest.dirY;
    };
};