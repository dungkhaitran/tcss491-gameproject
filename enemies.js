// 
const FALL_ACC = 1800;

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
        this.x += - PARAMS.BITWIDTH/50;
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

class Enemy1 extends Enemies {
    constructor(game, x, y) {
        super();
        Object.assign(this, { game, x, y });

        this.velocity = { x: -PARAMS.BITWIDTH + 1, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/enemy1.png");
        
        // this.animations = [];

        // facing left
        // this.animations.push(new Animator(this.spritesheet, 480, 150, 55, 42, 7, 0.15, 9, false, true)); // idle
        // this.animations.push(new Animator(this.spritesheet, 542, 280, 55, 42, 6, 0.15, 9, false, true));  // walk
        // this.animations.push(new Animator(this.spritesheet, 480, 22, 55, 42, 7, 0.15, 9, false, true));  // attack
        // this.animations.push(new Animator(this.spritesheet, 736, 85, 55, 42, 3, 0.2, 9, false, true));  // hit
        // this.animations.push(new Animator(this.spritesheet, 608, 214, 55, 42, 5, 0.15, 9, false, true)); // jump
        
        // facing right
        // this.animations.push(new Animator(this.spritesheet, 0, 150, 55, 42, 7, 0.15, 9, false, true)); // idle
        // this.animations.push(new Animator(this.spritesheet, 0, 280, 55, 42, 6, 0.15, 9, false, true));  // walk
        // this.animations.push(new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true));  // attack
        // this.animations.push(new Animator(this.spritesheet, 0, 85, 55, 42, 3, 0.2, 9, false, true));  // hit
        // this.animations.push(new Animator(this.spritesheet, 0, 214, 55, 42, 5, 0.15, 9, false, true)); // jump


        // this.animation = new Animator(this.spritesheet, 0, 150, 55, 42, 7, 0.15, 9, false, true); // idle
        this.animation = new Animator(this.spritesheet, 542, 280, 55, 42, 6, 0.15, 9, false, true);  // walk
        // this.animations.push(new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true);  // attack
        // this.animations.push(new Animator(this.spritesheet, 0, 85, 55, 42, 3, 0.2, 9, false, true);  // hit
        // this.animations.push(new Animator(this.spritesheet, 0, 214, 55, 42, 5, 0.15, 9, false, true); // jump

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;
        this.width = PARAMS.BLOCKWIDTH;
        this.state = STATE.MOVING;
        // if (this.size === 0 || this.size === 3) {
            this.height = PARAMS.BLOCKWIDTH * 2;
            this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        // }
        // else {
        //     this.height = PARAMS.BLOCKWIDTH * 2;
        //     this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        // }

        this.updateBB();
    }
    update() {
        if (this.state == STATE.MOVING) {
            this.velocity.x = -PARAMS.BITWIDTH/50;
        }
        if(this.dead){
            this.deadCounter += this.game.clockTick;
            if(this.deadCounter > 0.5) this.removeFromWorld = true;
        }
        // if(this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH){
        //     this.paused = false;
        // }
        if(!this.dead && !this.paused){
            this.velocity.y += FALL_ACC * this.game.clockTick;
            this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
            this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;

            var that = this;
            this.game.entities.forEach(function (entity){
                if(entity.BB && that.BB.collide(entity.BB)){
                    if(that.collideMain(entity)){
                        that.velocity.x = 0;
                        that.velocity.y = 0;
                        that.animation = new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true);
                    }
                }
            });
        }
        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        // if (this.size === 0 || this.size === 3) {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        // }
        // else {
        //     this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        // }
    };

    collideMain(entity){
        return (entity instanceof MainCharacter ? true : false);
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

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Enemy2 extends Enemies {
    constructor(game, x, y) {
        super();
        Object.assign(this, { game, x, y });

        this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/enemy2.png");
        
        // this.animations = [];

        // facing left
        // this.animations.push(new Animator(this.spritesheet, 480, 150, 55, 42, 7, 0.15, 9, false, true)); // idle
        // this.animations.push(new Animator(this.spritesheet, 2093, 1608, 60, 54, 8, 0.15, 190, false, true));  // run
        // this.animations.push(new Animator(this.spritesheet, 480, 22, 55, 42, 7, 0.15, 9, false, true));  // attack
        // this.animations.push(new Animator(this.spritesheet, 736, 85, 55, 42, 3, 0.2, 9, false, true));  // hit
        // this.animations.push(new Animator(this.spritesheet, 608, 214, 55, 42, 5, 0.15, 9, false, true)); // jump
        
        // facing right
        // this.animations.push(new Animator(this.spritesheet, 0, 150, 55, 42, 7, 0.15, 9, false, true)); // idle
        // this.animations.push(new Animator(this.spritesheet, 0, 280, 55, 42, 6, 0.15, 9, false, true));  // run
        // this.animations.push(new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true));  // attack
        // this.animations.push(new Animator(this.spritesheet, 0, 85, 55, 42, 3, 0.2, 9, false, true));  // hit
        // this.animations.push(new Animator(this.spritesheet, 0, 214, 55, 42, 5, 0.15, 9, false, true)); // jump

        // testing
        this.animation = new Animator(this.spritesheet, 107, 1074, 60, 94, 8, 0.15, 190, false, true); // idle
        // this.animation = new Animator(this.spritesheet, 93, 1608, 60, 54, 8, 0.15, 190, false, true);  // run
        // this.animations.push(new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true);  // attack
        // this.animations.push(new Animator(this.spritesheet, 0, 85, 55, 42, 3, 0.2, 9, false, true);  // hit
        // this.animations.push(new Animator(this.spritesheet, 0, 214, 55, 42, 5, 0.15, 9, false, true); // jump
        
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

    }
    update() {
        if(this.dead){
            this.deadCounter += this.game.clockTick;
            if(this.deadCounter > 0.5) this.removeFromWorld = true;
        }
        // if(this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH){
        //     this.paused = false;
        // }
        if(!this.dead && !this.paused){
            this.velocity.y += FALL_ACC * this.game.clockTick;
            this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
            this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;

            var that = this;
            this.game.entities.forEach(function (entity){
                if(entity.BB && that.BB.collide(entity.BB)){
                    if(that.collideMain(entity)){
                        that.velocity.x = 0;
                        that.velocity.y = 0;
                        that.animation = new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true);
                    }
                }
            });
        }
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