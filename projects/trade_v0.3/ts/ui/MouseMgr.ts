/// <reference path="../TradeGame.ts" />
/// <reference path="../TypeDefs.d.ts" />

module Trade.UI {
	export class MouseMgr {
		
		game: Trade.Game;
		
		private _movingCamera = false;
		
		private _origPosX = 0;
		
		private _origPosY = 0;
		
		private _lastPosY = 0;
		
		private _lastPosX = 0;
		
		private _cameraMovePixelThreshold = 9;
		constructor(options: {game: Trade.Game}) {
			this.game = options.game;
			
			var game = this.game;
			
			game.$canvas.on('contextmenu', function(e) {
				return false;
			});
			
			game.$canvas.on('mousedown', (e) => this.onMouseDown(e));
		
		    game.$canvas.on('mouseup', (e) => this.onMouseUp(e));
		
		    $('.close-btn').click(function() {
		        $('.ship-icon').off();
		        $('#city-screen').hide();
		    });
		}
		
		onMouseDown(e: JQueryEventObject) {
			e.preventDefault();

		    var self = this;
		
		    this._origPosX = e.offsetX,
		    this._origPosY = e.offsetY,
		    this._lastPosX = e.offsetX,
		    this._lastPosY = e.offsetY;
		    this._movingCamera = false;
		    
		    this.game.$canvas.on('mousemove', (e) => self.onMouseMove(e));
		}
		
		onMouseUp(e: any) {
			this.game.$canvas.off('mousemove');

		    // convert to canvas coords, compensate for camera offset
		    var x = (e.pageX - e.target.offsetLeft) - this.game.camera.x,
		        y = (e.pageY - e.target.offsetTop) -  this.game.camera.y;
		    
		    // only register action if user didn't move camera while clicking
		    if (!this._movingCamera) {
		        this.game.selectionSystem.update(x, y, e);
		    }
		}
		
		onMouseMove(e: JQueryEventObject) {
			if (!this._movingCamera) {
		        if (Math.abs(this._origPosX - e.offsetX) > this._cameraMovePixelThreshold ||
					Math.abs(this._origPosY - e.offsetY) > this._cameraMovePixelThreshold) {
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
		}
	}
}