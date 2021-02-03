class nightBackground {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/ParFull.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    }
}

