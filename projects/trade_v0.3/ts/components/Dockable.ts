/// <reference path="Component.ts" />
/// <reference path="../objects/Ship.ts" />

module Trade.Components {

    export class Dockable extends Component {
        type = "dockable";
        
        dockable = true;

        /**
         * List of docked ships
         * @type {object<Trade.Objects.Ship>}
         */
        dockedShips: Array<Trade.Objects.Ship>;
        
        onDock: (ship: Trade.Objects.Ship) => void;
        onUndock: (ship: Trade.Objects.Ship) => void;
        
        constructor(options?) {
            super();
            options = options || {};
            
            this.onDock = options.onDock || function(ship) {
                return false;
            };
            
            this.onUndock = options.onUndock || function(ship) {
                return false;
            };
        }
        
        /**
         * Adds a ship to the list of docked ships
         * @param  {Trade.Objects.Ship} the ship to dock in the object
         */
        dock(ship: Trade.Objects.Ship) {
            if (!this.dockedShips[ship.id]) {
                this.dockedShips[ship.id] = ship;
                this.onDock(ship);
            }
        }
        
        /**
         * Removes a ship to the list of docked ships
         * @param  {Trade.Objects.Ship} the ship to undock from the object
         */
        undock(ship: Trade.Objects.Ship) {
            if (this.dockedShips[ship.id]) {
                delete this.dockedShips[ship.id];
                this.onUndock(ship);
            }
        }
        
        getDockingInfo(owner: string) {
            var needleOwner = owner || Trade.Config.owners['PLAYER'],
                dockedObjects = this.dockedShips,
                dockedPlayerObjects = [];
        
            for (var object in dockedObjects) {
                if (dockedObjects[object].owner === needleOwner) {
                    dockedPlayerObjects.push(dockedObjects[object]);
                }
            }
        
            var numOfObjsInDockable = Object.keys(dockedObjects).length,
                numOfPlayerObjsInDockable = dockedPlayerObjects.length;
        
            return {
                numDockedObjects: numOfObjsInDockable,
                numDockedPlayerObjects: numOfPlayerObjsInDockable,
                playerShips: dockedPlayerObjects,
                firstDock: numOfPlayerObjsInDockable === 1
            };
        }
    }
}