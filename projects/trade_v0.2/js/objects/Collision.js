/******************************************************************************
 * Trade.Objects.Collision
 * A city object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};
Trade.Objects = Trade.Objects || {};

Trade.Objects.Collision = function(options) {
    return (function(options, config, GameObject) {

        var self = $.extend(new GameObject({
            x: options.x || 100,
            y: options.y || 100,
            w: options.w || 100,
            h: options.h || 100,
            type: config.objectTypes.COLLISION
        }), {});

        /**
         * collision parent object
         * @type {GameObject}
         */
        // TODO: this isn't used anywhere
        self.parent = options.parent || null;

        /** 
         * collsion object radius
         * @type {number}
         */
        self.r = options.r || 0;
        
        /** 
         * collision bounding shape
         * @type {config.collisionType}
         */
        self.collisionType = options.collisionType || config.collisionTypes.CIRCLE;

        /**
         * Whether the position should be considered relative to its parent
         * @type {Boolean}
         */
        self.relativeToParent = options.relativeToParent || true;

        /**
         * Function to perform on successful collision test
         */
        self.collisionFunction = options.collisionFunction || null;

        /**
         * Function to perform on successful collision test
         */
        self.uncollisionFunction = options.uncollisionFunction || null;

        return self;

    })(options, Trade.Config, Trade.Objects.GameObject);
};