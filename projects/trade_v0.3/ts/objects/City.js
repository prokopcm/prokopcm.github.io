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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Objects;
    (function (Objects) {
        var City = (function (_super) {
            __extends(City, _super);
            function City(options) {
                var _this = this;
                _super.call(this, options);
                this.type = Trade.Config.objectTypes.CITY;
                // TODO: refactor into image component or something?
                this.scrollbg = new Image();
                this.scrollLoaded = false;
                this.scrollbg.onload = function () { _this.scrollLoaded = true; };
                this.scrollbg.src = "assets/artwork/scroll.svg";
                this.name = options.name;
                this.addComponent(new Trade.Components.Selectable({
                    selectedFunction: function (x, y, e, context) {
                        var self = _this;
                        var detectHit = function (x, y, e) {
                            return ((x > self.x && x < self.x + self.w &&
                                y > self.y && y < self.y + self.h));
                        };
                        if (detectHit(x, y, e) && e.button === 0) {
                            context.selected = true;
                            _this.trigger('cityscreen:show', _this);
                            _this.trigger('selection:change', _this);
                        }
                        else {
                            context.selected = false;
                        }
                    }
                }));
                var self = this;
                this.addComponent(new Trade.Components.Dockable({
                    dockedShips: options.dockedShips,
                    onDock: function (ship) {
                        if (ship.owner === Trade.Config.owners.PLAYER) {
                            var info = self.components['dockable'].getDockingInfo(Trade.Config.owners.PLAYER);
                            if (info.firstDock) {
                                radio("ship:dock").broadcast(self, ship);
                            }
                        }
                    },
                    onUndock: function (ship) {
                        if (ship.owner === Trade.Config.owners.PLAYER) {
                            radio("ship:undock").broadcast(self, ship);
                        }
                    }
                }));
                this.addComponent(new Trade.Components.Storable({
                    storage: options.storage,
                    maxItems: 999 // TODO: improve
                }));
                this.economy = new Trade.Systems.EconomySystem({});
                this.addComponent(new Trade.Components.Collidable({
                    collisions: [new Objects.Collision({
                            x: this.w / 2,
                            y: this.h / 2,
                            w: 200,
                            h: 200,
                            r: 200,
                            collisionFunction: function (collider) {
                                _this.components['dockable'].dock(collider);
                            },
                            uncollisionFunction: function (collider) {
                                _this.components['dockable'].undock(collider);
                            }
                        })]
                }));
                this.addComponent(new Trade.Components.Renderable({
                    renderType: "function",
                    renderFunction: function (context) {
                        context.save();
                        context.translate(_this.centerX, _this.centerY);
                        // TODO: make not crappy
                        if (_this.components.selectable.selected) {
                            // selected circle
                            context.lineWidth = _this.h / 20;
                            context.strokeStyle = '#FFFFFF';
                            context.globalAlpha = 0.6;
                            context.beginPath();
                            context.arc(0, 0, _this.w - _this.w / 5, 0, 2 * Math.PI, false);
                            context.closePath();
                            context.stroke();
                            context.globalAlpha = 1.0;
                        }
                        // make (0, 0) the upper left corner
                        context.translate(-(_this.w / 2), -(_this.h / 2));
                        // draw island
                        context.fillStyle = '#e9be3c';
                        context.beginPath();
                        context.scale(1, 0.5);
                        context.arc(_this.w / 2, _this.h + _this.h / 4, _this.w / 2, 0, 2 * Math.PI, false);
                        context.closePath();
                        context.fill();
                        context.scale(1, 2);
                        // small building
                        context.fillStyle = "#BBBB22";
                        context.fillRect(_this.w / 8 + _this.w / 3, _this.h / 6, _this.w / 3, _this.h - _this.h / 2.5);
                        // big building
                        context.fillStyle = "#DDDD22";
                        context.fillRect(_this.w / 8, 0, _this.w / 3, _this.h - _this.h / 5);
                        context.save();
                        context.translate(_this.w / 8, 0);
                        // draw windows
                        context.fillStyle = "#88DDFF";
                        context.fillRect(10, 15, 10, 20);
                        context.fillRect(30, 15, 10, 20);
                        context.fillRect(10, 45, 10, 20);
                        context.fillRect(30, 45, 10, 20);
                        context.restore();
                        // name
                        if (_this.scrollLoaded) {
                            context.drawImage(_this.scrollbg, _this.w / 4, -_this.h / 4 - 7);
                        }
                        context.fillStyle = "#333333";
                        context.font = "20px Arial";
                        context.fillText(_this.name, _this.w / 3, 0);
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
                        // END DEBUG CRAP
                        context.restore();
                    }
                }));
            }
            City.prototype.toString = function () {
                return this.name;
            };
            return City;
        })(Objects.GameObject);
        Objects.City = City;
    })(Objects = Trade.Objects || (Trade.Objects = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=City.js.map