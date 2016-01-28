/******************************************************************************
 * Trade.Objects.TradeItem
 * A tradeable object
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
/// <reference path="../objects/GameObject.ts" />

module Trade.Objects {
    interface GameObjectOptions {
        id: string;
    }
    
    interface TradeItemOptions extends GameObjectOptions {
        /** The rarity of the item */
        rarity?: number;
        
        /** The base value of the item */
        value?: number;
    }
    
    export class TradeItem extends GameObject {

        type = Trade.Config.objectTypes.TRADE_ITEM;
        
        /** The rarity of the item */
        rarity: number;
        
        /** The base value of the item */
        value: number;
        
        constructor(options: TradeItemOptions) {
            super(options);
            this.rarity = options.rarity || 1;
            this.value = options.value || 1;
        }
    }
}