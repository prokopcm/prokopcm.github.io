/******************************************************************************
 * Trade.Components.Scaleable
 * Allows movement of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Scaleable = function(options) {

    /**
     * Whether the object is currently scaling
     * @type {boolean}
     */
    this.scaling = options.scaling || false;
    /**
     * The object's current rotation amount in radians
     * @type {number}
     */
    this.scale = options.scale || 1.0;

    /**
     * The object's desired rotation amount in radians
     * @type {number}
     */
    this.destRotation = options.destRotation || options.scale || 1.0;

    /**
     * The object's scale speed
     * @type {number}
     */
    this.scaleSpeed = options.scaleSpeed || 1;

    /**
     * Sets an object's destination coordinates and starts an object moving 
     * towards that position.
     * @param  {number} xPos the world X-position of the coordinate
     */
    this.prototype.setScaleImmediate = function(scale) {

    };

    this.prototype.setScale = function(scale) {

    };
};