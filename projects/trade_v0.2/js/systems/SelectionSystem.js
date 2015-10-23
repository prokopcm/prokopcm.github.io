/******************************************************************************
 * Trade.Systems.SelectionSystem
 * System that handles clicks and selections in the game world.
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Systems = Trade.Systems || {};

// TODO: stop sucking at making consistent interfaces

/** @namespace */
Trade.Systems.SelectionSystem = function(options) {
    this.game = options.game;

    this.type = "selection";

    this.selection = null;

    this.update = function(x, y, e) {
        
        var sceneItems = this.game.sceneItems,
            len = sceneItems.length,
            self = this,
            selectedItems = {};

        // find all objects within x, y coordinates of click
        for (var i = 0; i < len; i++) {

            if (sceneItems[i].components.hasOwnProperty("selectable")) {
                var selected = sceneItems[i].components.selectable.testSelection(x, y, e, self.context);
                if (selected) {
                    selectedItems.push(sceneItems[i]);
                }
            }
        }

        // new selection(s) found
        if (Object.keys(selectedItems).length) {
            this._handleNewSelection(selectedItems, x, y, e);
        } 

        // no new selection, but we already have an object we may want to delegate functionality to
        else if (this.selection) {
            this._delegateClickToSelection(x, y, e);
        }
    };

    this._addToSelectionData = function(data, item) {
        if (!data[item.type]) {
            data[item.type] = [];
        }
        data[item.type].push(item);
    };

    this._handleNewSelection = function(selectedItems, x, y, e) {
        this._deselectCurrentItem();

        var selected = null;
        
        if (selectedItems[Trade.Config.objectTypes.SHIP]) {
            selected = selectedItems[Trade.Config.objectTypes.SHIP];
        } else if (selectedItems[Trade.Config.objectTypes.CITY]) {
            selected = selectedItems[Trade.Config.objectTypes.SHIP];
        } else {
            // TODO: flesh this out better
            var keys = Object.keys(selectedItems);
            selected = selectedItems[keys[0]];
        }

        this._selectItem(selected[0], x, y, e);
    };

    this._selectItem = function(item, x, y, e) {
        if (this.selection.components['selectable'].selectedFunction) {
            this.selection.components['selectable'].selectedFunction(x, y, e);
        }
    };

    this._delegateClickToSelection = function(x, y, e) {
        if (this.selection.components['selectable'].handleClick) {
            this.selection.components['selectable'].handleClick(x, y, e);
        }
    };

    this._deselectCurrentItem = function() {
        if (this.selection.components['selectable'].deselectFunction) {
            this.selection.components['selectable'].deselectFunction();
        }

        this.selection = null;
    };
};