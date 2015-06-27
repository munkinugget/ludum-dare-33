class WorldMap {
    private Difficulty: number;
    private Rooms: number;
    private Doors: Door[]


    constructor(difficulty: number, rooms: number) {
        this.Difficulty = difficulty;
        this.Rooms = rooms;
        this.generate();
    }



    private generate() {
        
    }

}