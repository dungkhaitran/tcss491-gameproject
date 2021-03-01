class aura {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/effects/aura.png");
        
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 112, 164, 16, 12, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);
    };
}