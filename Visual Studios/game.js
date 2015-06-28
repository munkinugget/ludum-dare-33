///<refrence path="World Objects/Level.ts"/>
var KickTheDoorDown = (function () {
    function KickTheDoorDown() {
        KickTheDoorDown.Game = new Phaser.Game(96, 48, Phaser.CANVAS, '', {
            create: this.create,
            preload: this.preload,
            render: this.render,
            update: this.update
        }, false, false);
    }
    KickTheDoorDown.prototype.preload = function () {
        KickTheDoorDown.Game.load.image("worldTiles", "images/world/tile_base.png");
        KickTheDoorDown.Game.load.spritesheet("doors", "images/world/tile_base.png", 48, 48);
        KickTheDoorDown.Game.load.spritesheet("player", "images/entities/char.png", 24, 24);
        this.cursors = KickTheDoorDown.Game.input.keyboard.createCursorKeys();
        //  Hide the un-scaled game canvas
        KickTheDoorDown.Game.canvas.style['display'] = 'none';
        //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
        KickTheDoorDown.pixel.canvas = Phaser.Canvas.create(KickTheDoorDown.Game.width * KickTheDoorDown.pixel.scale, KickTheDoorDown.Game.height * KickTheDoorDown.pixel.scale);
        //  Store a reference to the Canvas Context
        KickTheDoorDown.pixel.context = KickTheDoorDown.pixel.canvas.getContext('2d');
        //  Add the scaled canvas to the DOM
        Phaser.Canvas.addToDOM(KickTheDoorDown.pixel.canvas, document.body);
        //  Disable smoothing on the scaled canvas
        Phaser.Canvas.setSmoothingEnabled(KickTheDoorDown.pixel.context, false);
        //  Cache the width/height to avoid looking it up every render
        KickTheDoorDown.pixel.width = KickTheDoorDown.pixel.canvas.width;
        KickTheDoorDown.pixel.height = KickTheDoorDown.pixel.canvas.height;
    };
    KickTheDoorDown.prototype.render = function () {
        //Every loop we need to render the un-scaled game canvas to the displayed scaled canvas:  
        KickTheDoorDown.pixel.context.drawImage(KickTheDoorDown.Game.canvas, 0, 0, KickTheDoorDown.Game.width, KickTheDoorDown.Game.height, 0, 0, KickTheDoorDown.pixel.width, KickTheDoorDown.pixel.height);
    };
    KickTheDoorDown.prototype.onkeyup = function (event) {
        switch (event.keyCode) {
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
    KickTheDoorDown.prototype.update = function () {
        if (this.cursors.right.isDown)
            this.world.MoveCamera(1);
        else if (this.cursors.left.isDown)
            this.world.MoveCamera(-1);
        else
            this.world.StopMove();
        KickTheDoorDown.Game.physics.arcade.collide(this.world.doors, this.world.Player.Sprite);
    };
    KickTheDoorDown.prototype.create = function () {
        console.debug("Starting Create physics mode = arcade");
        KickTheDoorDown.Game.physics.startSystem(Phaser.Physics.ARCADE);
        this.world = new Level(10, 50);
        console.debug("Starting Create keybord callback");
        KickTheDoorDown.Game.input.keyboard.addCallbacks(null, null, onkeyup);
        //KickTheDoorDown.Game.camera.x = KickTheDoorDown.Map.layers[0].widthInPixels / 2;
        ////KickTheDoorDown.Game.camera.x = 0;
        //KickTheDoorDown.Game.camera.y = 0;
        //KickTheDoorDown.Game.add.tween(KickTheDoorDown.Game.camera).to({ x: 0 }, 3000).
        //    to({ x: KickTheDoorDown.Map.layers[0].widthInPixels }, 3000).loop().start();
    };
    KickTheDoorDown.pixel = { scale: 8, canvas: null, context: null, width: 0, height: 0 };
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
    Level.prototype.MoveCamera = function (augmentAmount) {
        //KickTheDoorDown.Game.camera.x += augmentAmount;
        this.Player.PlayAnimation(1 /* Running */);
        this.Player.MoveTo(augmentAmount * 50);
        //this.doors.x += augmentAmount;
        //KickTheDoorDown.Game.add.tween(KickTheDoorDown.Game.camera).to({ x: KickTheDoorDown.Game.camera.x + augmentAmount }, 1).start();
    };
    Level.prototype.StopMove = function () {
        this.Player.MoveTo(0);
    };
    Level.prototype.generate = function () {
        console.debug("creating map");
        this.Map = KickTheDoorDown.Game.add.tilemap();
        this.Map.addTilesetImage('tile', 'worldTiles', 48, 48, 0, 0);
        console.debug("Creating Layers");
        var map = this.Map.create("map", this.RoomCount * 2, 1, 48, 48);
        map.resizeWorld();
        this.doors = KickTheDoorDown.Game.add.group();
        this.Player = new Player();
        this.Map.setCollisionBetween(0, 29, true);
        console.debug("Putting Tiles");
        for (var i = 0; i <= this.RoomCount * 2; i++) {
            if (i % 2 != 0) {
                this.Map.putTile(10, i, 0, map);
                var myDoor = KickTheDoorDown.Game.add.sprite((i * 48), 0, "doors", 11);
                this.doors.add(myDoor);
                KickTheDoorDown.Game.physics.arcade.enable(myDoor);
                myDoor.body.immovable = true;
            }
            else {
                this.Map.putTile(Math.round(Math.random() * 1), i, 0, map);
            }
        }
    };
    Level.prototype.Update = function () {
    };
    return Level;
})();
var PlayerAnimations;
(function (PlayerAnimations) {
    PlayerAnimations[PlayerAnimations["Idle"] = 0] = "Idle";
    PlayerAnimations[PlayerAnimations["Running"] = 1] = "Running";
})(PlayerAnimations || (PlayerAnimations = {}));
var Player = (function () {
    function Player() {
        this.facingRight = true;
        this.Sprite = KickTheDoorDown.Game.add.sprite(48 / 2, 29, "player");
        this.Sprite.anchor.setTo(.5, .5);
        this.Sprite.animations.add(1 /* Running */.toString(), [0, 1, 2, 3, 4, 5]);
        this.Sprite.animations.add(0 /* Idle */.toString(), [6, 7]);
        this.PlayAnimation(0 /* Idle */);
        KickTheDoorDown.Game.camera.follow(this.Sprite);
        KickTheDoorDown.Game.physics.arcade.enable(this.Sprite);
        this.Sprite.body.collideWorldBounds = true;
    }
    Player.prototype.MoveTo = function (newLoc) {
        if (newLoc > 0 && !this.facingRight) {
            this.facingRight = true;
            this.Sprite.scale.set(1, 1);
        }
        else if (newLoc < 0 && this.facingRight) {
            this.facingRight = false;
            this.Sprite.scale.set(-1, 1);
        }
        else if (newLoc == 0) {
            this.PlayAnimation(0 /* Idle */);
        }
        this.Sprite.body.velocity.set(newLoc, 0);
    };
    Object.defineProperty(Player.prototype, "X", {
        get: function () {
            return this.Sprite.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "Y", {
        get: function () {
            return this.Sprite.y;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.PlayAnimation = function (animation) {
        if (this.CurrentAnimation == animation)
            return;
        switch (animation) {
            case 0 /* Idle */:
                this.Sprite.play(animation.toString(), 1, true);
                break;
            case 1 /* Running */:
                this.Sprite.play(animation.toString(), 10, true);
                break;
        }
        this.CurrentAnimation = animation;
    };
    Player.prototype.MovementComplete = function () {
        this.PlayAnimation(0 /* Idle */);
    };
    return Player;
})();
//# sourceMappingURL=game.js.map