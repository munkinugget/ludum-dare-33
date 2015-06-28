enum PlayerAnimations {
    Idle,
    Running,
    Kick
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
        this.Sprite.animations.add(PlayerAnimations.Kick.toString(), [12]);

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
        var playSpeed: number;
        var loop: boolean;
        switch (animation) {
            case PlayerAnimations.Idle:
                playSpeed = 2;
                loop = true;
                break;
            case PlayerAnimations.Running:
                playSpeed = 10;
                loop = true;
                break;
            case PlayerAnimations.Kick:
                playSpeed = 1;
                loop = false;
                break;

        }

        function revert(context: Player) {
            console.debug("GOT HERE");
            context.Sprite.play(PlayerAnimations.Idle.toString(), 1, true);
        }

        var an = this.Sprite.play(animation.toString(), playSpeed, loop);
        an.onComplete.add(function () { revert(this) });
        this.CurrentAnimation = animation;
    }

    private MovementComplete() {
        this.PlayAnimation(PlayerAnimations.Idle);
    }

}