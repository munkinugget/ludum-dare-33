class Level {
    private Difficulty: number;
    private RoomCount: number;
    private Doors: Door[];
    private ID: number;
    private Map: Phaser.Tilemap;

    constructor(difficulty: number, rooms: number) {
        this.Difficulty = difficulty;
        this.RoomCount = rooms;
        this.ID = Math.random() * 100000000;
        this.generate();
    }



    private generate() {
        console.debug("creating map");
        this.Map = KickTheDoorDown.Game.add.tilemap();
        this.Map.addTilesetImage('Tiles', null, 48, 48, 0, 0);

        console.debug("Creating Layers");
        this.Map.create("Background", 48, 1, 48, 48);
        var background = this.Map.createLayer("Background", 40, 1);

        console.debug("Putting Tiles");
        for (var i = this.RoomCount; i < 0; i++)
            this.Map.putTile(0, i, 0, background);
    }

    public Update() {
    }

}