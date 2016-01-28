/******************************************************************************
 * Trade.Components.Selectable
 * Allows selection of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="Component.ts" />

module Trade.Components {
	interface SelectableOptions {
		selected?: boolean;
		drawCircleWhenSelected?: boolean;
		selectedFunction?: (x: number, y: number, e: JQueryEventObject, context:Selectable) => any;	
		deselectedFunction?: () => any; // TODO
		clickFunction?: () => any; // TODO
	}
	
	export class Selectable extends Component {
		
		type = "selectable";
		
		selectable = true;
		
		/**
		 * The object's selection state
		 */
		selected: boolean;
		
		/** Whether to draw a circular selection radius when the object is selected */
		drawCicleWhenSelected: boolean;
		
		/**
	     * Function that is called when the object's selected state turns true
	     */
		selectedFunction: (x: number, y: number, e: JQueryEventObject, context:Selectable) => any;
		
		deselectedFunction: () => any;
		
		clickFunction: () => any;
		
		constructor(options: SelectableOptions) {
			super();
			this.selected = options.selected || false;
			this.drawCicleWhenSelected = options.drawCircleWhenSelected || false;
			this.selectedFunction = options.selectedFunction || null;
			this.deselectedFunction = options.deselectedFunction || null;
			this.clickFunction = options.clickFunction || null;
		}
	}
}