/******************************************************************************
 * Trade.Objects.Marker
 * A base city class for tradegame
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};
Trade.Objects = Trade.Objects || {};

Trade.Objects.Marker = function(options) {
    return (function(options, config, GameObject, Renderable) {
        var self = $.extend(new GameObject({
            x: options.x || 100,
            y: options.y || 100,
            w: options.w || 20,
            h: options.h || 20,
            sX: options.sX || 1,
            sY: options.sY || 1,
            type: config.objectTypes.MARKER
        }), {});

        self._maxTimeAlive = 50;
        self._timeAlive = 0;

        self.addComponent(new Renderable({
            renderType: "function",
            renderFunction: function(context) {
                if (self._timeAlive >= self._maxTimeAlive) {
                    radio("marker:remove").broadcast(self.id);
                    return;
                }

                self._timeAlive++;

                
                var scale = self.sX * (self._timeAlive / 10);
                context.strokeStyle = "#FF6622";
                context.beginPath();
                context.arc(self.x, self.y, self.w * scale / 3, 0, 2 * Math.PI, false);
                context.closePath();
                context.globalAlpha = 1 - scale / 5;
                context.lineWidth = 2;
                context.stroke();
                self.globalAlpha = 1;
            }
        }));
        
        return self;

    })(options, Trade.Config, Trade.Objects.GameObject, Trade.Components.Renderable);
};