// Superclass for the enemies
class Enemies {
    constructor(game, x, y){
        Object.assign(this, { game, x, y });

        this.velocity = { x: -PARAMS.BITWIDTH, y: 0}; // 16 pixels per second
        this.spritesheet;

        this.animation;
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

    }
    update(){

    }
    drawMinimap(ctx, mmX, mmY){

    }
    draw(ctx) {
        if (this.dead) {
            if(this.flickerFlag){
                ctx.drawImage();
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }
    }
}

class Bat extends Enemies {
    constructor(game, x, y) {
        super();
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
    update() {
        this.x += -PARAMS.BITWIDTH/100
        this.y += PARAMS.BITWIDTH/100
    }
    drawMinimap(ctx, mmX, mmY){

    }
    draw(ctx) {
        if (this.dead) {
            if(this.flickerFlag){
                ctx.drawImage(new Animator(this.spritesheet, 10, 4, 27, 24, 6, 0.15, 3, false, false));
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }
    }
}