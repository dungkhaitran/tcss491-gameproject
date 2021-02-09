
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

        this.width = 0;
        this.height = 0;
        this.meleeAttackRangeWidth = 0;

        this.state = STATE.IDLE;

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, this.meleeAttackRangeWidth, this.height);

        this.hp = 0;
        this.maxHp = 0;
        this.meleeDamage = 0;

        this.MELEE_ATTACK_DURATION = 0;
        this.MELEE_ATTACK_COOLDOWN = 0;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.canAttackMelee = true;
        this.attacking = false;
        this.meleeAttackRangeWidth = 0;

        this.gotDamaged = false;
        
        this.dealDamage = false;

        this.healthBar = new HealthBar(this, game);
    }

    update(){

        const TICK = this.game.clockTick;

        if (this.dead){
            this.removeFromWorld = true;
            // this.deadCounter += this.game.clockTick;
            // if(this.deadCounter > 0.5) this.removeFromWorld = true;
        }

        if (this.meleeAttackCooldown > 0) {
            this.meleeAttackCooldown -= TICK;
            if (this.meleeAttackCooldown <= 0) {
                this.canAttackMelee = true;
            }
        }
    
        if (this.attacking) {
            if (this.meleeAttackDuration > 0) {
                this.meleeAttackDuration -= TICK;
                if (this.meleeAttackDuration <= 0) {
                    this.state = STATE.IDLE;
                    this.attacking = false;
                    this.dealDamage = false;
                }
            }
            if (this.meleeAttackDuration <= 0 && this.meleeAttackCooldown <= 0) {
                this.canAttackMelee = false;
                this.state = STATE.ATTACKING;
                this.meleeAttackDuration = this.MELEE_ATTACK_DURATION;
                this.meleeAttackCooldown = this.MELEE_ATTACK_COOLDOWN;
            }
        }
    }

    drawMinimap(ctx, mmX, mmY){

    }
    draw(ctx) {
        // if (this.dead) {
        //     if(this.flickerFlag){
        //         ctx.drawImage();
        //     }
        //     this.flickerFlag = !this.flickerFlag;
        // } else {
        //     this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        // }

        this.healthBar.draw(ctx);

        this.drawDebug(ctx);
    }

    drawDebug(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x - this.game.camera.x, this.BBMeleeAttackRange.y,
                this.BBMeleeAttackRange.width, this.BBMeleeAttackRange.height);
        }
    }
}

class Bat extends Enemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 50;
        // this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/bat.png");
        // this.state = STATE.MOVING;
        this.facing = FACING_SIDE.LEFT;

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 48;
        this.height = 96;

        this.animations = [];        
        this.loadAnimations();

        this.hp = 1000;
        this.maxHp = this.hp;
        this.meleeDamage = 100;

        this.MELEE_ATTACK_DURATION = 0.25;
        this.MELEE_ATTACK_COOLDOWN = 0.3;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.canAttackMelee = true;
        this.meleeAttackRangeWidth = 70;
        // this.meleeAttackRangeHeight = 35;

        this.updateBB();
    }

    loadAnimations() {
        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            for(var j = 0; j < FACING_SIDE.COUNT; j++){
                this.animations[i].push([]);
            }
        }

        //facing left
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 298, 35, 28, 28, 6, 0.15, 20, false, true); // idle = moving
        //facing right
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 9, 35, 28, 28, 6, 0.15, 20, false, true); // idle = moving
    }

    update() {
        super.update();

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        
        if(this.facing == FACING_SIDE.RIGHT){
            this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, this.meleeAttackRangeWidth, this.height);
        } else {
            this.BBMeleeAttackRange = new BoundingBox(this.x - this.meleeAttackRangeWidth, this.y,
                this.meleeAttackRangeWidth, this.height);
        }
    };

    drawMinimap(ctx, mmX, mmY){

    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);

        super.draw(ctx);
    }
}

class BirdMan extends Enemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 20;
        // this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/birdman.png");
        // this.state = STATE.MOVING;
        this.facing = FACING_SIDE.LEFT;

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 48;
        this.height = 96;

        this.animations = [];        
        this.loadAnimations();

        this.hp = 1000;
        this.maxHp = this.hp;
        this.meleeDamage = 100;

        this.MELEE_ATTACK_DURATION = 0.25;
        this.MELEE_ATTACK_COOLDOWN = 0.3;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.canAttackMelee = true;
        this.meleeAttackRangeWidth = 60;

        this.updateBB();
    }

    loadAnimations() {

        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            for(var j = 0; j < FACING_SIDE.COUNT; j++){
                this.animations[i].push([]);
            }
        }

        //facing left
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 480, 150, 55, 42, 7, 0.15, 9, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 542, 280, 55, 42, 6, 0.15, 9, false, true);  // walk
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 480, 22, 56, 42, 7, 0.15, 9, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 736, 85, 56, 42, 3, 0.2, 9, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 608, 214, 56, 42, 5, 0.15, 9, false, true); // jump
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 150, 55, 42, 7, 0.15, 9, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 280, 55, 42, 6, 0.15, 9, false, true);  // walk
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 22, 56, 42, 7, 0.15, 9, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 85, 56, 42, 3, 0.2, 9, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 214, 56, 42, 5, 0.15, 9, false, true); // jump

    }

    update() {
        super.update();

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x + 10, this.y, this.width * 1.5, this.height); // body
            this.BBMeleeAttackRange = new BoundingBox(this.BB.x + this.BB.width, this.y,
                this.meleeAttackRangeWidth - 20, this.height); // attack range
        } else {
            this.BB = new BoundingBox(this.x + 30, this.y, this.width * 1.5, this.height); // body
            this.BBMeleeAttackRange = new BoundingBox(this.BB.x - this.BB.width + 30, this.y,
                this.meleeAttackRangeWidth - 20, this.height); // attack range
        }
    };

    drawMinimap(ctx, mmX, mmY){

    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);

        super.draw(ctx);
    }
}

class DarkMage extends Enemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        // this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/darkmage.png");
        // this.state = STATE.MOVING;
        this.facing = FACING_SIDE.LEFT;

        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 48;
        this.height = 96;

        this.animations = [];        
        this.loadAnimations();

        this.hp = 1000;
        this.maxHp = this.hp;
        this.meleeDamage = 100;

        this.MELEE_ATTACK_DURATION = 0.5;
        this.MELEE_ATTACK_COOLDOWN = 0.6;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.canAttackMelee = true;
        this.meleeAttackRangeWidth = 70;

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
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2085, 1067, 60, 100, 8, 0.15, 190, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2095, 1570, 60, 100, 8, 0.15, 190, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2070, 300, 60, 100, 8, 0.15, 190, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3355, 1835, 60, 100, 3, 0.15, 190, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3600, 1335, 60, 100, 2, 0.15, 190, false, true); // jump
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1067, 60, 100, 8, 0.15, 190, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 95, 1570, 60, 100, 8, 0.15, 190, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 110, 300, 60, 100, 8, 0.15, 190, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1835, 60, 100, 3, 0.15, 190, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 95, 1335, 60, 100, 2, 0.15, 190, false, true); // jump
    }
    update() {
        super.update();

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x + this.width / 3, this.y + this.height, this.width * 1.65, this.height); // body
            this.BBMeleeAttackRange = new BoundingBox(this.x + this.width * 2.5, this.y + this.height, 
                this.meleeAttackRangeWidth, this.height); // range attack
        } else {
            this.BB = new BoundingBox(this.x + this.width / 2, this.y + this.height, this.width * 1.75, this.height);
            this.BBMeleeAttackRange = new BoundingBox(this.x - this.meleeAttackRangeWidth, this.y + this.height,
                this.meleeAttackRangeWidth, this.height);
        }
    };

    drawMinimap(ctx, mmX, mmY){

    }
    
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);

        super.draw(ctx);
    }
}