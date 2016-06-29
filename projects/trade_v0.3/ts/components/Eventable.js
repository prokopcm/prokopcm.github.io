/// <reference path="Component.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Eventable = (function (_super) {
            __extends(Eventable, _super);
            function Eventable(options) {
                _super.call(this);
                this._events = {};
                options = options || {};
                this.eventable = options.eventable || true;
            }
            Eventable.prototype.trigger = function (eventName, options) {
                if (this._events.hasOwnProperty(eventName)) {
                    for (var i = 0; i < this._events[eventName].length; ++i) {
                        var item = this._events[eventName][i];
                        item.action.apply(item.context, [options]);
                    }
                }
            };
            Eventable.prototype.on = function (eventName, action, context) {
                if (!this._events.hasOwnProperty(eventName)) {
                    this._events[eventName] = [];
                }
                this._events[eventName].push({
                    action: action,
                    context: context
                });
            };
            Eventable.prototype.off = function () {
                this._events = {};
            };
            return Eventable;
        })(Components.Component);
        Components.Eventable = Eventable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Eventable.js.map