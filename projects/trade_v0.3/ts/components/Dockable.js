/// <reference path="Component.ts" />
/// <reference path="../objects/Ship.ts" />
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
        var Dockable = (function (_super) {
            __extends(Dockable, _super);
            function Dockable(options) {
                _super.call(this);
                this.type = "dockable";
                this.dockable = true;
                options = options || {};
                this.onDock = options.onDock || function (ship) {
                    return false;
                };
                this.onUndock = options.onUndock || function (ship) {
                    return false;
                };
            }
            /**
             * Adds a ship to the list of docked ships
             * @param  {Trade.Objects.Ship} the ship to dock in the object
             */
            Dockable.prototype.dock = function (ship) {
                if (!this.dockedShips[ship.id]) {
                    this.dockedShips[ship.id] = ship;
                    this.onDock(ship);
                }
            };
            /**
             * Removes a ship to the list of docked ships
             * @param  {Trade.Objects.Ship} the ship to undock from the object
             */
            Dockable.prototype.undock = function (ship) {
                if (this.dockedShips[ship.id]) {
                    delete this.dockedShips[ship.id];
                    this.onUndock(ship);
                }
            };
            Dockable.prototype.getDockingInfo = function (owner) {
                var needleOwner = owner || Trade.Config.owners['PLAYER'], dockedObjects = this.dockedShips, dockedPlayerObjects = [];
                for (var object in dockedObjects) {
                    if (dockedObjects[object].owner === needleOwner) {
                        dockedPlayerObjects.push(dockedObjects[object]);
                    }
                }
                var numOfObjsInDockable = Object.keys(dockedObjects).length, numOfPlayerObjsInDockable = dockedPlayerObjects.length;
                return {
                    numDockedObjects: numOfObjsInDockable,
                    numDockedPlayerObjects: numOfPlayerObjsInDockable,
                    playerShips: dockedPlayerObjects,
                    firstDock: numOfPlayerObjsInDockable === 1
                };
            };
            return Dockable;
        })(Components.Component);
        Components.Dockable = Dockable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Dockable.js.map