class Player {
    public X: number;
    public Y: number;
    public Sprite: Phaser.Sprite;
    public Moving: boolean;

    constructor() {
        this.Sprite = KickTheDoorDown.Game.add.sprite(48 / 2, 48 / 2, "player");
        this.Sprite.anchor.setTo(.5, .5);
        this.Sprite.animations.add("Run");
        this.Sprite.animations.play("Run", 10, true);
    }
    public MoveTo(newLoc: number) {
        KickTheDoorDown.Game.add.tween(this.Sprite).to({
            x: newLoc
        }, 10, Phaser.Easing.Linear.None, true);

    }

}