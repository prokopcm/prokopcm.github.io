var Trade = window.Trade || {};
Trade.Systems = Trade.Systems || {};

Trade.Systems.TransferSystem = function(options) {
    this.type = "transfer";

    this.parent = options.parent;
};