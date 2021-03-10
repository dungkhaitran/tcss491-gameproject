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

        this.width = 96;
        this.height = 96;

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
        this.farAttackRangeWidth = 400;

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

    update() {
        if (super.update()) {
            var bullet = null
            var bullet2 = null
            var bullet3 = null
            var bullet4 = null
            var bullet5 = null


                if (this.facing === FACING_SIDE.RIGHT) {
                    bullet = new TeslaBall(this.game, this.BB.x + this.BB.width * 2, this.BB.y)
                    bullet2 = new TeslaBall(this.game, this.BB.x + this.BB.width * 2, this.BB.y)
                    bullet3 = new TeslaBall(this.game, this.BB.x + this.BB.width * 2, this.BB.y)


                } else {
                    bullet = new TeslaBall(this.game, this.BB.x - this.BB.width * Math.floor(Math.random() * 5),  this.BB.y - this.height + Math.floor(Math.random() * 10))
                    bullet2 = new TeslaBall(this.game, this.BB.x - this.BB.width * Math.floor(Math.random() * 5),  this.BB.y - this.height + Math.floor(Math.random() * 10))
                    bullet3 = new BossThunder(this.game, this.BB.x - this.BB.width * 2, this.BB.y - this.height * 1.5)
                    bullet4 = new BossThunder(this.game, this.BB.x - this.BB.width * 2, this.BB.y - this.height * 1.5)
                    bullet5 = new BossThunder(this.game, this.BB.x - this.BB.width * 2, this.BB.y - this.height * 1.5)


                }
            
            bullet.velocity.x = 0
            bullet2.velocity.x = 0
            bullet3.velocity.y += this.velocityY;


            bullet.facing = this.facing
            bullet.farDamage = this.farDamage;
            this.game.addEntity(bullet)
            setTimeout(() => {this.game.addEntity(bullet2);}, 500);
            setTimeout(() => {this.game.addEntity(bullet3);}, 0);
            setTimeout(() => {this.game.addEntity(bullet4);}, 200);
            setTimeout(() => {this.game.addEntity(bullet5);}, 500);


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
            this.BB = new BoundingBox(this.x + 100, this.y + this.height + 10, this.width * 2, this.height * 1.5);
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