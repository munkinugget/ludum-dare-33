﻿///<refrence path="World Objects/WorldMap.ts"/>

class KickTheDoorDown {
    public static Game: Phaser.Game;
    map: Phaser.Tilemap;

    constructor() {
        KickTheDoorDown.Game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            create: this.create, preload:
            this.preload, render: this.render
        });
    }
    preload() {
        KickTheDoorDown.Game.load.image("Tiles", "images/world/tile_base.png");

           
          
        //KickTheDoorDown.Game.load.tilemap("Map", null, world.generate(), Phaser.Tilemap.TILED_JSON);
        
    }


    render() {

    }

    onkeyup(event) {
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
    }

    create() {
        var world: Level;
        world = new Level(10, 50);


        console.debug("Starting Create physics mode = arcade");
        KickTheDoorDown.Game.physics.startSystem(Phaser.Physics.ARCADE);
        console.debug("Starting Create keybord callback");
        KickTheDoorDown.Game.input.keyboard.addCallbacks(null, null, onkeyup);
        //console.debug("Starting Add Map");
        //this.map = KickTheDoorDown.Game.add.tilemap("Map");




        //this.map = KickTheDoorDown.Game.add.tilemap("Map");
        //this.map.addTilesetImage("Background", "Tiles");

        //this.map.createLayer("Background").resizeWorld();
        //this.map.createLayer("Midground");
        //this.map.createLayer("Foreground");


        KickTheDoorDown.Game.camera.x = this.map.widthInPixels / 2;
        KickTheDoorDown.Game.camera.y = 0;

        KickTheDoorDown.Game.add.tween(KickTheDoorDown.Game.camera).to({ x: 0 }, 3000).
            to({ x: this.map.layers[0].widthInPixels }, 3000).loop().start();
    }
}

window.onload = () => {
    var game = new KickTheDoorDown();
};