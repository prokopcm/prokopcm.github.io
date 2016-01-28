/******************************************************************************
 * Trade.Components.Selectable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="Component.ts" />

module Trade.Components {

	interface MovableOptions {
		/** Whether the object is currently in a moving state */
		moving?: boolean;
		/**The object's X-velocity */
		vx?: number;
		/**The object's Y-velocity */
		vy?: number;
		/** The object's destination X-position */
		destX?: number;
		/** The object's destination Y-position */
		destY?: number;
		/** The object's maximum movement speed */
		maxSpeed?: number;
		/** The object's current movement inertia amount */
		inertia?: number;
		/** The initial amount of movement inertia to apply when an object starts moving */
		initialInertia?: number;
	}
	
	
	export class Movable extends Component {
		
		type = "movable";
		
		movable = true;
		
		/** Whether the object is currently in a moving state */
		moving: boolean;
		
		/**The object's X-velocity */
		vx: number;
		
		/**The object's Y-velocity */
		vy: number;
		
		/** The object's destination X-position */
		destX: number;
		
		/** The object's destination Y-position */
		destY: number;
		
		dirX: number = 1;
		
		dirY: number = 1;
		
		/** The object's maximum movement speed */
		maxSpeed: number;
		
		/** The object's current movement inertia amount */
		inertia: number;
		
		/** The initial amount of movement inertia to apply when an object starts moving */
		initialInertia: number;
		
		constructor(options: MovableOptions) {
			super();
			this.moving = options.moving || false;
			this.vx = options.vx;
			this.vy = options.vy;
			this.destX = options.destY;
			this.destY = options.destX;
			this.maxSpeed = options.maxSpeed;
			this.inertia = options.inertia;
			this.initialInertia = options.initialInertia;
		}
		
		/** Sets an object's destination coordinates and starts an object moving
		 *  towards that position.
		 */
		setDestination(dest: {x: number, y: number, vx?: number, vy?: number, dirX?: number, dirY?: number}) {
			this.moving = true;

	        this.destX = dest.x;
	        this.destY = dest.y;
			
			if (dest.vx) {
	        	this.vx = dest.vx;
			}
			
			if (dest.vy) {
	        	this.vy = dest.vy;
			}
			
			if (dest.dirX) {
	        	this.dirX = dest.dirX;
			}
			
			if (dest.dirY) {
	        	this.dirY = dest.dirY;
			}
		}
	}
}