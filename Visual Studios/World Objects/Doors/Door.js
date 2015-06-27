var Door = (function () {
    function Door(maxHealth) {
        this.MaxHealth = maxHealth;
        this.CurrentHealth = maxHealth;
    }
    Door.prototype.DamageDoor = function (amount) {
        this.CurrentHealth -= amount;
    };
    Object.defineProperty(Door.prototype, "GetPercentageHealth", {
        get: function () {
            return Math.ceil(this.CurrentHealth / this.MaxHealth);
        },
        enumerable: true,
        configurable: true
    });
    Door.GetRandomDoor = function (difficulty) {
        var randomNumber = Math.random();
        switch (Math.round(difficulty + ((randomNumber - .5) * difficulty * randomNumber))) {
            case 0:
                return new Door(10);
            case 1:
                return new Door(100);
            case 2:
                return new Door(1000);
            default:
                return new Door(10000);
        }
    };
    return Door;
})();
//# sourceMappingURL=Door.js.map