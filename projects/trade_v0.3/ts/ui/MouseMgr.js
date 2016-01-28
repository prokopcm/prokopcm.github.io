/// <reference path="../TradeGame.ts" />
/// <reference path="../TypeDefs.d.ts" />
var Trade;
(function (Trade) {
    var UI;
    (function (UI) {
        var MouseMgr = (function () {
            function MouseMgr(options) {
                var _this = this;
                this._movingCamera = false;
                this._origPosX = 0;
                this._origPosY = 0;
                this._lastPosY = 0;
                this._lastPosX = 0;
                this._cameraMovePixelThreshold = 9;
                this.game = options.game;
                var game = this.game;
                game.$canvas.on('contextmenu', function (e) {
                    return false;
                });
                game.$canvas.on('mousedown', function (e) { return _this.onMouseDown(e); });
                game.$canvas.on('mouseup', function (e) { return _this.onMouseUp(e); });
                $('.close-btn').click(function () {
                    $('.ship-icon').off();
                    $('#city-screen').hide();
                });
            }
            MouseMgr.prototype.onMouseDown = function (e) {
                e.preventDefault();
                var self = this;
                this._origPosX = e.offsetX,
                    this._origPosY = e.offsetY,
                    this._lastPosX = e.offsetX,
                    this._lastPosY = e.offsetY;
                this._movingCamera = false;
                this.game.$canvas.on('mousemove', function (e) { return self.onMouseMove(e); });
            };
            MouseMgr.prototype.onMouseUp = function (e) {
                this.game.$canvas.off('mousemove');
                // convert to canvas coords, compensate for camera offset
                var x = (e.pageX - e.target.offsetLeft) - this.game.camera.x, y = (e.pageY - e.target.offsetTop) - this.game.camera.y;
                // only register action if user didn't move camera while clicking
                if (!this._movingCamera) {
                    this.game.selectionSystem.update(x, y, e);
                }
            };
            MouseMgr.prototype.onMouseMove = function (e) {
                if (!this._movingCamera) {
                    if (Math.abs(this._origPosX - e.offsetX) > this._cameraMovePixelThreshold ||
                        Math.abs(this._origPosY - e.offsetY) > this._cameraMovePixelThreshold) {
                        this._movingCamera = true;
                    }
                }
                else {
                    var deltaX = this._lastPosX - e.offsetX, deltaY = this._lastPosY - e.offsetY;
                    this._lastPosX = e.offsetX;
                    this._lastPosY = e.offsetY;
                    this.game.camera.x += deltaX;
                    this.game.camera.y += deltaY;
                }
            };
            return MouseMgr;
        })();
        UI.MouseMgr = MouseMgr;
    })(UI = Trade.UI || (Trade.UI = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=MouseMgr.js.map