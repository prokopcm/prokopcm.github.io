/******************************************************************************
 * Trade.Components.Selectable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Selectable = function(options) {
    
    this.type = "selectable";

    /**
     * Whether an object is selected
     * @type {boolean}
     */
    this.selected = options.selected || false;

    /**
     * Changes the selection of an object
     * @param  {boolean} select whether to select or deselect an object
     * @return {boolean}        whether the object is now selected
     */
    this.select = function(select) {
        this.selected = select;

        return this.selected;
    };

    this.testSelection = function(x, y, e) {
        
        if (this.selectedFunction) {
            this.selectedFunction(x, y, e, this);
        }
    }

    this.drawCircleWhenSelected = options.drawCircleWhenSelected || true;

    this.selectedFunction = options.selectedFunction || null;

    this.deselectedFunction = options.deselectedFunction || null;

    this.clickFunction = options.clickFunction || null;
};