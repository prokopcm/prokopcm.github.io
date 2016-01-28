/******************************************************************************
 * Trade.Objects.Ship
 * A ship object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="GameObject.ts" />
/// <reference path="../util/Config.ts" />
/// <reference path="../components/Damageable.ts" />
/// <reference path="../components/Selectable.ts" />
/// <reference path="../components/Renderable.ts" />
/// <reference path="../components/Storable.ts" />
/// <reference path="../components/Rotatable.ts" />
/// <reference path="../components/Movable.ts" />
/// <reference path="../systems/MovementSystem.ts" />
/// <reference path="../components/Collidable.ts" />
/// <reference path="Collision.ts" />

module Trade.Objects {
    
    export class Ship extends GameObject {

        type: Config.objectTypes = Config.objectTypes.SHIP;
        
        name: string;
        
        shipImg = new Image();
        
        shipLoaded = false;
        
        constructor(options) {
            super(options);
            this.x = options.x || 100;
            this.y = options.y || 100;
            this.w = options.w || 50;
            this.h = options.h || 50;
            
            this.name = options.name || Helpers.generateShipName();
            this.shipImg.onload = () => {
                this.shipLoaded = true;
            };
            this.shipImg.src = "assets/artwork/ship.svg";
            
            this.addComponent(new Components.Selectable({
                selectedFunction: (x, y, e, context) => {
                    var self = this;
                    var detectHit = function(x, y, e) {
                        if ((x > self.x && x < self.x + self.w &&
                            y > self.y && y < self.y + self.h)) {
                            return true;
                        }
    
                        return false;
                    };
    
                    if (!detectHit(x, y, e)) {
                        if (e.button === 2 && context.selected) {
                            this.systems['movement'].setNewDestination(x, y);
                            this.systems['movement'].setNewRotation(x, y);
    
                            this.trigger('marker:make', [x, y]);
                        } else {
                            context.selected = false;
                            this.trigger('selection:deselect');
                        }
                    } else {
                        if (e.button === 0) {
                            context.selected = true;
                            this.trigger('selection:change', this);
                        }
                    }
                }
            }));
            
            this.addComponent(new Components.Damageable({
                maxHealth: 50,
                currentHealth: 50
            }));
            
            this.addComponent(new Components.Movable({
                maxSpeed: 2,
                initialInertia: 5
            }));
            
            this.addComponent(new Components.Rotatable({
                rotationVelocity: 0.02
            }));
            
            this.addComponent(new Components.Storable({
                // TODO
            }));
            
            this.addComponent(new Components.Collidable({
                collisions: [
                    new Collision({
                        x: ((this.w) / 2),
                        y: ((this.h) / 2),
                        w: this.w,
                        h: this.h,
                        r: this.w,
                        collisionFunction: function(collider: GameObject) {
                            return false;
                        }
                    })
                ]
            }));
            
            this.addComponent(new Components.Renderable({
                renderType: "function",
            renderFunction: (context) => {
                    context.save();
    
                    // TRANSLATED
                    context.translate(this.x + this.w / 2, this.y + this.h / 2);
    
                    context.save();
    
                    // TODO
                    var rotatable = this.components['rotatable'];
                    context.rotate(rotatable.rotation);
                    var offsetX = (rotatable.rotationFinal > -Math.PI / 2 && rotatable.rotationFinal < Math.PI / 2) ? -(this.w / 2) : -this.w * 1.5;
    
                    context.translate(-(this.w / 2), -(this.h / 2));
    
                    if (this.shipLoaded) {
                        context.drawImage(this.shipImg, 0, 0);
                    }
    
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
                    if (g_showShipHeadings) {
                        // straight ahead path
                        context.strokeStyle = "#FF0000";
                        context.beginPath();
                        context.moveTo(this.w, this.h / 2);
                        context.lineTo(this.w + 25, this.h / 2);
                        context.closePath();
                        context.stroke();
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
                    // END DEBUG
    
                    // TODO: component?
                    if (this.components.selectable.selected) {
    
                        // selected circle
                        context.lineWidth = this.w / 20;
                        context.strokeStyle = '#FFFFFF';
                        context.globalAlpha = 0.6;
                        context.beginPath();
                        context.arc(this.w / 2, this.h / 2, this.w - this.w / 5, 0, 2 * Math.PI, false);
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

            this.addSystem(new Systems.MovementSystem({
                objects: [this]
            }));
        }
        
        toString(): string {
            return this.name;
        }
    }
}