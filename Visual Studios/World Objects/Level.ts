class Level {
    private Difficulty: number;
    private RoomCount: number;
    private Doors: Door[];
    private Map: Phaser.Tilemap;
    public Player: Player;
    private Scale: number;
    public doors: Phaser.Group;


    constructor(difficulty: number, rooms: number) {
       
        this.Difficulty = difficulty;
        this.RoomCount = rooms;
        console.debug("Creating new Level room count=" + this.RoomCount);
        this.generate();
    }

    public MoveCamera(augmentAmount: number) {        
        //KickTheDoorDown.Game.camera.x += augmentAmount;

        this.Player.PlayAnimation(PlayerAnimations.Running);
        this.Player.MoveTo(augmentAmount*50);
        //this.doors.x += augmentAmount;
        //KickTheDoorDown.Game.add.tween(KickTheDoorDown.Game.camera).to({ x: KickTheDoorDown.Game.camera.x + augmentAmount }, 1).start();
    }
    public StopMove() {
        this.Player.MoveTo(0);
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
        this.Map.setCollisionBetween(0, 29, true);
        
        console.debug("Putting Tiles");
        for (var i = 0; i <= this.RoomCount*2; i++) {
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
    }
    


    public Update() {


    }

}