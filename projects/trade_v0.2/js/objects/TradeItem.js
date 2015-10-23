/******************************************************************************
 * Trade.Objects.GameObject
 * A base city class for tradegame
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};
Trade.Objects = Trade.Objects || {};

Trade.Objects.TradeItem = function(options) {
    this.id = options.id || Helpers.generateId();
    this.type = Trade.Config.objectTypes.TRADE_ITEM;

    this.rarity = options.rarity || 1;
    this.value = options.value || 1;
};

Trade.Objects.GameObject.prototype.destroy = function() {
    // TODO: remove all references
};

Trade.Objects.GameObject.prototype.toString = function() {
    return this.id;
};