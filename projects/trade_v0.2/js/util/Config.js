var Trade = window.Trade || {};
Trade.Config = Trade.Config || {
    owners: {
       'WORLD': 'world',
       'PLAYER': 'player',
       'AI_1': 'ai1'
    },

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
      'TRADE_ITEM': 'trade_item'
    },

    tradeItemTypes: {
        'WOOD': 'Wood',
        'BREAD': 'Bread',
        'TEA': 'Tea'
    },

    missionTypes: {
      'FETCH_ITEMS': 'fetch items'
    }
};