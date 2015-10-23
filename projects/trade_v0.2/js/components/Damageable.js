/******************************************************************************
 * Trade.Components.Damageable
 * Allows damaging and healing of an object
 * (c) 2013 Michael Prokopchuk
 * 
 * @author Michael Prokopchuk
 *****************************************************************************/
var Trade = Trade || {};
Trade.Components = Trade.Components || {};

/** @namespace */
Trade.Components.Damageable = function(options) {

    /**
     * Whether the object is alive
     * @type {boolean}
     */
    this.alive = options.alive || true;

    /**
     * The object's maximum health amount
     * @type {number}
     */
    this.maxHealth = options.maxHealth || 1;

    /**
     * The object's current health
     * @type {number}
     */
    this.currentHealth = options.currentHealth || 1;

    /**
     * Changes an object's current health, clamping between 0 and maxHealth
     * @param  {number} amount healing (positive) or damage (negative) amount
     * @return {number}        the object's current health
     */
    this.changeHealth = function(amount) {
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
    };

    /**
     * Heals an object. If no amount is specified, heals the object completely 
     * @param  {number} amount the amount to heal the object
     * @return {number}        the object's current health
     */
    this.heal = function(amount) {
        this.currentHealth = (amount) ? 
            this.currentHealth + amount : this.maxHealth;

        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }

        // Just in case. Reviving a dead ship?
        this.alive = true;

        return this.currentHealth;
    };

    /**
     * Damages an object. If not amount is specified, it destroys the object.
     * @param  {number} amount amount by which to decrease an object's health
     * @return {number}        the object's current health
     */
    this.damage = function(amount) {

        this.currentHealth = (amount) ? this.currentHealth - amount : 0;
        
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.alive = false;
        }
        
        return this.currentHealth;
    };
};