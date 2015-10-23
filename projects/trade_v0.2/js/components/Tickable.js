/******************************************************************************
 * Trade.Components.Tickable
 * Event manager for tradegame.
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};
Trade.Components.Tickable = function(options) {

    onTickUpdate: options.onTickUpdate || null
};