// Superclass for the running enemies
class RunningEnemies {
    constructor(game, x, y){
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 2.5;
        this.velocity = { x: -this.velocityX, y: 0 };
        this.spritesheet = null;
        this.facing = FACING_SIDE.LEFT

        this.paused = true;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 0;
        this.height = 0;

        this.state = STATE.MOVING;

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.hp = 100;
        this.maxHp = this.hp;
        this.damage = 0;
        
        this.dealDamage = false;
    }

    update(){

        const TICK = this.game.clockTick;

    }

    drawMinimap(ctx, mmX, mmY){

    }
    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class NightmareHorse extends RunningEnemies {
    constructor(game, x, y, facing) {
        super(game, x, y);
        Object.assign(this, { game, x, y, facing });

        this.velocityX = PARAMS.BITWIDTH / 2.5;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/nightmare-horse.png");
        // this.state = STATE.MOVING;
        // this.facing = FACING_SIDE.LEFT;

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 48;
        this.height = 96;

        this.animations = [];        
        this.loadAnimations();

        this.damage = 300;
        this.dealDamage = false

        this.updateBB();
    }

    loadAnimations() {
        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            for(var j = 0; j < FACING_SIDE.COUNT; j++){
                this.animations[i].push([]);
            }
        }

        // facing left
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 526, 110, 94, 81, 4, 0.15, 35, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 590, 18, 110, 77, 4, 0.15, 35, false, true);  // run
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 19, 110, 94, 81, 4, 0.15, 35, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 23, 18, 110, 77, 4, 0.15, 35, false, true);  // run

    }
    update() {

        this.x += this.velocity.x;

        if (this.facing == FACING_SIDE.RIGHT) {
            if (this.x > MAX_WIDTH) {
                this.removeFromWorld = true
            }
        } else {
            if (this.x < -this.width) {
                this.removeFromWorld = true
            }
        }

        this.updateBB();
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x, this.y + 10, this.width * 3, this.height * 1.5);
        } else {
            this.BB = new BoundingBox(this.x, this.y + 10, this.width * 3, this.height * 1.5);

        }
    };

    drawMinimap(ctx, mmX, mmY){

    }
    
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);    

        super.draw(ctx);
    }
}
