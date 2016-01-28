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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Trade;
(function (Trade) {
    var Objects;
    (function (Objects) {
        var Ship = (function (_super) {
            __extends(Ship, _super);
            function Ship(options) {
                var _this = this;
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.SHIP;
                this.shipImg = new Image();
                this.shipLoaded = false;
                this.x = options.x || 100;
                this.y = options.y || 100;
                this.w = options.w || 50;
                this.h = options.h || 50;
                this.name = options.name || Helpers.generateShipName();
                this.shipImg.onload = function () {
                    _this.shipLoaded = true;
                };
                this.shipImg.src = "assets/artwork/ship.svg";
                this.addComponent(new Trade.Components.Selectable({
                    selectedFunction: function (x, y, e, context) {
                        var self = _this;
                        var detectHit = function (x, y, e) {
                            if ((x > self.x && x < self.x + self.w &&
                                y > self.y && y < self.y + self.h)) {
                                return true;
                            }
                            return false;
                        };
                        if (!detectHit(x, y, e)) {
                            if (e.button === 2 && context.selected) {
                                _this.systems['movement'].setNewDestination(x, y);
                                _this.systems['movement'].setNewRotation(x, y);
                                _this.trigger('marker:make', [x, y]);
                            }
                            else {
                                context.selected = false;
                                _this.trigger('selection:deselect');
                            }
                        }
                        else {
                            if (e.button === 0) {
                                context.selected = true;
                                _this.trigger('selection:change', _this);
                            }
                        }
                    }
                }));
                this.addComponent(new Trade.Components.Damageable({
                    maxHealth: 50,
                    currentHealth: 50
                }));
                this.addComponent(new Trade.Components.Movable({
                    maxSpeed: 2,
                    initialInertia: 5
                }));
                this.addComponent(new Trade.Components.Rotatable({
                    rotationVelocity: 0.02
                }));
                this.addComponent(new Trade.Components.Storable({}));
                this.addComponent(new Trade.Components.Collidable({
                    collisions: [
                        new Objects.Collision({
                            x: ((this.w) / 2),
                            y: ((this.h) / 2),
                            w: this.w,
                            h: this.h,
                            r: this.w,
                            collisionFunction: function (collider) {
                                return false;
                            }
                        })
                    ]
                }));
                this.addComponent(new Trade.Components.Renderable({
                    renderType: "function",
                    renderFunction: function (context) {
                        context.save();
                        // TRANSLATED
                        context.translate(_this.x + _this.w / 2, _this.y + _this.h / 2);
                        context.save();
                        // TODO
                        var rotatable = _this.components['rotatable'];
                        context.rotate(rotatable.rotation);
                        var offsetX = (rotatable.rotationFinal > -Math.PI / 2 && rotatable.rotationFinal < Math.PI / 2) ? -(_this.w / 2) : -_this.w * 1.5;
                        context.translate(-(_this.w / 2), -(_this.h / 2));
                        if (_this.shipLoaded) {
                            context.drawImage(_this.shipImg, 0, 0);
                        }
                        // DEBUG CRAP
                        if (g_showLocalOrigins) {
                            context.fillStyle = '#FF0000';
                            context.fillRect(-1, -1, 3, 3);
                        }
                        if (g_showObjectScale) {
                            context.globalAlpha = 0.1;
                            context.fillStyle = '#FF0000';
                            context.fillRect(0, 0, _this.w, _this.h);
                            context.globalAlpha = 1;
                        }
                        if (g_showShipHeadings) {
                            // straight ahead path
                            context.strokeStyle = "#FF0000";
                            context.beginPath();
                            context.moveTo(_this.w, _this.h / 2);
                            context.lineTo(_this.w + 25, _this.h / 2);
                            context.closePath();
                            context.stroke();
                        }
                        if (g_showObjectCollisions) {
                            var collisions = _this.components['collidable'].collisions, col = null;
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
                        if (_this.components.selectable.selected) {
                            // selected circle
                            context.lineWidth = _this.w / 20;
                            context.strokeStyle = '#FFFFFF';
                            context.globalAlpha = 0.6;
                            context.beginPath();
                            context.arc(_this.w / 2, _this.h / 2, _this.w - _this.w / 5, 0, 2 * Math.PI, false);
                            context.closePath();
                            context.stroke();
                            context.restore();
                            context.globalAlpha = 1.0;
                        }
                        else {
                            context.restore();
                        }
                        context.restore();
                    }
                }));
                this.addSystem(new Trade.Systems.MovementSystem({
                    objects: [this]
                }));
            }
            Ship.prototype.toString = function () {
                return this.name;
            };
            return Ship;
        })(Objects.GameObject);
        Objects.Ship = Ship;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Ship.js.map