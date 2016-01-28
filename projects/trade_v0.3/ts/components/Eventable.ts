/// <reference path="Component.ts" />

module Trade.Components {

    export class Eventable extends Component {
        
        private _events: Object = {};

        eventable: boolean;

        constructor(options?) {
            super();
            
            options = options || {};

            this.eventable = options.eventable || true;
        }
        
        trigger(eventName: string, options?: Object): void {
            if (this._events.hasOwnProperty(eventName)) {
                for (var i = 0; i < this._events[eventName].length; ++i) {
                    var item = this._events[eventName][i];
                    item.action.apply(item.context, [options]);
                }
            }
        }

        on(eventName: string, action: Function, context: Object): void {
            if (!this._events.hasOwnProperty(eventName)) {
                this._events[eventName] = [];
            }

            this._events[eventName].push({
                action: action, 
                context: context
            });
        }

        off(): void {
            this._events = {};
        }
    }
}