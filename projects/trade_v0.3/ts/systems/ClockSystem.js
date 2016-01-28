/******************************************************************************
 * Trade.Clock
 * A clock that ticks at 30 Hz
 * (c) 2013 Michael Prokopchuk
 *
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../interfaces/ISystem.ts" />
var Trade;
(function (Trade) {
    var Systems;
    (function (Systems) {
        var ClockSystem = (function () {
            function ClockSystem(options) {
                this.type = 'clock';
                this.tick = 0;
                this._clockListeners = {};
                this._listenerMap = {};
                this.tickRate = options.tickRate || 30;
                this.game = options.game;
            }
            ClockSystem.prototype.start = function () {
                var _this = this;
                setInterval(function () { return _this.onTick(); }, 1000 / this.tickRate);
            };
            ClockSystem.prototype.addListener = function (obj, rate) {
                if (!this._clockListeners.hasOwnProperty(obj.id)) {
                    this._clockListeners[obj.id] = obj;
                }
            };
            ClockSystem.prototype.removeListener = function (obj, rate) {
                if (this._clockListeners.hasOwnProperty(obj.id)) {
                    delete this._clockListeners[obj.id];
                }
            };
            ClockSystem.prototype.onTick = function () {
                // prevent number overflow
                if (this.tick === 9007199254740992) {
                    this.tick = 0;
                }
                this.tick++;
                var rateTick = (this.tick + 1) % this.tickRate, objects = this.game.sceneItems, tick = this.tick, clockListeners = this._clockListeners;
                for (var key in objects) {
                    if (objects[key].components['tickable']) {
                        var obj = objects[key].components['tickable'];
                        if (obj.onTick) {
                            obj.onTick.call(obj, tick, rateTick);
                        }
                    }
                }
                for (var key in clockListeners) {
                    clockListeners[key].onTick.call(clockListeners[key], tick, rateTick);
                }
            };
            return ClockSystem;
        })();
        Systems.ClockSystem = ClockSystem;
    })(Systems = Trade.Systems || (Trade.Systems = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=ClockSystem.js.map