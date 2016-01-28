/******************************************************************************
 * Trade.Objects.City
 * A city object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="GameObject.ts" />
/// <reference path="../util/Config.ts" />
/// <reference path="../components/Dockable.ts" />
/// <reference path="../components/Selectable.ts" />
/// <reference path="../components/Storable.ts" />
/// <reference path="../components/Renderable.ts" />
/// <reference path="../systems/EconomySystem.ts" />
/// <reference path="../components/Collidable.ts" />
/// <reference path="Collision.ts" />

module Trade.Objects {
    
    export class City extends GameObject {

        type = Trade.Config.objectTypes.CITY;
        
        name: string;

        // TODO
        economy: Systems.EconomySystem;
        
        // TODO: refactor into image component or something?
        scrollbg = new Image();
        
        scrollLoaded = false;
        
        constructor(options) {
            super(options);
            
            this.scrollbg.onload = () => { this.scrollLoaded = true };
            this.scrollbg.src = "assets/artwork/scroll.svg";
            this.name = options.name;
            
            
            this.addComponent(new Components.Selectable({
            selectedFunction: (x, y, e, context) => {
                var self = this;
                var detectHit = function(x, y, e) {
                    return ((x > self.x && x < self.x + self.w &&
                        y > self.y && y < self.y + self.h));
                };

                if (detectHit(x, y, e) && e.button === 0) {
                    context.selected = true;
                    this.trigger('cityscreen:show', this);
                    this.trigger('selection:change', this);
                } else {
                    context.selected = false;
                }
            }
        }));
        let self = this;

        this.addComponent(new Components.Dockable({
            dockedShips: options.dockedShips,
            onDock: function(ship) {
                if (ship.owner === Config.owners.PLAYER) {
                    var info = self.components['dockable'].getDockingInfo(
                        Config.owners.PLAYER);
                    
                    if (info.firstDock) {
                        radio("ship:dock").broadcast(self, ship);
                    }
                }
            },

            onUndock: function(ship) {
                if (ship.owner === Config.owners.PLAYER) {
                    radio("ship:undock").broadcast(self, ship);
                }
            }
        }));
        
        this.addComponent(new Components.Storable({
            storage: options.storage,
            maxItems: 999 // TODO: improve
        }));
        
        this.economy = new Systems.EconomySystem({});
        
        this.addComponent(new Components.Collidable({
            collisions: [new Collision({
                x: this.w / 2,
                y: this.h / 2,
                w: 200,
                h: 200,
                r: 200,
                collisionFunction: (collider) => {
                    this.components['dockable'].dock(collider);
                },
                uncollisionFunction: (collider) => {
                    this.components['dockable'].undock(collider);
                }
            })]
        }));
        
            this.addComponent(new Components.Renderable({
                renderType: "function",
                renderFunction: (context) => {
                    context.save();
                    context.translate(this.centerX, this.centerY);
                    
                    // TODO: make not crappy
                    if (this.components.selectable.selected) {
                        // selected circle
                        context.lineWidth = this.h / 20;
                        context.strokeStyle = '#FFFFFF';
                        context.globalAlpha = 0.6;
                        context.beginPath();
                        context.arc(0, 0, this.w - this.w / 5, 0, 2 * Math.PI, false);
                        context.closePath();
                        context.stroke();
    
                        context.globalAlpha = 1.0;
                    }
    
                    // make (0, 0) the upper left corner
                    context.translate(-(this.w / 2), -(this.h / 2));
    
                    // draw island
                    context.fillStyle = '#e9be3c';
                    context.beginPath();
                    context.scale(1, 0.5);
                    context.arc(this.w / 2, this.h + this.h / 4, this.w / 2, 0, 2 * Math.PI, false);
                    context.closePath();
                    context.fill();
                    context.scale(1, 2);
    
                    // small building
                    context.fillStyle = "#BBBB22";
                    context.fillRect(this.w / 8 + this.w / 3, this.h / 6, this.w / 3, this.h - this.h / 2.5);
    
                    // big building
                    context.fillStyle = "#DDDD22";
                    context.fillRect(this.w / 8, 0, this.w / 3, this.h - this.h / 5);
    
                    context.save();
                    context.translate(this.w / 8, 0);
    
                    // draw windows
                    context.fillStyle = "#88DDFF";
                    context.fillRect(10, 15, 10, 20);
                    context.fillRect(30, 15, 10, 20);
                    context.fillRect(10, 45, 10, 20);
                    context.fillRect(30, 45, 10, 20);
    
                    context.restore();
    
                    // name
                    if (this.scrollLoaded) {
                        context.drawImage(this.scrollbg, this.w / 4, -this.h/4 - 7);
                    }
    
                    context.fillStyle= "#333333";
                    context.font="20px Arial";
                    context.fillText(this.name, this.w / 3, 0);
    
                    // DEBUG CRAP
                    if (g_showLocalOrigins) {
                        context.fillStyle='#FF0000';
                        context.fillRect(-1,-1,3,3);
                    }
    
                    if (g_showObjectScale) {
                        context.globalAlpha = 0.1;
                        context.fillStyle='#FF0000';
                        context.fillRect(0, 0, this.w, this.h);
                        context.globalAlpha = 1;
                    }
    
                    if (g_showObjectCollisions) {
                        var collisions = this.components['collidable'].collisions,
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
            }))
        }
        
        toString() {
            return this.name;
        }
    }
}