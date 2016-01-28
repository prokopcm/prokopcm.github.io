/******************************************************************************
 * Trade.Objects.TradeItem
 * A tradeable object
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Trade;
(function (Trade) {
    var Objects;
    (function (Objects) {
        var TradeItem = (function (_super) {
            __extends(TradeItem, _super);
            function TradeItem(options) {
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.TRADE_ITEM;
                this.rarity = options.rarity || 1;
                this.value = options.value || 1;
            }
            return TradeItem;
        })(Objects.GameObject);
        Objects.TradeItem = TradeItem;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=TradeItem.js.map