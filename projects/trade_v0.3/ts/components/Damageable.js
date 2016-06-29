/// <reference path="Component.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Trade;
(function (Trade) {
    var Components;
    (function (Components) {
        var Damageable = (function (_super) {
            __extends(Damageable, _super);
            function Damageable(options) {
                _super.call(this);
                this.type = "damageable";
                this.damageable = true;
                this.alive = options.alive;
                this.maxHealth = options.maxHealth || 1;
                this.currentHealth = options.currentHealth || 1;
            }
            /**
             * Changes an object's current health, clamping between 0 and maxHealth
             * @param  {number} amount healing (positive) or damage (negative) amount
             * @return {number}        the object's current health
             */
            Damageable.prototype.changeHealth = function (amount) {
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
            Damageable.prototype.heal = function (amount) {
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
            Damageable.prototype.damage = function (amount) {
                this.currentHealth = (amount) ? this.currentHealth - amount : 0;
                if (this.currentHealth <= 0) {
                    this.currentHealth = 0;
                    this.alive = false;
                }
                return this.currentHealth;
            };
            return Damageable;
        })(Components.Component);
        Components.Damageable = Damageable;
    })(Components = Trade.Components || (Trade.Components = {}));
})(Trade || (Trade = {}));
//# sourceMappingURL=Damageable.js.map