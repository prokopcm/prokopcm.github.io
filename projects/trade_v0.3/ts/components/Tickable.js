var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Component.ts" />
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Tickable = (function (_super) {
            __extends(Tickable, _super);
            function Tickable(options) {
                _super.call(this);
                this.tickable = true;
                this.onTick = options && options.onTick ? options.onTick : null;
            }
            Tickable.prototype.setOnTick = function (fn) {
                this.onTick = fn;
            };
            return Tickable;
        })(Components.Component);
        Components.Tickable = Tickable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Tickable.js.map