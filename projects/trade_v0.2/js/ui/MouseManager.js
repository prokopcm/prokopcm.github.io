var ui = window.NS('Trade.UI');

ui.MouseMgr = function(options) {
    this.game = options.game;

    this._movingCamera = false;
    this._origPosX = 0;
    this._origPosY = 0;
    this._lastPosX = 0;
    this._lastPosY = 0;

    var game = this.game,
        self = this;

    game.$canvas.on('contextmenu', function(e) {
        return false;
    });

    game.$canvas.on('mousedown', function(e) {
        self.onMouseDown(e);
    });

    game.$canvas.on('mouseup', function(e) {
        self.onMouseUp(e);
    });

    $('.close-btn').click(function() {
        $('.ship-icon').off();
        $('#city-screen').hide();
    });
};

ui.MouseMgr.prototype.onMouseDown = function(e) {
    e.preventDefault();

    var self = this;

    this._origPosX = e.offsetX,
    this._origPosY = e.offsetY,
    this._lastPosX = e.offsetX,
    this._lastPosY = e.offsetY;
    this._movingCamera = false;
    
    this.game.$canvas.on('mousemove', function(e) {
        self.onMouseMove(e);
    });
};

ui.MouseMgr.prototype.onMouseMove = function(e) {
    if (!this._movingCamera) {
        if (Math.abs(this._origPosX - e.offsetX) > 9 || Math.abs(this._origPosY - e.offsetY) > 9) {
            this._movingCamera = true;
        }
    } else {
        var deltaX = this._lastPosX - e.offsetX,
            deltaY = this._lastPosY - e.offsetY;
        
        this._lastPosX = e.offsetX;
        this._lastPosY = e.offsetY;

        this.game.camera.x += deltaX;
        this.game.camera.y += deltaY;
    }
};

ui.MouseMgr.prototype.onMouseUp = function(e) {
    this.game.$canvas.off('mousemove');

    // convert to canvas coords, compensate for camera offset
    var x = (e.pageX - e.target.offsetLeft) - this.game.camera.x,
        y = (e.pageY - e.target.offsetTop) -  this.game.camera.y;
    
    // only register action if user didn't move camera while clicking
    if (!this._movingCamera) {
        game.selectionSystem.update(x, y, e);
    }
};