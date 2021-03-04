class healthPotion {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/health-potion.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 49, 63, 7, 0.15, 1, false, true);
    
        this.width = 49;
        this.height = 63;
    }
    update() {
        this.updateBB();
    };

    drawMiniMap(ctx, mmx, mmy) {

    };
    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.7);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}