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




/******************************************************************************
 * Trade.Game
 * Trade Game class. Used to create an instance of the trading game.
 * (c) 2014 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
interface ICamera {
    x: number;
    y: number;
}

interface IMissionGiver {
    name: string;
}

interface IMissionGoal {
    goalType: string;
    quantity: number;
    category: string;
}

interface IMission {
    title: string;
    description: string;
    city: IMissionGiver;
    giver: IMissionGiver;
    goal: IMissionGoal;
}

interface ICity extends Trade.Objects.GameObject {
    name: string;
    //economy: Object;
}

module Trade {
    export class Game {
        
        /**
         * The canvas object
         * @type {HTMLCanvasElement}
         */
        canvas: HTMLCanvasElement;
        
        /**
         * jQuery wrapped canvas object
         * @type {JQuery}
         */
        $canvas: JQuery;
    
        /**
         * The 2D canvas context
         * @type {CanvasRenderingContext2D}
         */
        context: CanvasRenderingContext2D;
    
        /**
         * The width of the canvas on which the game is drawn.
         * @type {Number}
         */
        width: number;
    
        /**
         * The height of the canvas on which the game is drawn.
         * @type {Number}
         */
        height: number;
    
        /**
         * List of renderable scene items
         * @type {Array<TradeObjects.GameObject>}
         */
        sceneItems: Array<Trade.Objects.GameObject> = [];
    
        ships: Array<Object> = [];
        
        cities: Array<Objects.City> = [];
        
        sceneEffects: Array<Object> = [];
        
        systems: Array<Object> = [];
        
        missions: Array<IMission> = [];
        
        currentMission: IMission;
        
        // TODO: refactor this stuff into a class
        clickX: number;
        
        clickY: number;
        
        actualX: number;
        
        actualY: number;
    
        lastCalledTime: number = 0;
    
        fps: number = 0;
        
        camera: Objects.Camera;
    
        debugMgr: Object;
    
        mouseMgr: Object;
    
        collisionSystem: Trade.Systems.CollisionSystem;
    
        selectionSystem: Trade.Systems.SelectionSystem;
    
        clock: Trade.Systems.ClockSystem;
    
        economy: Trade.Systems.EconomySystem;
    
        /**
         * Creates a new tradegame instance
         * @constructor
         * @param {HTMLCanvasElement} canvas the canvas to render to
         */
        constructor(canvas: HTMLCanvasElement) {
            var self = this;
            this.canvas = canvas;
            this.$canvas = $(canvas);
            this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
            
            this.width = canvas.width;
            this.height = canvas.height;
            
            this.debugMgr = new Trade.UI.DebugMgr({
                game: this
            });
            
            this.mouseMgr = new Trade.UI.MouseMgr({
                game:this
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
                items: Config.tradeItems
            });
            
            this.clock.addListener(this.economy);
               
            this.camera = new Objects.Camera({
                x: 0,
                y: 25
            });
            
            var water = new Objects.WaterBackground({
                x: -this.width,
                y: -this.height / 2,
                w: this.width * 2, 
                h: this.height * 2
            }),

            // setup ships
            ship = new Trade.Objects.Ship({
                x: 40, 
                y: 100,
                owner: Config.owners.PLAYER
            }),
            ship2 = new Trade.Objects.Ship({
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
        var kiev = new Objects.City({
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

        var istanbul = new Objects.City({
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
            requestAnimationFrame(function(time) {
                self.clock.start();
                self.update(time);
            });            
        }
    
        addObjectToScene(object: Trade.Objects.GameObject) {
            this.sceneItems.push(object);
            if (object.components.hasOwnProperty('collidable')) {
                this.collisionSystem.addObject(object);
                //this.collisionSystem.
            }
    
            if (object.type === Trade.Config.objectTypes.CITY) {
                this.cities.push(<Objects.City>object);
            }
        }
    
        // TODO
        setupMissions() {
            
            var mission: IMission = {
                title: "Mission #1",
                description: "Purchase 25 items from",
                giver: this.cities[0],
                city: this.cities[1],
                goal: {
                    goalType: "fetch_items",
                    quantity: 25,
                    category: "bread"
                }
            }
            this.missions.push(mission);
    
            this.currentMission = this.missions[0];
        }
    
        // TODO
        updateMission() {
            var currentMission = this.currentMission;
    
            $('.mission-title').text(currentMission.title);
            $('.mission-description').text(currentMission.description + " " + currentMission.city.name + ".");
            $('.mission-return').text(currentMission.giver.name);
        }
    
        update(time: number) {
            var self = this;
    
            var delta = (new Date().getTime() - this.lastCalledTime) / 16.666666;
            this.lastCalledTime = new Date().getTime();
        // 60 fps = 16.66 ms/frame
        
        // self.fps = 1 / delta;
        // console.log(delta, delta / 16.66666666);
        
            requestAnimationFrame(function(time) {
                self.update(time);
            });
            
            var sceneItems = this.sceneItems,
                len = sceneItems.length;
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
        }
        
        render() {
            var sceneItems = this.sceneItems;
            
            this.context.save();
    
            // move context to camera position
            this.context.translate(this.camera.x, this.camera.y);
    
            // render
            // TODO: move to renderSystem, add in layers, cache rendering order
            for (var i = 0; i < sceneItems.length; i++) {
                if (sceneItems[i].systems.hasOwnProperty("render")) {
                    // TODO
                } else if (sceneItems[i].components.hasOwnProperty("renderable")) {
                    sceneItems[i].components["renderable"].render(this.context);
                }
            }
    
            this.context.restore();
        }
    
        updateDimensions(w: number, h: number) {
            this.width = w;
            this.height = h;
    
            // HAX EW!!! FIX ME!
            for (var i = 0; i < this.sceneItems.length; i++) {
                if (this.sceneItems[i].type === Config.objectTypes.WATER_BACKGROUND) {
                    var background: Objects.WaterBackground = <Objects.WaterBackground>this.sceneItems[i];
                    background.w = w * 2;
                    // height is fixed, so no need to change
                    //this.sceneItems[i].h = h;
    
                    break;
                }
            }
        }
        
        setupUIEvents() {
            radio("ship:dock").subscribe((dockable, ship) => {
                if (($("#city-screen").is(":visible") && $('.city-name').text() === dockable.name) || !($("#city-screen").is(":visible"))) {
                    this.showCityScreen(dockable);
                }
            });
        
            radio("ship:undock").subscribe((dockable, ship) => {
                if ($("#city-screen").is(":visible") && $('.city-name').text() === dockable.name) {
                    this.showCityScreen(dockable);
                }
            });
        
            radio("marker:remove").subscribe((id) => {
                this.removeItemFromSceneById(id);
            });
        }
        
        makeMarker(pos: [number, number]) {
            var options = {
                x: pos[0],
                y: pos[1]
            };
            
            // TODO
            var marker = new Trade.Objects.Marker(options);
            this.addObjectToScene(marker);
        }
        
        removeItemFromSceneById(id: string) {
            var items = this.sceneItems;
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === id) {
                    items.splice(i, 1);
                }
            }
        }
        
        changeSelection(obj) {
            if (obj) {
                var s = '';
                $('.selected-area').text(obj.type + ' ' + obj.toString() +' selected!');
            } else {
                $('.selected-area').text('');
            }
        }
        
        showCityScreen(city: Objects.City) {
            var cityScreenTpl = $('#tpl-city-screen').html();
            var rendered = Mustache.render(cityScreenTpl, {
                name: city.name
            });
            $('#city-screen').html(rendered);
            
            //$('.city-name').text(city.name);
            var info = city.components['dockable'].getDockingInfo(),
                ships = info.numDockedPlayerObjects,
                ship = null,
                cityItems = city.components['storable'].storage,
                self = this;
        
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
        
                    html += '<div class="ship-icon" id="'+ship.id+'"><div class="hover-text">' + ship.name + '</div></div>';
                }
        
                $('.docked-ships-info').html(html);
            }
        
            $('.ship-icon').on('click', e => {
                // TODO
                //var id = e.target.offsetParent.id;
                //var ship = this.getSceneItemById(id);
        
                if (ship) {
                    radio('sceneItem:select').broadcast(ship);
        
                    // TODO: blegh.
                    var newEvent = $.Event('click');
                    newEvent.button = 0;
                    
                    self.selectionSystem.update(ship.x+1, ship.y+1, newEvent);
                }
            });
            $('#city-screen').show();
        }
    }
}