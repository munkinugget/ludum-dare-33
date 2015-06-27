var WorldMap = (function () {
    function WorldMap(difficulty, rooms) {
        this.Difficulty = difficulty;
        this.RoomCount = rooms;
        this.ID = Math.random() * 100000000;
        //this.generate();
    }
    WorldMap.prototype.generate = function () {
        var returnVar;
        var map;
        map = new Phaser.Tilemap(KickTheDoorDown.Game);
        map.addTilesetImage('Tiles');
        map.createLayer("Background");
        map.createLayer("Midground");
        map.createLayer("Foreground");
        for (var i = this.RoomCount; i < 0; i++)
            map.putTile(0, i, 0, "Background");
        return map;
    };
    return WorldMap;
})();
//# sourceMappingURL=WorldMap.js.map