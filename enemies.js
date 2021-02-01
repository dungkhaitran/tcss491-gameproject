class Bat {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/bat.png");
        //this.animation = [];
        this.animation = new Animator(this.spritesheet, 10, 36, 27, 26, 6, 0.15, 20, false, true); // flying left
        
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;
    }
    // updateBricks() {
    //     this.bricks = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, (1 + 7/16) * PARAMS.BLOCKWIDTH);
    // }
    update() {
        // const FALL_ACC = 1800;

        // if (this.dead) {
        //     //if (this.deadCounter === 0) this.game.addEntity(new Score(this.game, this.x, this.y, 100));
        //     this.deadCounter += this.game.clockTick;
        //     if (this.deadCounter > 0.5) this.removeFromWorld = true;  // flicker for half a second
        // }
        // if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
        //     this.paused = false;
        // }
        // if (!this.paused && !this.dead) {
        //     this.velocity.y += FALL_ACC * this.game.clockTick;
        //     this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        //     this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
        //     this.updateBB();

        //     var that = this;
        //     this.game.entities.forEach(function (entity) {
        //         if (entity.BB && that.BB.collide(entity.BB)) {
        //             if (entity instanceof Mario) {

        //             } else if ((entity instanceof Ground || entity instanceof Brick || entity instanceof Block || entity instanceof Tube)
        //                 && (that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE) <= entity.BB.top) {
        //                 that.y = entity.BB.top - PARAMS.BLOCKWIDTH * (1 + 7 / 16);
        //                 that.velocity.y = 0;
        //                 that.updateBB();
        //             } else if (entity !== that) {
        //                 that.velocity.x = -that.velocity.x;
        //                 that.facing = (that.facing + 1) % 2;
        //             }
        //         };
        //     });
        // }
    }
    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "LightGreen";
        ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, PARAMS.SCALE, PARAMS.SCALE * 1.5);
    }
    draw(ctx) {
        if (this.dead) {
            if(this.flickerFlag){
                // ctx.drawImage(this.spritesheet,
                //     52, 5, 
                //     16, 16,
                //     this.x - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH * 3 / 4,
                //     PARAMS.BLOCKWIDTH,
                //     PARAMS.BLOCKWIDTH / 4);
                ctx.drawImage(new Animator(this.spritesheet, 10, 4, 27, 24, 6, 0.15, 3, false, false));
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }
    }
}