enum PlayerAnimations {
    Idle,
    Running
}

class Player {
    public Sprite: Phaser.Sprite;
    public CurrentAnimation: PlayerAnimations;
    private facingRight = true;


    constructor() {
        this.Sprite = KickTheDoorDown.Game.add.sprite(48 / 2, 29, "player");

        this.Sprite.anchor.setTo(.5, .5);
        this.Sprite.animations.add(PlayerAnimations.Running.toString(), [0, 1, 2, 3, 4, 5]);
        this.Sprite.animations.add(PlayerAnimations.Idle.toString(), [6, 7]);
        this.PlayAnimation(PlayerAnimations.Idle);
        KickTheDoorDown.Game.camera.follow(this.Sprite);
        KickTheDoorDown.Game.physics.arcade.enable(this.Sprite);
        this.Sprite.body.setSize(12,24);
        this.Sprite.body.collideWorldBounds = true;

    }

    public MoveTo(newLoc: number) {
        if (newLoc > 0 && !this.facingRight) {
            this.facingRight = true;
            this.Sprite.scale.set(1, 1);
        }
        else if (newLoc < 0 && this.facingRight) {
            this.facingRight = false;
            this.Sprite.scale.set(-1, 1);
        }
        else if (newLoc == 0) {
            this.PlayAnimation(PlayerAnimations.Idle);
        }

        this.Sprite.body.velocity.set(newLoc,0);
    }

    public get X() {
        return this.Sprite.x;
    }
    public get Y() {
        return this.Sprite.y;
    }

    public PlayAnimation(animation: PlayerAnimations) {
        if (this.CurrentAnimation == animation) return;

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
        this.PlayAnimation(PlayerAnimations.Idle);
    }

}