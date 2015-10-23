var Trade = window.Trade || {};
Trade.Systems = Trade.Systems || {};

Trade.Systems.EconomySystem = function(options) {
    this.type = "economy";

    this.game = options.game;

    this.updateRate = options.updateRate || 30;
    
    this.world = {
        wealth: 100
    };
    
    this.items = {};
    
    this.items[Trade.Config.tradeItemTypes.BREAD] = new Trade.Objects.TradeItem({
        id: Trade.Config.tradeItemTypes['BREAD'],
        value: 5 
    });

    this.items[Trade.Config.tradeItemTypes.WOOD] = new Trade.Objects.TradeItem({
        id: Trade.Config.tradeItemTypes['WOOD'],
        value: 8
    });

    this.items[Trade.Config.tradeItemTypes.TEA] = new Trade.Objects.TradeItem({
        id: Trade.Config.tradeItemTypes['TEA'],
        value: 3
    });
};

var econ = Trade.Systems.EconomySystem;

econ.prototype.onTick = function(tick, rate) {
    if (tick % this.updateRate === 0) {
        this.update();
    }
};

econ.prototype.update = function() {
    
};

econ.prototype.getItemValues = function() {
    // TODO
};

econ.prototype.getItemValue = function(type) {
    // TODO
};

econ.prototype.getItems = function() {
    // TODO
};

econ.prototype.getItem = function(type) {
    if (this.items[type]) {
        return this.items[type];
    }

    return null;
};