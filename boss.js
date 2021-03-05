class Boss {
    constructor(game, x, y){
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        // this.velocity = { x: -PARAMS.BITWIDTH, y: 0}; // 16 pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss.png");

        this.facing = FACING_SIDE.LEFT;

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 48;
        this.height = 96;

        this.animations = [];        
        this.loadAnimations();

        this.hp = 10000;
        this.maxHp = this.hp;
        this.farDamage = 500;

        this.FAR_ATTACK_DURATION = 1;
        this.FAR_ATTACK_COOLDOWN = 3.5;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.farAttackRangeWidth = 600;

        this.beingDamaged = false;

        this.updateBB();

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.BBFarAttackRange = new BoundingBox(this.x + this.width, this.y, this.farAttackRangeWidth, PARAMS.CANVAS_WIDTH);

        this.gotDamaged = false;
        this.gotDamaged2 = false;
        
        this.dealDamage = false;

        this.healthBar = new HealthBar(this, game);
    }

    loadAnimations() {
        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            for(var j = 0; j < FACING_SIDE.COUNT; j++){
                this.animations[i].push([]);
            }
        }

        // facing left
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1300, 1355, 85, 122, 3, 0.2, 173, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 529, 582, 86, 122, 6, 0.15, 173, true, true);  // run

        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 235, 1567, 108, 160, 7, 0.15, 106, true, true);  // melee
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 728, 1850, 135, 133, 5, 0.15, 106, true, true);  // fire
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 760, 2119, 142, 122, 5, 0.15, 106, true, true);  // ice
        // this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 775, 295, 108, 152, 5, 0.15, 148, true, true);  // thunder

        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1548, 1100, 103, 116, 2, 0.1, 152, true, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 155, 74, 160, 119, 6, 0.15, 164, true, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2000, 1355, 85, 122, 3, 0.2, 173, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2000, 582, 86, 122, 6, 0.15, 173, false, true);  // run

        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2005, 1567, 108, 160, 7, 0.15, 106, false, true);  // melee
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2003, 1850, 135, 133, 5, 0.15, 106, false, true);  // fire
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1990, 2119, 142, 122, 5, 0.15, 106, false, true);  // ice
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2000, 295, 108, 152, 5, 0.15, 148, false, true);  // thunder

        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1994, 1100, 103, 116, 2, 0.1, 152, false, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2028, 74, 160, 119, 6, 0.15, 164, false, false); // dead

    }

    update(){

        const TICK = this.game.clockTick;

        // var bullet = null
            
        // if (this.facing === FACING_SIDE.RIGHT) {
        //     bullet = new FireOfCultist(this.game, this.BB.x + this.BB.width, this.BB.y + (this.BB.height - 48) / 3)
        //     bullet.velocity.x = bullet.velocityX
        // } else {
        //     bullet = new FireOfCultist(this.game, this.BB.x - this.BB.width, this.BB.y + (this.BB.height - 48) / 3)
        //     bullet.velocity.x = -bullet.velocityX
        // }
        // bullet.facing = this.facing;
        // bullet.farDamage = this.farDamage;
        // setTimeout(() => {this.game.addEntity(bullet);}, 600);

        // this.updateBB();

        if (this.dead){
            this.state = STATE.DEAD;
            this.deadCounter += this.game.clockTick;
            if(this.deadCounter > 2.5) this.removeFromWorld = true;
        }

        if (this.farAttackCooldown > 0) {
            this.farAttackCooldown -= TICK;
            if (this.farAttackCooldown <= 0) {
                this.canAttackFar = true;
            }
        }
    
        var createBullet = false
        if (this.attacking) {
            if (this.farAttackDuration > 0) {
                this.farAttackDuration -= TICK;
                if (this.farAttackDuration <= 0) {
                    this.state = STATE.IDLE;
                    this.attacking = false;
                    this.dealDamage = false;
                }
            }
            if (this.farAttackDuration <= 0 && this.farAttackCooldown <= 0) {
                this.canAttackFar = false;
                this.state = STATE.ATTACKING;
                this.farAttackDuration = this.FAR_ATTACK_DURATION;
                this.farAttackCooldown = this.FAR_ATTACK_COOLDOWN;
                createBullet = true
            }
        }

        if(this.hp <= 0){
            this.dead = true;
        }

        return createBullet
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x + 10, this.y + 10, this.width * 1.5, this.height + 10); // body
            this.BBFarAttackRange = new BoundingBox(this.BB.x, this.BB.y, 
                this.farAttackRangeWidth, this.BB.height); // range attack
        } else {
            this.BB = new BoundingBox(this.x + 30, this.y + 15, this.width * 1.5, this.height + 10);
            this.BBFarAttackRange = new BoundingBox(this.BB.x - this.farAttackRangeWidth, this.BB.y,
                this.farAttackRangeWidth, this.BB.height);
        }
    };

    draw(ctx) {
        
        this.healthBar.draw(ctx);
        //this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BBFarAttackRange.x - this.game.camera.x, this.BBFarAttackRange.y,
                this.BBFarAttackRange.width, this.BBFarAttackRange.height);
        }
    }
}