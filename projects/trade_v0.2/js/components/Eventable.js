/******************************************************************************
 * Trade.Components.Eventable
 * Event manager for tradegame.
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};
Trade.Components.Eventable = function(options) {
    
    this._events = {};

    this.eventable = options.eventable || true;

    this.trigger = function trigger(eventName, options) {
        if (this._events.hasOwnProperty(eventName)) {
            for (var i = 0; i < this._events[eventName].length; i++) {
                var item = this._events[eventName][i];
                item.action.apply(item.context, [options]);
            }
        }
    }

    this.on = function on(eventName, action, context) {
        if (!this._events.hasOwnProperty(eventName)) {
            this._events[eventName] = [];
        }
        
        this._events[eventName].push({action: action, context: context});
    }

    this.off = function off() {
        this._events = {};
    }
};