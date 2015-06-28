class Level {
    private Difficulty: number;
    private RoomCount: number;
    private Doors: Door[];
    private Map: Phaser.Tilemap;
    public Player: Player;
    private Scale: number;
    private doors: Phaser.Group;


    constructor(difficulty: number, rooms: number) {
       
        this.Difficulty = difficulty;
        this.RoomCount = rooms;
        console.debug("Creating new Level room count=" + this.RoomCount);
        this.generate();
    }

    public MoveCamera(augmentAmount: number) {        
        KickTheDoorDown.Game.camera.x += augmentAmount;
        this.Player.MoveTo(KickTheDoorDown.Game.camera.x+48/2);
        //this.doors.x += augmentAmount;
        //KickTheDoorDown.Game.add.tween(KickTheDoorDown.Game.camera).to({ x: KickTheDoorDown.Game.camera.x + augmentAmount }, 1).start();
    }

    private generate() {
        console.debug("creating map");
        this.Map = KickTheDoorDown.Game.add.tilemap();
        
        this.Map.addTilesetImage('tile', 'worldTiles', 48, 48, 0, 0);
        console.debug("Creating Layers");
        var map = this.Map.create("map", this.RoomCount * 2, 1, 48, 48);
        map.resizeWorld();
        this.doors = KickTheDoorDown.Game.add.group();
        this.Player = new Player();

        
        console.debug("Putting Tiles");
        for (var i = 0; i <= this.RoomCount*2; i++) {
            if (i % 2 != 0) {
                this.Map.putTile(10, i, 0, map);
                var myDoor = KickTheDoorDown.Game.add.sprite((i * 48), 0, "doors", 11);                
                this.doors.add(myDoor);
            }
            else {
                this.Map.putTile(Math.round(Math.random() * 3), i, 0, map);
            }
        }
    }

    public Update() {


    }

}