/******************************************************************************
 * Trade.Components.Selectable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="Component.ts" />

module Trade.Components {
	export interface RotationConstraint {
		active: boolean;
		constraintFormula: () => boolean;
	}
	
	export interface RotatableOptions {
		rotating?: boolean;
		rotation?: number;
		destRotation?: number;
		rotationVelocity?: number;
		inertia?: number;
		initialInertia?: number;
		rotationConstraint?: RotationConstraint
	}
	
	
	export class Rotatable extends Component {
		
		type = "rotatable";
		
		rotatable = true;
		
		/** The degrees of rotation to apply to the object */
		rotation: number;
		
		/** Whether the object is currently rotating */
		rotating: boolean;		
		
		/** The object's target rotation degree */
		destRotation: number;
		
		/** How quickly the object can rotate */
		rotationVelocity: number;
		
		/** The object's current inertia amount */
		inertia: number;
		
		/** The initial amount of rotation inertia to apply to an object */
		initialInertia: number;
		
		rotationConstraint: RotationConstraint;
		
		constructor(options: RotatableOptions) {
			super();
			this.rotating = options.rotating || false;
			this.rotation = options.rotation || 0;
			this.destRotation = options.destRotation || 0;
			this.rotationVelocity = options.rotationVelocity || 0;
			this.inertia = options.inertia || 0;
			this.initialInertia = options.initialInertia || 0;
			this.rotationConstraint = options.rotationConstraint || {
				active: false,
				constraintFormula: () => { return true; }
			};
		}
		
		/** Immediately change an object's rotation */
		setRotationImmediate(rotation: number) {
			// TODO
		}
		
		/** Sets an object's destination rotation amount and starts an object 
		 *  rotating towards that rotation. 
		 */
		setRotation(rotation: number) {
			this.rotating = true;
			this.destRotation = rotation;
		}
	}
}