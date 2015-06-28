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
//# sourceMappingURL=Level.js.map