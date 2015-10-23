/******************************************************************************
 * Trade.Game
 * Trade Game class. Used to create an instance of the trading game.
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = window.Trade || {};

/**
 * Creates a new tradegame instance.
 *
 * @constructor
 * @param  {object} canvas HTML canvas element on which to draw
 */
Trade.Game = Trade.Game || function(canvas) {

    /**
     * The canvas object
     * @type {object}
     */
    this.canvas = canvas;

    /**
     * jQuery wrapped canvas object
     * @type {object}
     */
    this.$canvas = $(canvas);

    /**
     * The 2D canvas context
     * @type {object}
     */
    this.context = canvas.getContext("2d");

    /**
     * The width of the canvas on which the game is drawn.
     * @type {number}
     */
    this.width = canvas.width;

    /**
     * The height of the canvas on which the game is drawn.
     * @type {number}
     */
    this.height = canvas.height;

    /**
     * List of renderable scene items
     * @type {Array<Trade.Object>}
     */
    this.sceneItems = [];

    /**
     * List of ships in the scene
     * @type {Array<Trade.Ship>}
     */
    this.ships = [];

    /**
     * List of cities in the game
     * @type {Array<Trade.Ship>}
     */
    this.cities = [];

    /**
     * Array full of scene effects. Ex. markers, weather particles, etc.
     * @type {Array<object>}
     */
    this.sceneEffects = [];

    /**
     * Game world systems array
     * @type {Array<Trade.System>}
     */
    this.systems = [];

    /**
     * Array full of user missions
     * @type {Array<Trade.Mission>}
     */
    this.missions = [];

    this.currentMission = null;

    // module click information
    this.clickX = 0;
    this.clickY = 0;
    this.actualX = 0;
    this.actualY = 0;

    // FPS stuff
    this.lastCalledTime = 0;
    this.fps = 0;

    // TODO: make camera class?
    this.camera = {
        x: 0,
        y: 0
    };
};

/**
 * Initializes a game instance with the cities, missions, etc. required to
 * start the game. Starts the requestanimationframe loop.
 */
Trade.Game.prototype.init = function() {
    this.debugMgr = new Trade.UI.DebugMgr({
        game:this
    });

    this.mouseMgr = new Trade.UI.MouseMgr({
        game:this
    });

    this.collisionSystem = new Trade.Systems.CollisionSystem({});
    
    this.selectionSystem = new Trade.Systems.SelectionSystem({
        game: this
    });

    // setup clock
    this.clock = new Trade.Systems.ClockSystem({
        tickRate: 30,
        game: this
    });

    this.economy = new Trade.Systems.EconomySystem({
        game: this
    });
    this.clock.addListener(this.economy);

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
        }),
        ship2 = new Trade.Objects.Ship({
            x: 100, 
            y: 200,
            owner: Trade.Config.owners.PLAYER
        });

    var d = {};
    d[ship.id] = ship;
    d[ship2.id] = ship2;

    var storage = {};
    storage[Trade.Config.tradeItemTypes.BREAD] = {
        item: this.economy.getItem(Trade.Config.tradeItemTypes.BREAD),
        quantity: 10
    };
    
    storage[Trade.Config.tradeItemTypes.WOOD] = {
        item: this.economy.getItem(Trade.Config.tradeItemTypes.WOOD),
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
    storage2[Trade.Config.tradeItemTypes.TEA] = {
        item: this.economy.getItem(Trade.Config.tradeItemTypes.TEA),
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

    var self = this;

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
};

Trade.Game.prototype.addObjectToScene = function(object) {
    this.sceneItems.push(object);

    if (object.components.hasOwnProperty("collidable")) {
        this.collisionSystem.addObject(object);
    }

    if (object.type === Trade.Config.objectTypes.CITY) {
        this.cities.push(object);
    }
};

Trade.Game.prototype.setupMissions = function() {
    this.missions.push({
        title: "Mission #1",
        description: "Purchase 25 items from",
        giver: this.cities[0],
        city: this.cities[1],
        goal: {
            goalType: "fetch_items",
            quantity: 25,
            category: "bread"
        }
    });

    this.currentMission = this.missions[0];
};

Trade.Game.prototype.updateMission = function() {
    var currentMission = this.currentMission;

    $('.mission-title').text(currentMission.title);
    $('.mission-description').text(currentMission.description + " " + currentMission.city.name + ".");
    $('.mission-return').text(currentMission.giver.name);
};

/**
 * Main update loop for the world.
 * Order: Movement, Collision, Render
 * @param  {string} time the current time
 */
Trade.Game.prototype.update = function(time) {
    var self = this;
/*    
    var delta = (new Date().getTime() - this.lastCalledTime) / 1000;
    this.lastCalledTime = new Date().getTime();
    self.fps = 1 / delta;
    //console.log(self.fps);
*/
    requestAnimationFrame(function(time) {
        self.update(time);
    });
    var sceneItems = this.sceneItems,
        len = sceneItems.length;
    for (var i = 0; i < sceneItems.length; i++) {
        
        // move
        // TODO: make gameWold movement system, attach objects to that
        if (sceneItems[i].systems.hasOwnProperty("movement")) {
            sceneItems[i].systems['movement'].update(time);
        }
    }
    
    // collide
    this.collisionSystem.update(this.context);  

    this.context.save();

    // move context to camera position
    this.context.translate(this.camera.x, this.camera.y);
    
    // render
    // TODO: move to renderSystem, add in layers, cache rendering order
    for (i = 0; i < sceneItems.length; i++) {
        if (sceneItems[i].systems.hasOwnProperty("render")) {
            // TODO
        } else if (sceneItems[i].components.hasOwnProperty("renderable")) {
            sceneItems[i].components["renderable"].render(this.context);
        }
    }

    this.context.restore();
};

Trade.Game.prototype.makeMarker = function(pos) {
    var options = {
        x: pos[0],
        y: pos[1]
    };

    var marker = new Trade.Objects.Marker(options);
    this.addObjectToScene(marker);
};

Trade.Game.prototype.removeMarker = function(id) {
    var items = this.sceneItems;
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            items.splice(id, 1);
        }
    }
};

Trade.Game.prototype.changeSelection = function(obj) {
    if (obj) {
        var s = '';
        $('.selected-area').text(obj.type + ' ' + obj.toString() +' selected!');
    } else {
        $('.selected-area').text('');
    }
};

// TODO: refactor and encapsulate this PoS.
Trade.Game.prototype.showCityScreen = function(city) {
    $('.city-name').text(city.name);
    var info = city.components['dockable'].getDockingInfo(),
        ships = info.numDockedPlayerObjects,
        ship = null,
        cityItems = city.components['storable'].storage,
        self = this;

    var itemHTML = '';
    // ITEMS
    for (var key in cityItems) {
        var item = cityItems[key];

        var s = '<div class="city-item"><span class="item-name">'+key+'</span><span class="item-qty">'+item.quantity+'</span></div>'
        itemHTML += s;
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

    $('.ship-icon').on('click', function(e) {
        var id = e.target.offsetParent.id;
        var ship = self.getSceneItemById(id);

        if (ship) {
            radio('sceneItem:select').broadcast(ship);

            // TODO: blegh.
            self.selectionSystem.update(ship.x+1, ship.y+1, {button: 0});
        }
       
    });
    $('#city-screen').show();
};

Trade.Game.prototype.updateDimensions = function(w, h) {
    this.width = w;
    this.height = h;

    // HAX EW!!! FIX ME!
    for (var i = 0; i < this.sceneItems.length; i++) {
        if (this.sceneItems[i].type === Trade.Config.objectTypes.WATER_BACKGROUND) {
            this.sceneItems[i].w = w * 2;
            // height is fixed, so no need to change
            //this.sceneItems[i].h = h;

            break;
        }
    }
};

// TODO: this all sucks hardcore
Trade.Game.prototype.setupUIEvents = function() {
    var self = this;

    radio("ship:dock").subscribe(function(dockable, ship) {
        if (($("#city-screen").is(":visible") && $('.city-name').text() === dockable.name) || !($("#city-screen").is(":visible"))) {
            self.showCityScreen(dockable);
        }
    });

    radio("ship:undock").subscribe(function(dockable, ship) {
        if ($("#city-screen").is(":visible") && $('.city-name').text() === dockable.name) {
            self.showCityScreen(dockable);
        }
    });

    radio("marker:remove").subscribe(function(id) {
        self.removeMarker(id);
    });
};

Trade.Game.prototype.getSceneItemById = function(id) {
    for (var i = this.sceneItems.length - 1; i >= 0; i--) {
        if (this.sceneItems[i].id === id) {
            return this.sceneItems[i];
        }
    }

    return null;
};

Trade.Game.prototype.deleteSceneItemById = function(id) {
    for (var i = this.sceneItems.length - 1; i >= 0; i--) {
        if (this.sceneItems[i].id === id) {
            this.sceneItems[i].destroy();
            delete this.sceneItems[i];
            
            return true;
        }
    }

    return false;
};

Trade.Game.prototype.getEconomyInstance = function() {
    return this.economy;
}