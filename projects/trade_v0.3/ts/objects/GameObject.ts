/// <reference path="../components/Eventable.ts" />
/// <reference path="../util/Helpers.ts" />
/// <reference path="../util/Config.ts" />
/// <reference path="../interfaces/IComponent.ts" />

interface IComponentList {
    movable?: Object;
    renderable?: Object;
}

interface ISystemList {
    movement?: Object;
}

module Trade.Objects {
    
    export interface IGameObjectOptions {
         /** The unique id of the object */
        id?: string;

        /** The display name of the object */
        name?: string;

        /** The unique type of game object */
        type?: number;
        
        /** The object's owner */
        owner?: Config.owners;
        
        /** The object's X position */
        x?: number;

        /** The object's Y position */
        y?: number;

        /** The object's width */
        w?: number;
        
        /** The object's height */
        h?: number;

        /** The factor by which to scale in the X-axis
         * @default 1
         */
        sX?: number;

        /** The factor by which to scale in the Y-axis
         * @default 1
         */
        sY?: number;
        
        /** The velocity by which to adjust the scale-X factor*/
        sXv?: number;
        
        /** The velocity by which to adjust the scale-Y factor*/
        sYv?: number;

        radiusSq?: number;

        centerX?: number;

        centerY?: number;

        components?: Object;

        systems?: Array<Object>;

        children?: Array<Object>;
    }
    
    export class GameObject extends Components.Eventable {
        
        /** The unique id of the object */
        id: string;

        /** The display name of the object */
        name: string;

        /** The unique type of game object */
        type: Config.objectTypes = Config.objectTypes.GAME_OBJECT;
        
        /** The object's owner */
        owner: Config.owners;
        
        /** The object's X position */
        x: number;

        /** The object's Y position */
        y: number;

        /** The object's width */
        w: number;
        
        /** The object's height */
        h: number;

        /** The factor by which to scale in the X-axis
         * @default 1
         */
        sX: number;

        /** The factor by which to scale in the Y-axis
         * @default 1
         */
        sY: number;
        
        /** The velocity by which to adjust the scale-X factor*/
        sXv: number;
        
        /** The velocity by which to adjust the scale-Y factor*/
        sYv: number;

        radiusSq: number;

        centerX: number;

        centerY: number;

        // TODO: stricter type
        components: any = {};

        // TODO: stricter type
        systems: any = {};

        // TODO: stricter type
        children: Array<Object> = [];

        constructor(options?: IGameObjectOptions) {
            super();
            options = options || {};
            this.id = options.id || Helpers.generateId();
            this.x = options.x || 0;
            this.y = options.y || 0;
            this.w = options.w || 0;
            this.h = options.h || 0;
            this.sX = options.sX || 1;
            this.sY = options.sY || 1;
            this.centerX = options.centerX || this.x + this.w / 2;
            this.centerY = options.centerY || this.y + this.h / 2;
            this.owner = options.owner || Trade.Config.owners.WORLD;
        }

        update(time?) {}
        
        /**
         * Adds a component to an object
         */
        addComponent(component: Interfaces.IComponent) {
            this.components[component.type] = component;
        }
        
        /**
         * Adds a component to an object
         */
        addSystem(system: any) {
            this.systems[system.type] = system;
        }
        
        removeComponent(type: string) {
            // TODO
        }
    }
}