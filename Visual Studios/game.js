///<refrence path="World Objects/Level.ts"/>
var KickTheDoorDown = (function () {
    function KickTheDoorDown() {
        KickTheDoorDown.Game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            render: this.render
        }, true, false);
    }
    KickTheDoorDown.prototype.preload = function () {
        KickTheDoorDown.Game.load.image("worldTiles", "images/world/tile_base.png");
        //KickTheDoorDown.Game.load.tilemap("Map", null, world.generate(), Phaser.Tilemap.TILED_JSON);
    };
    KickTheDoorDown.prototype.render = function () {
    };
    KickTheDoorDown.prototype.onkeyup = function (event) {
        switch (event.keyCode) {
            case Phaser.Keyboard.LEFT:
                break;
            case Phaser.Keyboard.RIGHT:
                break;
            case Phaser.Keyboard.UP:
                break;
            case Phaser.Keyboard.DOWN:
                break;
            case Phaser.Keyboard.ONE:
                break;
            case Phaser.Keyboard.TWO:
                break;
            case Phaser.Keyboard.THREE:
                break;
            case Phaser.Keyboard.FOUR:
                break;
            case Phaser.Keyboard.FIVE:
                break;
            case Phaser.Keyboard.SIX:
                break;
            case Phaser.Keyboard.SEVEN:
                break;
            case Phaser.Keyboard.EIGHT:
                break;
            case Phaser.Keyboard.NINE:
                break;
        }
    };
    KickTheDoorDown.prototype.create = function () {
        var world;
        world = new Level(10, 50);
        console.debug("Starting Create physics mode = arcade");
        KickTheDoorDown.Game.physics.startSystem(Phaser.Physics.ARCADE);
        console.debug("Starting Create keybord callback");
        KickTheDoorDown.Game.input.keyboard.addCallbacks(null, null, onkeyup);
        //KickTheDoorDown.Game.camera.x = KickTheDoorDown.Map.layers[0].widthInPixels / 2;
        ////KickTheDoorDown.Game.camera.x = 0;
        //KickTheDoorDown.Game.camera.y = 0;
        //KickTheDoorDown.Game.add.tween(KickTheDoorDown.Game.camera).to({ x: 0 }, 3000).
        //    to({ x: KickTheDoorDown.Map.layers[0].widthInPixels }, 3000).loop().start();
    };
    return KickTheDoorDown;
})();
window.onload = function () {
    var game = new KickTheDoorDown();
};
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
var Level = (function () {
    function Level(difficulty, rooms) {
        this.Difficulty = difficulty;
        this.RoomCount = rooms;
        console.debug("Creating new Level room count=" + this.RoomCount);
        this.generate();
    }
    Level.prototype.generate = function () {
        console.debug("creating map");
        this.Map = KickTheDoorDown.Game.add.tilemap();
        this.Map.addTilesetImage('tile', 'worldTiles', 48, 48, 0, 0);
        console.debug("Creating Layers");
        var background = this.Map.create("Background", this.RoomCount * 2, 1, 48, 48);
        var doorLayer = this.Map.create("DoorLayer", this.RoomCount * 2, 1, 48, 48);
        //background.setScale(10, 10);
        background.resizeWorld();
        console.debug("Putting Tiles");
        for (var i = 0; i <= this.RoomCount * 2; i++) {
            if (i % 2 == 0) {
                this.Map.putTile(10, i, 0, background);
                this.Map.putTile(11, i, 0, doorLayer);
            }
            else {
                this.Map.putTile(Math.round(Math.random() * 1), i, 0, background);
            }
        }
    };
    Level.prototype.Update = function () {
    };
    return Level;
})();
var Player = (function () {
    function Player() {
    }
    return Player;
})();
//# sourceMappingURL=game.js.map