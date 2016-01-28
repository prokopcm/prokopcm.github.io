interface TradeObject {
    id: string;
    name: string;
    baseValue: number;
}

interface TradeObjectList {
    [index: string]: TradeObject;
}

interface TradeEnum {
    [index: string]: any;
}

interface TradeConfig {
    storeTypes: TradeEnum;
    collisionTypes: TradeEnum;
    objectTypes: TradeEnum;
    tradeItems: TradeObjectList;
    missionTypes: TradeEnum;
}

module Trade.Config {
    export enum owners {
        WORLD,
        PLAYER,
        AI_1
    }
    
    export enum storeTypes {
        INVENTORY
    }
    
    export enum objectTypes {
        GAME_OBJECT,
        WATER_BACKGROUND,
        CITY,
        SHIP,
        MARKER,
        COLLISION,
        EMITTER,
        TRADE_ITEM,
        CAMERA,
        PARTICLE
    }
    
    export enum componentTypes {
        EVENTABLE,
        DAMAGEABLE,
        DOCKABLE,
        RENDERABLE,
        TICKABLE
    }
    
    export enum systemTypes {
        COLLISION
    }
    
    export enum missionTypes {
        FETCH_ITEMS
    }
    
    export enum collisionTypes {
        CIRCLE,
        SQUARE
    }
    
    export var tradeItems = {
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
    }
}
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