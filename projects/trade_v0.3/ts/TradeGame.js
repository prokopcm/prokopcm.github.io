/// <reference path="libs/jquery.d.ts" />
/// <reference path="libs/underscore.d.ts" />
/// <reference path="libs/mustache.d.ts" />
/// <reference path="util/Config.ts" />
/// <reference path="ui/DebugMgr.ts" />
/// <reference path="ui/MouseMgr.ts" />
/// <reference path="systems/CollisionSystem.ts" />
/// <reference path="systems/SelectionSystem.ts" />
/// <reference path="systems/ClockSystem.ts" />
/// <reference path="systems/EconomySystem.ts" />
/// <reference path="objects/GameObject.ts" />
/// <reference path="objects/Camera.ts" />
/// <reference path="objects/WaterBackground.ts" />
/// <reference path="objects/Ship.ts" />
/// <reference path="objects/City.ts" />
/// <reference path="objects/Marker.ts" />
var Trade;
(function (Trade) {
    var Game = (function () {
        /**
         * Creates a new tradegame instance
         * @constructor
         * @param {HTMLCanvasElement} canvas the canvas to render to
         */
        function Game(canvas) {
            /**
             * List of renderable scene items
             * @type {Array<TradeObjects.GameObject>}
             */
            this.sceneItems = [];
            this.ships = [];
            this.cities = [];
            this.sceneEffects = [];
            this.systems = [];
            this.missions = [];
            this.lastCalledTime = 0;
            this.fps = 0;
            var self = this;
            this.canvas = canvas;
            this.$canvas = $(canvas);
            this.context = canvas.getContext('2d');
            this.width = canvas.width;
            this.height = canvas.height;
            this.debugMgr = new Trade.UI.DebugMgr({
                game: this
            });
            this.mouseMgr = new Trade.UI.MouseMgr({
                game: this
            });
            this.collisionSystem = new Trade.Systems.CollisionSystem({});
            this.selectionSystem = new Trade.Systems.SelectionSystem({
                game: this
            });
            this.clock = new Trade.Systems.ClockSystem({
                tickRate: 30,
                game: this
            });
            this.economy = new Trade.Systems.EconomySystem({
                game: this,
                items: Trade.Config.tradeItems
            });
            this.clock.addListener(this.economy);
            this.camera = new Trade.Objects.Camera({
                x: 0,
                y: 25
            });
            var water = new Trade.Objects.WaterBackground({
                x: -this.width,
                y: -this.height / 2,
                w: this.width * 2,
                h: this.height * 2
            }), 
            // setup ships
            ship = new Trade.Objects.Ship({
                x: 40,
                y: 100,
                owner: Trade.Config.owners.PLAYER
            }), ship2 = new Trade.Objects.Ship({
                x: 100,
                y: 200,
                owner: Trade.Config.owners['PLAYER']
            });
            var d = {};
            d[ship.id] = ship;
            d[ship2.id] = ship2;
            var storage = {};
            storage[Trade.Config.tradeItems['BREAD'].id] = {
                item: this.economy.getItem(Trade.Config.tradeItems['BREAD'].id),
                quantity: 10
            };
            storage[Trade.Config.tradeItems['WOOD'].id] = {
                item: this.economy.getItem(Trade.Config.tradeItems['WOOD'].id),
                quantity: 5
            };
            // setup cities
            var kiev = new Trade.Objects.City({
                name: "Kiev",
                x: 100,
                y: 30,
                w: 150,
                h: 100,
                dockedShips: d,
                economy: this.economy,
                storage: storage
            });
            var storage2 = {};
            storage2[Trade.Config.tradeItems.TEA.id] = {
                item: this.economy.getItem(Trade.Config.tradeItems.TEA.id),
                quantity: 25
            };
            var istanbul = new Trade.Objects.City({
                name: "Istanbul",
                x: this.width - 185,
                y: this.height - 150,
                w: 150,
                h: 100,
                economy: this.economy,
                storage: storage2
            });
            // push renderables onto canvas
            this.addObjectToScene(water);
            this.addObjectToScene(ship);
            this.addObjectToScene(ship2);
            this.addObjectToScene(kiev);
            this.addObjectToScene(istanbul);
            // setup ship events
            ship.on('marker:make', this.makeMarker, this);
            ship.on('selection:change', this.changeSelection, this);
            ship2.on('marker:make', this.makeMarker, this);
            ship2.on('selection:change', this.changeSelection, this);
            // setup city events
            kiev.on('selection:change', this.changeSelection, this);
            istanbul.on('selection:change', this.changeSelection, this);
            kiev.on('cityscreen:show', this.showCityScreen, this);
            istanbul.on('cityscreen:show', this.showCityScreen, this);
            // setup UI events
            this.setupUIEvents();
            // setup missions
            this.setupMissions();
            this.updateMission();
            // start animation
            requestAnimationFrame(function (time) {
                self.clock.start();
                self.update(time);
            });
        }
        Game.prototype.addObjectToScene = function (object) {
            this.sceneItems.push(object);
            if (object.components.hasOwnProperty('collidable')) {
                this.collisionSystem.addObject(object);
            }
            if (object.type === Trade.Config.objectTypes.CITY) {
                this.cities.push(object);
            }
        };
        // TODO
        Game.prototype.setupMissions = function () {
            var mission = {
                title: "Mission #1",
                description: "Purchase 25 items from",
                giver: this.cities[0],
                city: this.cities[1],
                goal: {
                    goalType: "fetch_items",
                    quantity: 25,
                    category: "bread"
                }
            };
            this.missions.push(mission);
            this.currentMission = this.missions[0];
        };
        // TODO
        Game.prototype.updateMission = function () {
            var currentMission = this.currentMission;
            $('.mission-title').text(currentMission.title);
            $('.mission-description').text(currentMission.description + " " + currentMission.city.name + ".");
            $('.mission-return').text(currentMission.giver.name);
        };
        Game.prototype.update = function (time) {
            var self = this;
            var delta = (new Date().getTime() - this.lastCalledTime) / 16.666666;
            this.lastCalledTime = new Date().getTime();
            // 60 fps = 16.66 ms/frame
            // self.fps = 1 / delta;
            // console.log(delta, delta / 16.66666666);
            requestAnimationFrame(function (time) {
                self.update(time);
            });
            var sceneItems = this.sceneItems, len = sceneItems.length;
            for (var i = 0; i < sceneItems.length; i++) {
                // move
                // TODO: make gameWold movement system, attach objects to that
                if (sceneItems[i].systems.hasOwnProperty('movement')) {
                    sceneItems[i].systems['movement'].update(delta);
                }
                if (_.isFunction(sceneItems[i].update)) {
                    sceneItems[i].update(delta);
                }
            }
            // collide
            this.collisionSystem.update();
            // render
            this.render();
        };
        Game.prototype.render = function () {
            var sceneItems = this.sceneItems;
            this.context.save();
            // move context to camera position
            this.context.translate(this.camera.x, this.camera.y);
            // render
            // TODO: move to renderSystem, add in layers, cache rendering order
            for (var i = 0; i < sceneItems.length; i++) {
                if (sceneItems[i].systems.hasOwnProperty("render")) {
                }
                else if (sceneItems[i].components.hasOwnProperty("renderable")) {
                    sceneItems[i].components["renderable"].render(this.context);
                }
            }
            this.context.restore();
        };
        Game.prototype.updateDimensions = function (w, h) {
            this.width = w;
            this.height = h;
            // HAX EW!!! FIX ME!
            for (var i = 0; i < this.sceneItems.length; i++) {
                if (this.sceneItems[i].type === Trade.Config.objectTypes.WATER_BACKGROUND) {
                    var background = this.sceneItems[i];
                    background.w = w * 2;
                    // height is fixed, so no need to change
                    //this.sceneItems[i].h = h;
                    break;
                }
            }
        };
        Game.prototype.setupUIEvents = function () {
            var _this = this;
            radio("ship:dock").subscribe(function (dockable, ship) {
                if (($("#city-screen").is(":visible") && $('.city-name').text() === dockable.name) || !($("#city-screen").is(":visible"))) {
                    _this.showCityScreen(dockable);
                }
            });
            radio("ship:undock").subscribe(function (dockable, ship) {
                if ($("#city-screen").is(":visible") && $('.city-name').text() === dockable.name) {
                    _this.showCityScreen(dockable);
                }
            });
            radio("marker:remove").subscribe(function (id) {
                _this.removeItemFromSceneById(id);
            });
        };
        Game.prototype.makeMarker = function (pos) {
            var options = {
                x: pos[0],
                y: pos[1]
            };
            // TODO
            var marker = new Trade.Objects.Marker(options);
            this.addObjectToScene(marker);
        };
        Game.prototype.removeItemFromSceneById = function (id) {
            var items = this.sceneItems;
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === id) {
                    items.splice(i, 1);
                }
            }
        };
        Game.prototype.changeSelection = function (obj) {
            if (obj) {
                var s = '';
                $('.selected-area').text(obj.type + ' ' + obj.toString() + ' selected!');
            }
            else {
                $('.selected-area').text('');
            }
        };
        Game.prototype.showCityScreen = function (city) {
            var cityScreenTpl = $('#tpl-city-screen').html();
            var rendered = Mustache.render(cityScreenTpl, {
                name: city.name
            });
            $('#city-screen').html(rendered);
            //$('.city-name').text(city.name);
            var info = city.components['dockable'].getDockingInfo(), ships = info.numDockedPlayerObjects, ship = null, cityItems = city.components['storable'].storage, self = this;
            var cityScreenItemTpl = $('#tpl-city-screen-item').html();
            var itemHTML = '';
            // ITEMS
            for (var key in cityItems) {
                var cityItem = cityItems[key];
                rendered = Mustache.render(cityScreenItemTpl, {
                    item: cityItem.item,
                    quantity: cityItem.quantity
                });
                //var s = '<div class="city-item"><span class="item-name">'+cityItem.item.name+'</span><span class="item-qty">'+cityItem.quantity+'</span></div>'
                itemHTML += rendered;
            }
            $('.city-item-info').html(itemHTML);
            // DOCKING INFO
            $('.num-ships').text(ships);
            $('.docked-ships-info').empty();
            $('.ship-icon').off();
            if (ships > 0) {
                var html = '';
                for (var i = info.playerShips.length - 1; i >= 0; i--) {
                    ship = info.playerShips[i];
                    html += '<div class="ship-icon" id="' + ship.id + '"><div class="hover-text">' + ship.name + '</div></div>';
                }
                $('.docked-ships-info').html(html);
            }
            $('.ship-icon').on('click', function (e) {
                // TODO
                //var id = e.target.offsetParent.id;
                //var ship = this.getSceneItemById(id);
                if (ship) {
                    radio('sceneItem:select').broadcast(ship);
                    // TODO: blegh.
                    var newEvent = $.Event('click');
                    newEvent.button = 0;
                    self.selectionSystem.update(ship.x + 1, ship.y + 1, newEvent);
                }
            });
            $('#city-screen').show();
        };
        return Game;
    })();
    Trade.Game = Game;
})(Trade || (Trade = {}));
//# sourceMappingURL=TradeGame.js.map