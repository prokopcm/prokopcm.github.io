/******************************************************************************
 * Trade.Objects.WaterBackground
 * A waterey background object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};
Trade.Objects = Trade.Objects || {};

Trade.Objects.WaterBackground = function(options) {
    return (function(options, config, GameObject, Renderable) {

        var self = $.extend(new GameObject({
            x: options.x,
            y: options.y,
            w: options.w,
            h: options.h,
            type: config.objectTypes.WATER_BACKGROUND
        }), {});

        self.addComponent(new Renderable({
            renderType: "function",
            renderFunction: function(context) {
                context.fillStyle = "#00CCFF";

                context.fillRect(self.x, self.y, self.w, self.h);
            }
        }));
        
        return self;

    })(options, Trade.Config, Trade.Objects.GameObject, Trade.Components.Renderable);
};