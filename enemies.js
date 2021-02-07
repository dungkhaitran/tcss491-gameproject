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

        this.velocityX = PARAMS.BITWIDTH / 50;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/bat.png");
        //this.animation = [];
        this.animation = new Animator(this.spritesheet, 10, 36, 27, 26, 6, 0.15, 20, false, true); // flying left
        
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.meleeAttackRangeWidth = 70;
        this.width = 48;
        this.height = 96;
        this.updateBB();
    }
    update() {
        // this.x += - PARAMS.BITWIDTH/50;

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        // this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        // this.lastBBMeleeAttackRange = this.BBMeleeAttackRange;
        if (this.facing == FACING_SIDE.RIGHT) {
            this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, this.meleeAttackRangeWidth, this.height);
        } else {
            this.BBMeleeAttackRange = new BoundingBox(this.x - this.meleeAttackRangeWidth, this.y + this.meleeAttackRangeWidth,
                this.meleeAttackRangeWidth, this.height);
        }
    };

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
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x - this.game.camera.x, this.BBMeleeAttackRange.y,
                 this.BBMeleeAttackRange.width, this.BBMeleeAttackRange.height);
        }
    }
}

class Enemy1 extends Enemies {
    constructor(game, x, y) {
        super();
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 50;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
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
        this.state = STATE.MOVING;

        this.meleeAttackRangeWidth = 70;
        this.width = 48;
        this.height = 96;
        this.updateBB();
    }
    update() {
        // if (this.state == STATE.MOVING) {
        //     this.velocity.x = -PARAMS.BITWIDTH/50;
        // }
        // if(this.dead){
        //     this.deadCounter += this.game.clockTick;
        //     if(this.deadCounter > 0.5) this.removeFromWorld = true;
        // }
        // if(this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH){
        //     this.paused = false;
        // }
        // if(!this.dead && !this.paused){
        //     this.velocity.y += FALL_ACC * this.game.clockTick;
        //     this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        //     this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;

        //     var that = this;
        //     this.game.entities.forEach(function (entity){
        //         if(entity.BB && that.BB.collide(entity.BB)){
        //             if(that.collideMain(entity)){
        //                 that.velocity.x = 0;
        //                 that.velocity.y = 0;
        //                 that.animation = new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true);
        //             }
        //         }
        //     });
        // }

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        // this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        // this.lastBBMeleeAttackRange = this.BBMeleeAttackRange;
        if (this.facing == FACING_SIDE.RIGHT) {
            this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, this.meleeAttackRangeWidth, this.height);
        } else {
            this.BBMeleeAttackRange = new BoundingBox(this.x - this.meleeAttackRangeWidth, this.y,
                this.meleeAttackRangeWidth, this.height);
        }
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
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x - this.game.camera.x, this.BBMeleeAttackRange.y,
                 this.BBMeleeAttackRange.width, this.BBMeleeAttackRange.height);
        }
    }
}

class Enemy2 extends Enemies {
    constructor(game, x, y) {
        super();
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 50;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
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

        this.meleeAttackRangeWidth = 70;
        this.width = 48;
        this.height = 96;
        this.updateBB();
    }
    update() {
        // if(this.dead){
        //     this.deadCounter += this.game.clockTick;
        //     if(this.deadCounter > 0.5) this.removeFromWorld = true;
        // }
        // if(this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH){
        //     this.paused = false;
        // }
        // if(!this.dead && !this.paused){
        //     this.velocity.y += FALL_ACC * this.game.clockTick;
        //     this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        //     this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;

        //     this.updateBB();

        //     var that = this;
        //     this.game.entities.forEach(function (entity){
        //         if(entity.BB && that.BB.collide(entity.BB)){
        //             if(that.collideMain(entity)){
        //                 that.velocity.x = 0;
        //                 that.velocity.y = 0;
        //                 that.animation = new Animator(this.spritesheet, 0, 22, 55, 42, 7, 0.15, 9, false, true);
        //             }
        //         }
        //     });
        // }

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        // this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        // this.lastBBMeleeAttackRange = this.BBMeleeAttackRange;
        if (this.facing == FACING_SIDE.RIGHT) {
            this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, this.meleeAttackRangeWidth, this.height);
        } else {
            this.BBMeleeAttackRange = new BoundingBox(this.x - this.meleeAttackRangeWidth, this.y,
                this.meleeAttackRangeWidth, this.height);
        }
    };

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
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x - this.game.camera.x, this.BBMeleeAttackRange.y,
                 this.BBMeleeAttackRange.width, this.BBMeleeAttackRange.height);
        }
    }
}