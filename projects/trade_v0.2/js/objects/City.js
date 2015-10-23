/******************************************************************************
 * Trade.Objects.City
 * A city object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};
Trade.Objects = Trade.Objects || {};

Trade.Objects.City = function(options) {
    return (function(options, config, GameObject, Renderable, Selectable, 
        Dockable, Storeable, Collidable, Collision) {

        var self = $.extend(new GameObject({
            x: options.x || 100,
            y: options.y || 100,
            w: options.w || 100,
            h: options.h || 100,
            type: config.objectTypes.CITY
        }), {});

        self.name = options.name || "DefaultCity";

        self.economy = options.economy;

        // TODO: put this into a component or something...
        self.scrollbg = new Image();
        self.scrollLoaded = false;
        self.scrollbg.onload = function(){ self.scrollLoaded = true; };
        self.scrollbg.src = "assets/artwork/scroll.svg";

        self.addComponent(new Selectable({
            selectedFunction: function(x, y, e, context) {
                var detectHit = function() {
                    if ((x > self.x && x < self.x + self.w &&
                        y > self.y && y < self.y + self.h)) {
                        return true;
                    }
                    
                    return false;
                };

                if (detectHit(x, y, e) && e.button === 0) {
                    context.selected = true;
                    self.trigger('cityscreen:show', self);
                    self.trigger('selection:change', self);
                } else {
                    context.selected = false;
                }
            }
        }));

        self.addComponent(new Dockable({
            dockedShips: options.dockedShips,
            onDock: function(ship) {
                if (ship.owner === config.owners.PLAYER) {
                    var info = self.components['dockable'].getDockingInfo(
                        config.owners.PLAYER);
                    
                    if (info.firstDock) {
                        radio("ship:dock").broadcast(self, ship);
                    }
                }
            },

            onUndock: function(ship) {
                if (ship.owner === config.owners.PLAYER) {
                    radio("ship:undock").broadcast(self, ship);
                }
            }
        }));
              
        self.addComponent(new Storeable({
            storage: options.storage
        }));

        self.addComponent(new Collidable({
            collisions: [new Collision({
                x: self.w / 2,
                y: self.h / 2,
                w: 200,
                h: 200,
                r: 200,
                collisionFunction: function(collider) {
                    self.components['dockable'].dock(collider);
                },
                uncollisionFunction: function(collider) {
                    self.components['dockable'].undock(collider);
                }
            })]
        }));

        self.addComponent(new Renderable({
            renderType: "function",
            renderFunction: function(context) {
                context.save();

                // rotate around the center of the object
                context.translate(self.centerX, self.centerY);

                // TODO: make not crappy
                if (self.components.selectable.selected) {

                    // selected circle
                    context.lineWidth = self.h / 20;
                    context.strokeStyle = '#FFFFFF';
                    context.globalAlpha = 0.6;
                    context.beginPath();
                    context.arc(0, 0, self.w - self.w / 5, 0, 2 * Math.PI, false);
                    context.closePath();
                    context.stroke();

                    context.globalAlpha = 1.0;
                }

                // make (0, 0) the upper left corner
                context.translate(-(self.w / 2), -(self.h / 2));

                // draw island
                context.fillStyle = '#e9be3c';
                context.beginPath();
                context.scale(1, 0.5);
                context.arc(self.w / 2, self.h + self.h / 4, self.w / 2, 0, 2 * Math.PI, false);
                context.closePath();
                context.fill();
                context.scale(1, 2);

                // small building
                context.fillStyle = "#BBBB22";
                context.fillRect(self.w / 8 + self.w / 3, self.h / 6, self.w / 3, self.h - self.h / 2.5);

                // big building
                context.fillStyle = "#DDDD22";
                context.fillRect(self.w / 8, 0, self.w / 3, self.h - self.h / 5);

                context.save();
                context.translate(self.w / 8, 0);

                // draw windows
                context.fillStyle = "#88DDFF";
                context.fillRect(10, 15, 10, 20);
                context.fillRect(30, 15, 10, 20);
                context.fillRect(10, 45, 10, 20);
                context.fillRect(30, 45, 10, 20);

                context.restore();

                // name
                if (self.scrollLoaded) {
                    context.drawImage(self.scrollbg,self.w / 4, -self.h/4 - 7);
                }

                context.fillStyle= "#333333";
                context.font="20px Arial";
                context.fillText(self.name,self.w / 3, 0);

                // DEBUG CRAP
                if (g_showLocalOrigins) {
                    context.fillStyle='#FF0000';
                    context.fillRect(-1,-1,3,3);
                }

                if (g_showObjectScale) {
                    context.globalAlpha = 0.1;
                    context.fillStyle='#FF0000';
                    context.fillRect(0,0,self.w,self.h);
                    context.globalAlpha = 1;
                }

                if (g_showObjectCollisions) {
                    var collisions = self.components['collidable'].collisions,
                        col = null;
                    for (var i = 0; i < collisions.length; i++) {
                        col = collisions[i];
                        context.fillStyle = '#FFFFFF';
                        context.globalAlpha = 0.2;
                        context.beginPath();
                        context.arc(col.x, col.y, col.r, 0, 2 * Math.PI, false);
                        context.closePath();
                        context.fill();
                    }
                }
                // END DEBUG CRAP

                context.restore();
            }
        }));

        self.toString = function() {
            return this.name;
        };
        
        return self;

    })(options, Trade.Config, Trade.Objects.GameObject, Trade.Components.Renderable, Trade.Components.Selectable,
    Trade.Components.Dockable, Trade.Components.Storeable, Trade.Components.Collidable, Trade.Objects.Collision);
};