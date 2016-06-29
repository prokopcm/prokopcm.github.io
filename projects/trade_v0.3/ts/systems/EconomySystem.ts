/// <reference path="../interfaces/ISystem.ts" />
/// <reference path="../components/Tickable.ts" />
/// <reference path="../util/Helpers.ts" />
/// <reference path="../objects/TradeItem.ts" />


module Trade.Systems {
	export class EconomySystem extends Components.Tickable implements Interfaces.ISystem {

		id: string = Helpers.generateId();

		type = 'economy';

		game: Game;

		updateRate: number;

		// TODO
		world: any;

		// TODO
		items: Array<Objects.TradeItem>;

		constructor(options) {
			super();

			this.game = options.game;
			/**
	         * Rate at which to update. Default 30 ticks.
	         * @type {Number}
	         */
	        this.updateRate = options.updateRate || 30;

	        this.world = {
	            wealth: 100
	        };

	        this.items = options.items || [];

			this.onTick = function(tick, rate) {
				if (tick % this.updateRate === 0) {
		            this.update();
		        }
			}
		}

		update() {

		}

		getItemValues() {}

		getItemValue(type: string): number {
			var item = this.getItem(type),
				value = (item.value * (this.world.wealth / 100)) * item.rarity;

			return value;
		}

		getItems() {

		}

		getItem(type: string): Objects.TradeItem {
			if (this.items[type]) {
	            return this.items[type];
	        }

	        return null;
		}
	}
}
