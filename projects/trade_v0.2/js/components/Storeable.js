/******************************************************************************
 * Trade.Components.Storeable
 * Adds an inventory to an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Storeable = function(options) {
    
    this.type = "storable";

    this.storeType = options.storeType || Trade.Config.storeTypes.INVENTORY;

    this.storage = options.storage || {};


    this.addItem = function(item, qty) {
        
        var type = (typeof item === "object") ? item.type : item;

        if (!this.storage.hasOwnProperty(type)) {
            this.storage[type] = item;
        } else {
            // TODO
        }
    };

    this.removeItem = function(item, qty) {
        /*
        var type = (typeof item === "object") ? item.type || item;
        */
        if (!this.storage.hasOwnProperty(type)) {
            // TODO
        }
    };

    /**
     * Gets the quantity for a collection of items in a storable object
     * @param  {TradeItem|string} item the item type of which to get the quantity
     * @return {number}      the quantity of that item
     */
    this.getQuantity = function(item) {
        /* var type = (typeof item === "object") ? item.type || item; */
        var qty = 0;

        if (!this.storage.hasOwnProperty(type)) {
            qty = this.storage[type].quantity;
        }

        return qty;
    };
};