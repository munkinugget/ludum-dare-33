/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
declare class SimpleGame {
    game: Phaser.Game;
    map: Phaser.Tilemap;
    constructor();
    render(): void;
    preload(): void;
    create(): void;
}
