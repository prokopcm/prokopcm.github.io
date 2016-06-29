/// <reference path="Component.ts" />
/// <reference path="../objects/Ship.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Storable = (function (_super) {
            __extends(Storable, _super);
            function Storable(options) {
                _super.call(this);
                this.type = "storable";
                this.storable = true;
                this.storeType = options.storeType || "inventory";
                this.storage = options.storage || {};
                this.maxItems = options.maxItems || 10;
            }
            Storable.prototype.addItem = function (item, qty) {
                var type = (typeof item === "object") ? item.type : item;
                if (typeof item === "string") {
                }
                if (!this.storage[type]) {
                    this.storage[type] = item;
                }
                else {
                    this.storage[type].quantity += qty;
                }
            };
            Storable.prototype.removeItem = function (item, qty) {
                /*
                var type = (typeof item === "object") ? item.type || item;
                */
                //if (!this.storage.hasOwnProperty(type)) {
                // TODO
                //}
            };
            Storable.prototype.getQuantity = function (item) {
                var qty = 0, type = (typeof item === "object") ? item.type : item;
                if (!this.storage[item.type]) {
                    qty = this.storage[type].quantity;
                }
                return qty;
            };
            return Storable;
        })(Components.Component);
        Components.Storable = Storable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Storable.js.map