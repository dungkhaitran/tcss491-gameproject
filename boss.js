class Boss extends RangeEnemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 5;
        this.velocityY = PARAMS.BITWIDTH / 50;

        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss.png");
        // this.state = STATE.MOVING;
        this.facing = FACING_SIDE.LEFT;

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 110;
        this.height = 210;

        this.animations = [];        
        this.loadAnimations();

        this.hp = 10000;
        this.maxHp = this.hp;
        this.farDamage = 100;

        this.FAR_ATTACK_DURATION = 1;
        this.FAR_ATTACK_COOLDOWN = 1.5;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.farAttackRangeWidth = 550;

        this.beingDamaged = false;

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
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1245, 1310, 145, 160, 3, 0.2, 110, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 500, 540, 145, 160, 6, 0.15, 110, true, true);  // run

        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 170, 1567, 210, 160, 7, 0.15, 45, true, true);  // melee
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 728, 1850, 135, 133, 5, 0.15, 106, true, true);  // fire
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 760, 2119, 142, 122, 5, 0.15, 106, true, true);  // ice
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 720, 285, 165, 160, 5, 0.15, 91, true, true);  // thunder

        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1500, 1050, 145, 160, 2, 0.1, 152, true, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 140, 30, 200, 160, 6, 0.15, 120, true, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2005, 1310, 145, 160, 3, 0.2, 110, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2000, 540, 145, 160, 6, 0.15, 110, false, true);  // run

        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1990, 1567, 210, 160, 7, 0.15, 45, false, true);  // melee
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2003, 1850, 135, 133, 5, 0.15, 106, false, true);  // fire
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1990, 2119, 142, 122, 5, 0.15, 106, false, true);  // ice
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2005, 285, 165, 160, 5, 0.15, 91, false, true);  // thunder

        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1950, 1050, 145, 160, 2, 0.1, 152, false, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1980, 30, 200, 160, 6, 0.15, 120, false, false); // dead

    }

    randomX() {
        if (this.facing === FACING_SIDE.RIGHT) {
            return this.x + Math.floor(Math.random() * (PARAMS.CANVAS_WIDTH + this.game.camera.x - this.x))
        } else {
            return this.game.camera.x + Math.floor(Math.random() * (this.x - this.game.camera.x))
        }
    }

    update() {
        if (super.update()) {
            var bullet = null
            var bullet2 = null
            var bullet3 = null
            var bullet4 = null

            var y = this.BB.y - 100 - Math.floor(Math.random() * 10)
            if (this.facing === FACING_SIDE.RIGHT) {
                bullet = new TeslaBall(this.game, this.randomX(), y)
                bullet2 = new TeslaBall(this.game, this.randomX(), y)
                bullet3 = new BossThunder(this.game, this.randomX(), y)
                bullet4 = new BossThunder(this.game, this.randomX(), y)
            } else {
                bullet = new TeslaBall(this.game, this.randomX(), y)
                bullet2 = new TeslaBall(this.game, this.randomX(), y)
                bullet3 = new BossThunder(this.game, this.randomX(), y)
                bullet4 = new BossThunder(this.game, this.randomX(), y)
            }
            
            bullet.facing = this.facing
            bullet2.facing = this.facing
            this.game.addEntity(bullet)
            setTimeout(() => {this.game.addEntity(bullet2);}, 200);
            setTimeout(() => {this.game.addEntity(bullet3);}, 100);
            setTimeout(() => {this.game.addEntity(bullet4);}, 400);
        }

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x, this.y + 100, this.width, this.height); // body
            this.BBFarAttackRange = new BoundingBox(this.BB.x + this.width, this.BB.y, 
                this.farAttackRangeWidth, this.BB.height); // range attack
        } else {
            this.BB = new BoundingBox(this.x + 150, this.y + 100, this.width, this.height);
            this.BBFarAttackRange = new BoundingBox(this.BB.x - this.farAttackRangeWidth, this.BB.y,
                this.farAttackRangeWidth, this.BB.height);
        }
    };

    drawMinimap(ctx, mmX, mmY){

    }
    
    draw(ctx) {
        if(this.state === STATE.DEAD && this.facing === FACING_SIDE.LEFT){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        }else{
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        }
        super.draw(ctx);
    }
}
