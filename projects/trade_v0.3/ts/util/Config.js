var Trade;
(function (Trade) {
    var Config;
    (function (Config) {
        (function (owners) {
            owners[owners["WORLD"] = 0] = "WORLD";
            owners[owners["PLAYER"] = 1] = "PLAYER";
            owners[owners["AI_1"] = 2] = "AI_1";
        })(Config.owners || (Config.owners = {}));
        var owners = Config.owners;
        (function (storeTypes) {
            storeTypes[storeTypes["INVENTORY"] = 0] = "INVENTORY";
        })(Config.storeTypes || (Config.storeTypes = {}));
        var storeTypes = Config.storeTypes;
        (function (objectTypes) {
            objectTypes[objectTypes["GAME_OBJECT"] = 0] = "GAME_OBJECT";
            objectTypes[objectTypes["WATER_BACKGROUND"] = 1] = "WATER_BACKGROUND";
            objectTypes[objectTypes["CITY"] = 2] = "CITY";
            objectTypes[objectTypes["SHIP"] = 3] = "SHIP";
            objectTypes[objectTypes["MARKER"] = 4] = "MARKER";
            objectTypes[objectTypes["COLLISION"] = 5] = "COLLISION";
            objectTypes[objectTypes["EMITTER"] = 6] = "EMITTER";
            objectTypes[objectTypes["TRADE_ITEM"] = 7] = "TRADE_ITEM";
            objectTypes[objectTypes["CAMERA"] = 8] = "CAMERA";
            objectTypes[objectTypes["PARTICLE"] = 9] = "PARTICLE";
        })(Config.objectTypes || (Config.objectTypes = {}));
        var objectTypes = Config.objectTypes;
        (function (componentTypes) {
            componentTypes[componentTypes["EVENTABLE"] = 0] = "EVENTABLE";
            componentTypes[componentTypes["DAMAGEABLE"] = 1] = "DAMAGEABLE";
            componentTypes[componentTypes["DOCKABLE"] = 2] = "DOCKABLE";
            componentTypes[componentTypes["RENDERABLE"] = 3] = "RENDERABLE";
            componentTypes[componentTypes["TICKABLE"] = 4] = "TICKABLE";
        })(Config.componentTypes || (Config.componentTypes = {}));
        var componentTypes = Config.componentTypes;
        (function (systemTypes) {
            systemTypes[systemTypes["COLLISION"] = 0] = "COLLISION";
        })(Config.systemTypes || (Config.systemTypes = {}));
        var systemTypes = Config.systemTypes;
        (function (missionTypes) {
            missionTypes[missionTypes["FETCH_ITEMS"] = 0] = "FETCH_ITEMS";
        })(Config.missionTypes || (Config.missionTypes = {}));
        var missionTypes = Config.missionTypes;
        (function (collisionTypes) {
            collisionTypes[collisionTypes["CIRCLE"] = 0] = "CIRCLE";
            collisionTypes[collisionTypes["SQUARE"] = 1] = "SQUARE";
        })(Config.collisionTypes || (Config.collisionTypes = {}));
        var collisionTypes = Config.collisionTypes;
        Config.tradeItems = {
            BREAD: {
                id: 'BREAD',
                name: 'Bread',
                baseValue: 5
            },
            TEA: {
                id: 'TEA',
                name: 'Tea',
                baseValue: 3
            },
            WOOD: {
                id: 'WOOD',
                name: 'Wood',
                baseValue: 8
            }
        };
    })(Config = Trade.Config || (Trade.Config = {}));
})(Trade || (Trade = {}));
/*
    export var Config: TradeConfig = {

    
        storeTypes: {
            'INVENTORY': 'inventory'
        },
    
        collisionTypes: {
            'CIRCLE': 'circle',
            'SQUARE': 'square'
        },
    
        objectTypes: {
          'WATER_BACKGROUND': 'water_empty',
          'CITY': 'city',
          'SHIP': 'ship',
          'MARKER': 'movement_marker',
          'COLLISION': 'collision',
          'EMITTER': 'emitter',
          'TRADE_ITEM': 'trade_item',
          'CAMERA': 'camera'
        },
    
        tradeItems: {
            'BREAD': {
                id: 'BREAD',
                name: 'Bread',
                baseValue: 5
            },
            'TEA': {
                id: 'TEA',
                name: 'Tea',
                baseValue: 3
            },
            'WOOD': {
                id: 'WOOD',
                name: 'Wood',
                baseValue: 8
            }
        },
    
        missionTypes: {
          'FETCH_ITEMS': 'fetch items'
        }
    };
}
*/ 
//# sourceMappingURL=Config.js.map