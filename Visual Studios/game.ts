///<refrence path="World Objects/Level.ts"/>
class KickTheDoorDown {
    public static Game: Phaser.Game;
    private world: Level;
    private cursors: Phaser.CursorKeys;
    public static pixel= { scale: 8, canvas: null, context: null, width: 0, height: 0 };

    constructor() {
        KickTheDoorDown.Game = new Phaser.Game(96, 48, Phaser.CANVAS, '', {
            create: this.create, preload:
            this.preload, render: this.render, update: this.update
        });        
    }


    preload() {
        KickTheDoorDown.Game.load.image("worldTiles", "images/world/tile_base.png");
        KickTheDoorDown.Game.load.spritesheet("doors", "images/world/tile_base.png", 48, 48);
        KickTheDoorDown.Game.load.spritesheet("player", "images/entities/char.png", 24, 24,6);
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
    }


    render() {
        //Every loop we need to render the un-scaled game canvas to the displayed scaled canvas:  
        KickTheDoorDown.pixel.context.drawImage(KickTheDoorDown.Game.canvas, 0, 0, KickTheDoorDown.Game.width, KickTheDoorDown.Game.height, 0, 0, KickTheDoorDown.pixel.width, KickTheDoorDown.pixel.height);
        
    }

    onkeyup(event) {
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
    }

    update() {
        if (this.cursors.right.isDown)
            this.world.MoveCamera(1);
        else if (this.cursors.left.isDown)
            this.world.MoveCamera(-1);
    }

    create() {
       
        this.world = new Level(10, 50);


        console.debug("Starting Create physics mode = arcade");
        KickTheDoorDown.Game.physics.startSystem(Phaser.Physics.ARCADE);
        console.debug("Starting Create keybord callback");
        KickTheDoorDown.Game.input.keyboard.addCallbacks(null, null, onkeyup);

        //KickTheDoorDown.Game.camera.x = KickTheDoorDown.Map.layers[0].widthInPixels / 2;
        ////KickTheDoorDown.Game.camera.x = 0;
        //KickTheDoorDown.Game.camera.y = 0;

        //KickTheDoorDown.Game.add.tween(KickTheDoorDown.Game.camera).to({ x: 0 }, 3000).
        //    to({ x: KickTheDoorDown.Map.layers[0].widthInPixels }, 3000).loop().start();
    }
}

window.onload = () => {
    var game = new KickTheDoorDown();
};