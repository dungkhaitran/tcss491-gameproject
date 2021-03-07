class Boss extends RangeEnemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 5;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss.png");
        // this.state = STATE.MOVING;
        this.facing = FACING_SIDE.LEFT;

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 96;
        this.height = 96;

        this.animations = [];        
        this.loadAnimations();

        this.hp = 1000;
        this.maxHp = this.hp;
        this.farDamage = 500;

        this.FAR_ATTACK_DURATION = 1;
        this.FAR_ATTACK_COOLDOWN = 3.5;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.farAttackRangeWidth = 300;

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
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1255, 1310, 145, 160, 3, 0.2, 110, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 500, 540, 145, 160, 6, 0.15, 110, true, true);  // run

        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 170, 1567, 210, 160, 7, 0.15, 45, true, true);  // melee
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 728, 1850, 135, 133, 5, 0.15, 106, true, true);  // fire
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 760, 2119, 142, 122, 5, 0.15, 106, true, true);  // ice
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 775, 295, 108, 152, 5, 0.15, 148, true, true);  // thunder

        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1500, 1050, 145, 160, 2, 0.1, 152, true, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 140, 30, 200, 160, 6, 0.15, 120, true, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2005, 1310, 145, 160, 3, 0.2, 110, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2000, 540, 145, 160, 6, 0.15, 110, false, true);  // run

        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1990, 1567, 210, 160, 7, 0.15, 45, false, true);  // melee
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2003, 1850, 135, 133, 5, 0.15, 106, false, true);  // fire
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1990, 2119, 142, 122, 5, 0.15, 106, false, true);  // ice
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2000, 295, 108, 152, 5, 0.15, 148, false, true);  // thunder

        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1950, 1050, 145, 160, 2, 0.1, 152, false, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1980, 30, 200, 160, 6, 0.15, 120, false, false); // dead

    }

    update() {
        if (super.update()) {
            var bullet = null

            if (this.facing === FACING_SIDE.RIGHT) {
                bullet = new FireOfCultist(this.game, this.BB.x + this.BB.width, this.BB.y + (this.BB.height - 48) / 1.5)
                bullet.velocity.x = bullet.velocityX
            } else {
                bullet = new FireOfCultist(this.game, this.BB.x - this.BB.width,  this.BB.y + (this.BB.height - 48) / 1.5)
                bullet.velocity.x = -bullet.velocityX
            }
            bullet.facing = this.facing
            bullet.farDamage = this.farDamage;
            this.game.addEntity(bullet)
        }

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x, this.y + this.height + 10, this.width * 2, this.height * 1.5); // body
            this.BBFarAttackRange = new BoundingBox(this.BB.x + this.width*2, this.BB.y, 
                this.farAttackRangeWidth, this.BB.height); // range attack
        } else {
            this.BB = new BoundingBox(this.x + this.width, this.y + this.height + 10, this.width * 2, this.height * 1.5);
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