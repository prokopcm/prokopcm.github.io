/******************************************************************************
 * Trade.Components.Renderable
 * Allows rendering of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Renderable = function(options) {

    this.type = "renderable"
    
    /**
     * The object's render type "sprite" || "function"
     * @type {string}
     */
    this.renderType = options.renderType || 0;

    /**
     * The object's desired rotation amount in radians
     * @type {File}
     */
    this.sprite = options.sprite || null;

    /**
     * The object's rotation speed
     * @type {function}
     */
    this.renderFunction = options.renderFunction || null;

    //var renderFunc = null;

    this.render = function(context) {
        if (this.sprite) {
            // TODO
        } else if (this.renderFunction) {
            this.renderFunction(context);
        }
    }
};