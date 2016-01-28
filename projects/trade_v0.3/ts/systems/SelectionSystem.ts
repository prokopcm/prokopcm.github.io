/******************************************************************************
 * Trade.Systems.SelectionSystem
 * System that handles and updates object collisions.
 * (c) 2014 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/

/// <reference path="../TradeGame.ts" />
/// <reference path="../util/Config.ts" />


module Trade.Systems {

    export class SelectionSystem {
        
        type: string = 'selection';
        
        game: Trade.Game;
        
        // todo: add better type-- Components.Selectable?
        selection: any;
        
        // TODO: context needed?
        
        constructor(options: {game: Trade.Game}) {
            this.game = options.game;
        }

        update(x: number, y: number, e: JQueryEventObject) {
        
            var sceneItems = this.game.sceneItems,
                len = sceneItems.length,
                self = this,
                selectedItems = {};
    
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
    
            // no new selection, but we already have an object we may want to delegate functionality to
            else if (this.selection) {
                this._delegateClickToSelection(x, y, e);
            }
        }
    
        private _addToSelectionData(data, item) {
            if (!data[item.type]) {
                data[item.type] = [];
            }
            data[item.type].push(item);
        }
    
        private _handleNewSelection(selectedItems, x, y, e) {
            this._deselectCurrentItem();
    
            var selected = null;
            if (selectedItems[Trade.Config.objectTypes['SHIP']]) {
                selected = selectedItems[Trade.Config.objectTypes['SHIP']];
            } else if (selectedItems[Trade.Config.objectTypes['CITY']]) {
                selected = selectedItems[Trade.Config.objectTypes['SHIP']];
            } else {
                // TODO: flesh this out better
                var keys = Object.keys(selectedItems);
                selected = selectedItems[keys[0]];
            }
    
            this._selectItem(selected[0], x, y, e);
        }
    
        private _selectItem(item, x: number, y: number, e) {
            if (this.selection.components['selectable'].selectedFunction) {
                this.selection.components['selectable'].selectedFunction(x, y, e);
            }
        }
    
        private _delegateClickToSelection(x: number, y: number, e: JQueryEventObject) {
            if (this.selection.components['selectable'].handleClick) {
                this.selection.components['selectable'].handleClick(x, y, e);
            }
        }
    
        private _deselectCurrentItem() {
            if (this.selection.components['selectable'].deselectFunction) {
                this.selection.components['selectable'].deselectFunction();
            }
    
            this.selection = null;
        }
    }
}