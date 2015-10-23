/******************************************************************************
 * Trade.Components.Dockable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Dockable = function(options) {

    /**
     * List of docked ships
     * @type {object<Trade.Objects.Ship>}
     */
    this.dockedShips = options.dockedShips || {};

    this.onDock = options.onDock || function(ship) {
        return false;
    };

    this.onUndock = options.onUndock || function(ship) {
        return false;
    };
};

var namespace = Trade.Components.Dockable;

namespace.prototype.type = "dockable";

/**
 * Adds a ship to the list of docked ships
 * @param  {Trade.Objects.Ship} the ship to dock in the object
 */
namespace.prototype.dock = function(ship) {
    if (!this.dockedShips[ship.id]) {
        this.dockedShips[ship.id] = ship;

        this.onDock(ship);
    }
};

/**
 * Removes a ship to the list of docked ships
 * @param  {Trade.Objects.Ship} the ship to undock from the object
 */
namespace.prototype.undock = function(ship) {
    if (this.dockedShips[ship.id]) {
        delete this.dockedShips[ship.id];
        this.onUndock(ship);
    }
};

namespace.prototype.getDockingInfo = function(owner) {
    var needleOwner = owner || Trade.Config.owners.PLAYER,
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
};