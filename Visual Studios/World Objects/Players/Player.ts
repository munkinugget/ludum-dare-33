enum PlayerAnimations {
    Idle,
    Running
}

class Player {
    public X: number;
    public Y: number;
    public Sprite: Phaser.Sprite;
    public CurrentAnimation: PlayerAnimations;

    constructor() {
        this.Sprite = KickTheDoorDown.Game.add.sprite(48 / 2, 29, "player");
        this.Sprite.anchor.setTo(.5, .5);
        this.Sprite.animations.add(PlayerAnimations.Running.toString(), [0, 1, 2, 3, 4, 5]);
        this.Sprite.animations.add(PlayerAnimations.Idle.toString(), [0, 6]);
        this.PlayAnimation(PlayerAnimations.Running);
    }

    public MoveTo(newLoc: number) {
        var tween = KickTheDoorDown.Game.add.tween(this.Sprite).to({ x: newLoc }, 10,
            Phaser.Easing.Linear.None, true);
        //tween.onComplete;
    }

    private PlayAnimation(animation: PlayerAnimations) {
        switch (animation) {
            case PlayerAnimations.Idle:
                this.Sprite.play(animation.toString(), 1, true);
                break;
            case PlayerAnimations.Running:
                this.Sprite.play(animation.toString(), 10, true);
                break;
        }

        this.CurrentAnimation = animation;
    }

    private MovementComplete() {
        this.CurrentAnimation = PlayerAnimations.Idle;
    }

}