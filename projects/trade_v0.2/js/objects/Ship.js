/******************************************************************************
 * Trade.Objects.Ship
 * A ship object
 * (c) 2013 Michael Prokopchuk
 *
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};
Trade.Objects = Trade.Objects || {};

Trade.Objects.Ship = function(options) {
    return (function(options, config, GameObject, Renderable, Selectable,
        Damageable, Movable, Rotatable, Storeable, Collidable, Collision,
        MovementSystem) {

        var self = $.extend(new GameObject({
            x: options.x || 100,
            y: options.y || 100,
            w: options.w || 50,
            h: options.h || 50,
            type: config.objectTypes.SHIP,
            owner: options.owner
        }), {});

        self.name = options.name || Helpers.generateShipName();

        // TODO: put this into a component or something...
        self.shipImg = new Image();
        self.shipLoaded = false;
        self.shipImg.onload = function() {
            self.shipLoaded = true;
        };
        self.shipImg.src = "assets/artwork/ship.svg";

        self.addComponent(new Selectable({
            selectedFunction: function(x, y, e, context) {
                var detectHit = function() {
                    if ((x > self.x && x < self.x + self.w &&
                        y > self.y && y < self.y + self.h)) {
                        return true;
                    }

                    return false;
                };

                if (!detectHit(x, y, e)) {
                    if (e.button === 2 && context.selected) {
                        self.systems['movement'].setNewDestination(x, y);
                        self.systems['movement'].setNewRotation(x, y);

                        self.trigger('marker:make', [x, y]);
                    } else {
                        context.selected = false;
                        self.trigger('selection:deselect');
                    }
                } else {
                    if (e.button === 0) {
                        context.selected = true;
                        self.trigger('selection:change', self);
                    }
                }
            }
        }));

        self.addComponent(new Damageable({
            maxHealth: 50,
            currentHealth: 50
        }));

        self.addComponent(new Movable({
            maxSpeed: 2,
            initialInertia: 5
        }));

        self.addComponent(new Rotatable({
            vr: 0.02
        }));

        self.addComponent(new Storeable({
            // TODO
        }));

        self.addComponent(new Collidable({
            collisions: [
                new Collision({
                    x: ((self.w) / 2),
                    y: ((self.h) / 2),
                    w: self.w,
                    h: self.h,
                    r: self.w,
                    collisionFunction: function(context) {
                        return false;
                    }
                })
            ]
        }));

        self.addComponent(new Renderable({
            renderType: "function",
            renderFunction: function(context) {
                context.save();

                // TRANSLATED
                context.translate(self.x + self.w / 2, self.y + self.h / 2);

                context.save();

                // TODO
                context.rotate(self.components['rotatable'].rotation);
                //var offsetX = (self.rotationFinal > -Math.PI / 2 && self.rotationFinal < Math.PI / 2) ? -(self.w / 2) : -self.w * 1.5;

                context.translate(-(self.w / 2), -(self.h / 2));

                if (self.shipLoaded) {
                    context.drawImage(self.shipImg, 0, 0);
                }

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
                if (g_showShipHeadings) {
                    // straight ahead path
                    context.strokeStyle = "#FF0000";
                    context.beginPath();
                    context.moveTo(self.w, self.h / 2);
                    context.lineTo(self.w + 25, self.h / 2);
                    context.closePath();
                    context.stroke();
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

                // TODO: component?
                if (self.components.selectable.selected) {

                    // selected circle
                    context.lineWidth = self.w / 20;
                    context.strokeStyle = '#FFFFFF';
                    context.globalAlpha = 0.6;
                    context.beginPath();
                    context.arc(self.w / 2, self.h / 2, self.w - self.w / 5, 0, 2 * Math.PI, false);
                    context.closePath();
                    context.stroke();

                    context.restore();
                    context.globalAlpha = 1.0;
                } else {
                    context.restore();
                }

                context.restore();
            }
        }));

        self.addSystem(new MovementSystem({
            objects: [self]
        }));

        self.toString = function() {
            return this.name;
        };

        return self;

    })(options, Trade.Config, Trade.Objects.GameObject, Trade.Components.Renderable, Trade.Components.Selectable,
        Trade.Components.Damageable, Trade.Components.Movable, Trade.Components.Rotatable, Trade.Components.Storeable,
        Trade.Components.Collidable, Trade.Objects.Collision, Trade.Systems.MovementSystem);
};