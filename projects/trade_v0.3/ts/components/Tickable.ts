/// <reference path="Component.ts" />
module Trade.Components {
	export class Tickable extends Component {

		protected onTick: Function;
		
		tickable = true;
		
		constructor(options?: {onTick: Function}) {
			super();
			this.onTick = options && options.onTick ? options.onTick : null;	
		}
		
		setOnTick(fn: Function) {
			this.onTick = fn;
		}
	}
}