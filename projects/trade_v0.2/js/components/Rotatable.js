/******************************************************************************
 * Trade.Components.Rotatable
 * Allows movement of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Rotatable = function(options) {

    this.type = "rotatable";

    /**
     * Whether the object is currently rotating
     * @type {boolean}
     */
    this.rotating = options.rotating || false;
    /**
     * The object's current rotation amount in radians
     * @type {number}
     */
    this.rotation = options.rotation || 0;

    /**
     * The object's desired rotation amount in radians
     * @type {number}
     */
    this.destRotation = options.destRotation || 0;

    /**
     * The object's rotation speed
     * @type {number}
     */
    this.vr = options.vr || 0;

    /**
     * The object's current rotation inertia amount
     * @type {number}
     */
    this.inertia = options.inertia || 0;

    /**
     * The initial amount of rotation inertia to apply when an object 
     * starts moving
     * @type {number}
     */
    this.initialInertia = options.initialInertia || 0;

    this.rmConstraint = options.rmConstraint || {
        active: false,
        constraintFormula: function() {
            return true;
        }
    };

    /**
     * Immediately change an object's rotation
     * @param  {number} rotation the target rotation amount
     */
    this.setRotationImmediate = function(rotation) {

    };

    /**
     * Sets an object's destination rotation amount and starts an object 
     * rotating towards that rotation.
     * @param  {number} rotation the target rotation amount
     */
    this.setRotation = function(rotation) {
        this.rotating = true;
        this.destRotation = rotation.destRot;
    };
};