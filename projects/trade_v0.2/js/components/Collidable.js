/******************************************************************************
 * Trade.Components.Collidable
 * Allows collision of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Collidable = function(options) {
    
    this.type = "collidable";

    this.collisions = options.collisions || [];
};