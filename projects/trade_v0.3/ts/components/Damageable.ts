/// <reference path="Component.ts" />

module Trade.Components {
	
	export class Damageable extends Component {
		
		type = "damageable";
		
		damageable = true;
		
		/**
	     * Whether the object is alive
	     * @type {boolean}
	     */
		alive: boolean;
		
		/**
	     * The object's maximum health amount
	     * @type {number}
	     */
		maxHealth: number;
		
		/**
	     * The object's current health
	     * @type {number}
	     */
		currentHealth: number;
		
		constructor(options?) {
			super()
			this.alive = options.alive;
			this.maxHealth = options.maxHealth || 1;
			this.currentHealth = options.currentHealth || 1;
		}

	    /**
	     * Changes an object's current health, clamping between 0 and maxHealth
	     * @param  {number} amount healing (positive) or damage (negative) amount
	     * @return {number}        the object's current health
	     */
	    changeHealth(amount): number {
	        this.currentHealth += amount;
	
	        if (this.currentHealth > this.maxHealth) {
	            this.currentHealth = this.maxHealth;
	        }
	
	        if (this.currentHealth < 0) {
	            this.currentHealth = 0;
	        }
	
	        if (this.currentHealth === 0) {
	            this.alive = false;
	        }
	
	        return this.currentHealth;
	    }
	
	    /**
	     * Heals an object. If no amount is specified, heals the object completely 
	     * @param  {number} amount the amount to heal the object
	     * @return {number}        the object's current health
	     */
	     heal(amount): number {
	        this.currentHealth = (amount) ? 
	            this.currentHealth + amount : this.maxHealth;
	
	        if (this.currentHealth > this.maxHealth) {
	            this.currentHealth = this.maxHealth;
	        }
	
	        // Just in case. Reviving a dead ship?
	        this.alive = true;
	
	        return this.currentHealth;
	    }
	
	    /**
	     * Damages an object. If not amount is specified, it destroys the object.
	     * @param  {number} amount amount by which to decrease an object's health
	     * @return {number}        the object's current health
	     */
	    damage(amount: number): number {
	
	        this.currentHealth = (amount) ? this.currentHealth - amount : 0;
	        
	        if (this.currentHealth <= 0) {
	            this.currentHealth = 0;
	            this.alive = false;
	        }
	        
	        return this.currentHealth;
	    }
	}
}