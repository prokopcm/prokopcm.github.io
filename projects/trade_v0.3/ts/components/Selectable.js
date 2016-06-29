/******************************************************************************
 * Trade.Components.Selectable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
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
        var Selectable = (function (_super) {
            __extends(Selectable, _super);
            function Selectable(options) {
                _super.call(this);
                this.type = "selectable";
                this.selectable = true;
                this.selected = options.selected || false;
                this.drawCicleWhenSelected = options.drawCircleWhenSelected || false;
                this.selectedFunction = options.selectedFunction || null;
                this.deselectedFunction = options.deselectedFunction || null;
                this.clickFunction = options.clickFunction || null;
            }
            return Selectable;
        })(Components.Component);
        Components.Selectable = Selectable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Selectable.js.map