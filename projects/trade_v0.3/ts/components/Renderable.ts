/// <reference path="Component.ts" />

module Trade.Components {
	interface RenderableOptions {
		renderType?: string;
		sprite?: File;
		renderFunction?: (context: CanvasRenderingContext2D) => any;	
	}
	
	export class Renderable extends Component {
		
		type = "renderable";
		
		renderable = true;
		
		/**
	     * The object's render type "sprite" || "function"
	     * @type {string}
	     */
		renderType: string;
		
		/**
	     * The object's desired rotation amount in radians
	     * @type {File}
	     */
		sprite: File;
		
		/**
	     * The object's render function
	     * @type {function}
	     */
		renderFunction: (context: CanvasRenderingContext2D) => any;
		
		constructor(options: {renderType: string; renderFunction?: (context: CanvasRenderingContext2D) => any}) {
			super();
			// TODO: sprite support
			this.renderFunction = options.renderFunction || function(context) {};
		}
		
		render(context: CanvasRenderingContext2D) {
			if (this.sprite) {
	            // TODO
	        } else if (this.renderFunction) {
	            this.renderFunction(context);
	        }
		}
	}
}