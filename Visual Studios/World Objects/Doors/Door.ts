class Door {
    private MaxHealth: number;
    private CurrentHealth: number;

    constructor(maxHealth: number) {
        this.MaxHealth = maxHealth;
        this.CurrentHealth = maxHealth;
    }

    public DamageDoor(amount: number) {
        this.CurrentHealth -= amount;
    }

    public get GetPercentageHealth() {
        return Math.ceil(this.CurrentHealth / this.MaxHealth); 
    }

    public static GetRandomDoor(difficulty: number) {
        var randomNumber = Math.random();
        switch (Math.round(difficulty + ((randomNumber - .5) * difficulty * randomNumber))) {
            case 0:
                return new Door(10);//TODO: replace with actual door
            case 1:
                return new Door(100);//TOOD: replace with actual door
            case 2:
                return new Door(1000);//TODO: replace with actual door
            default:
                return new Door(10000);//TODO: replace with aactual door
        }

    }
}