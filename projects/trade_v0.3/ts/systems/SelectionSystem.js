/******************************************************************************
 * Trade.Systems.SelectionSystem
 * System that handles and updates object collisions.
 * (c) 2014 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../TradeGame.ts" />
/// <reference path="../util/Config.ts" />
var Trade;
(function (Trade) {
    var Systems;
    (function (Systems) {
        var SelectionSystem = (function () {
            // TODO: context needed?
            function SelectionSystem(options) {
                this.type = 'selection';
                this.game = options.game;
            }
            SelectionSystem.prototype.update = function (x, y, e) {
                var sceneItems = this.game.sceneItems, len = sceneItems.length, self = this, selectedItems = {};
                // find all objects within x, y coordinates of click
                for (var i = 0; i < len; i++) {
                    if (sceneItems[i].components.hasOwnProperty("selectable")) {
                        var selectable = sceneItems[i].components['selectable'];
                        //.testSelection
                        var selected = selectable.selectedFunction(x, y, e, selectable); // , self.context
                        if (selected) {
                            // TODO: fix
                            selectedItems[sceneItems[i].id] = sceneItems[i];
                        }
                    }
                }
                // new selection(s) found
                if (Object.keys(selectedItems).length) {
                    this._handleNewSelection(selectedItems, x, y, e);
                }
                else if (this.selection) {
                    this._delegateClickToSelection(x, y, e);
                }
            };
            SelectionSystem.prototype._addToSelectionData = function (data, item) {
                if (!data[item.type]) {
                    data[item.type] = [];
                }
                data[item.type].push(item);
            };
            SelectionSystem.prototype._handleNewSelection = function (selectedItems, x, y, e) {
                this._deselectCurrentItem();
                var selected = null;
                if (selectedItems[Trade.Config.objectTypes['SHIP']]) {
                    selected = selectedItems[Trade.Config.objectTypes['SHIP']];
                }
                else if (selectedItems[Trade.Config.objectTypes['CITY']]) {
                    selected = selectedItems[Trade.Config.objectTypes['SHIP']];
                }
                else {
                    // TODO: flesh this out better
                    var keys = Object.keys(selectedItems);
                    selected = selectedItems[keys[0]];
                }
                this._selectItem(selected[0], x, y, e);
            };
            SelectionSystem.prototype._selectItem = function (item, x, y, e) {
                if (this.selection.components['selectable'].selectedFunction) {
                    this.selection.components['selectable'].selectedFunction(x, y, e);
                }
            };
            SelectionSystem.prototype._delegateClickToSelection = function (x, y, e) {
                if (this.selection.components['selectable'].handleClick) {
                    this.selection.components['selectable'].handleClick(x, y, e);
                }
            };
            SelectionSystem.prototype._deselectCurrentItem = function () {
                if (this.selection.components['selectable'].deselectFunction) {
                    this.selection.components['selectable'].deselectFunction();
                }
                this.selection = null;
            };
            return SelectionSystem;
        })();
        Systems.SelectionSystem = SelectionSystem;
    })(Systems = Trade.Systems || (Trade.Systems = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=SelectionSystem.js.map