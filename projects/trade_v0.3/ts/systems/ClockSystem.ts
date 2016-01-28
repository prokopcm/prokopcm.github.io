/******************************************************************************
 * Trade.Clock
 * A clock that ticks at 30 Hz
 * (c) 2013 Michael Prokopchuk
 *
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../interfaces/ISystem.ts" />

module Trade.Systems {
	interface ClockSystemOptions {
		game: Trade.Game;
		tickRate?: number;
	}
	
	export class ClockSystem implements Trade.Interfaces.ISystem {
		type: string = 'clock';
		
		tickRate: number;
		
		game: Trade.Game;
		
		tick: number = 0;
		
		private _clockListeners: any;
		
		private _listenerMap: any;
		
		constructor(options: ClockSystemOptions) {
			this._clockListeners = {};
			this._listenerMap = {};
			this.tickRate = options.tickRate || 30;
			
			this.game = options.game;
		}
		
		start() {
			setInterval(() => this.onTick(), 1000 / this.tickRate);
		}
		
		addListener(obj, rate?: number) {
			if (!this._clockListeners.hasOwnProperty(obj.id)) {
		        this._clockListeners[obj.id] = obj;
		    }
		}
		
		removeListener(obj, rate?: number) {
			if (this._clockListeners.hasOwnProperty(obj.id)) {
		        delete this._clockListeners[obj.id];
		    }
		}
		
		onTick() {
			// prevent number overflow
		    if (this.tick === 9007199254740992) {
		        this.tick = 0;
		    }
		
		    this.tick++;
		
		    var rateTick = (this.tick + 1) % this.tickRate,
		        objects = this.game.sceneItems,
		        tick = this.tick,
		        clockListeners = this._clockListeners;
		
		    for (var key in objects) {
		        if (objects[key].components['tickable']) {
		            var obj = objects[key].components['tickable'];
		            if (obj.onTick) {
		                obj.onTick.call(obj, tick, rateTick);
		            }
		        }
		    }
		
		    for (var key in clockListeners) {
		        clockListeners[key].onTick.call(clockListeners[key], tick, rateTick);
		    }
		}
	}
}