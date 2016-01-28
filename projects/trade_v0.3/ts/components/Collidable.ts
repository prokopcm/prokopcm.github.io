/// <reference path="Component.ts" />
/// <reference path="../objects/Collision.ts" />

module Trade.Components {
	
	export class Collidable extends Component {
		
		type = "collidable";
		
    	collisions: Objects.Collision[];
		
		constructor(options?: {collisions: Objects.Collision[]}) {
			super();
			this.collisions = options.collisions || [];
		}
	}
}