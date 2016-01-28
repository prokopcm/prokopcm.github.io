/// <reference path="Component.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Renderable = (function (_super) {
            __extends(Renderable, _super);
            function Renderable(options) {
                _super.call(this);
                this.type = "renderable";
                this.renderable = true;
                // TODO: sprite support
                this.renderFunction = options.renderFunction || function (context) { };
            }
            Renderable.prototype.render = function (context) {
                if (this.sprite) {
                }
                else if (this.renderFunction) {
                    this.renderFunction(context);
                }
            };
            return Renderable;
        })(Components.Component);
        Components.Renderable = Renderable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Renderable.js.map