/// <reference path="../interfaces/ISystem.ts" />
/// <reference path="../components/Tickable.ts" />
/// <reference path="../util/Helpers.ts" />
/// <reference path="../objects/TradeItem.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Systems;
    (function (Systems) {
        var EconomySystem = (function (_super) {
            __extends(EconomySystem, _super);
            function EconomySystem(options) {
                _super.call(this);
                this.id = Helpers.generateId();
                this.type = 'economy';
                this.game = options.game;
                /**
                 * Rate at which to update. Default 30 ticks.
                 * @type {Number}
                 */
                this.updateRate = options.updateRate || 30;
                this.world = {
                    wealth: 100
                };
                this.items = options.items || [];
                this.onTick = function (tick, rate) {
                    if (tick % this.updateRate === 0) {
                        this.update();
                    }
                };
            }
            EconomySystem.prototype.update = function () {
            };
            EconomySystem.prototype.getItemValues = function () { };
            EconomySystem.prototype.getItemValue = function (type) {
                var item = this.getItem(type), value = (item.value * (this.world.wealth / 100)) * item.rarity;
                return value;
            };
            EconomySystem.prototype.getItems = function () {
            };
            EconomySystem.prototype.getItem = function (type) {
                if (this.items[type]) {
                    return this.items[type];
                }
                return null;
            };
            return EconomySystem;
        })(Trade.Components.Tickable);
        Systems.EconomySystem = EconomySystem;
    })(Systems = Trade.Systems || (Trade.Systems = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=EconomySystem.js.map