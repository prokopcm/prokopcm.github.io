/// <reference path="Component.ts" />
/// <reference path="../objects/Ship.ts" />

module Trade.Components {
    
    export class Storable extends Component {
        type = "storable";
        
        storable = true;
        
        storeType: string;
        
        storage: any;
        
        maxItems: number;
		
		constructor(options: {storeType?: string, storage?: any, maxItems?: number}) {
            super();
            
            this.storeType = options.storeType || "inventory";
            this.storage = options.storage || {};
            this.maxItems = options.maxItems || 10;
        }
        
        addItem(item: any, qty: number) {
            var type = (typeof item === "object") ? item.type : item;
            
            if (typeof item === "string") {
                // TODO
                // fetch item from economy or something?
            }
            
            if (!this.storage[type]) {
                this.storage[type] = item;
            } else {
                this.storage[type].quantity += qty;
            }
        }
        
        removeItem(item: any, qty: number) {
            /*
            var type = (typeof item === "object") ? item.type || item;
            */
            //if (!this.storage.hasOwnProperty(type)) {
                // TODO
            //}
        }
        
        getQuantity(item: any): number {
            var qty = 0,
                type = (typeof item === "object") ? item.type : item;
            
            if (!this.storage[item.type]) {
                qty = this.storage[type].quantity;
            }
            return qty;
        }
    }
}