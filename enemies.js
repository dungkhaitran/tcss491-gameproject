// Superclass for the melee range enemies
class MeleeRangeEnemies {
    constructor(game, x, y){
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        // this.velocity = { x: -PARAMS.BITWIDTH, y: 0}; // 16 pixels per second
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

        this.hp = 100;
        this.maxHp = this.hp;
        this.meleeDamage = 0;

        this.MELEE_ATTACK_DURATION = 0;
        this.MELEE_ATTACK_COOLDOWN = 0;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.canAttackMelee = true;
        this.attacking = false;
        this.meleeAttackRangeWidth = 0;

        this.gotDamaged = false;
        this.gotDamaged2 = false;
        
        this.dealDamage = false;

        this.healthBar = new HealthBar(this, game);
    }

    update(){

        const TICK = this.game.clockTick;

        if (this.dead){
            this.state = STATE.DEAD;
            this.deadCounter += this.game.clockTick;
            if(this.deadCounter > 2.5) this.removeFromWorld = true;
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

        if(this.hp <= 0){
            this.dead = true;
        }

    }

    drawMinimap(ctx, mmX, mmY){

    }
    draw(ctx) {
        
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

class BirdMan extends MeleeRangeEnemies {
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

        this.hp = 500;
        this.maxHp = this.hp;
        this.meleeDamage = 100;

        this.MELEE_ATTACK_DURATION = 1;
        this.MELEE_ATTACK_COOLDOWN = 3;

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

        //facing left
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 465, 150, 55, 42, 7, 0.15, 9, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 527, 280, 55, 42, 6, 0.15, 9, true, true);  // walk
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 465, 22, 56, 42, 7, 0.15, 9, true, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 721, 85, 56, 42, 3, 0.2, 9, true, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 593, 214, 56, 42, 5, 0.15, 9, true, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 721, 85, 56, 42, 3, 0.2, 9, true, false);  // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 150, 55, 42, 7, 0.15, 9, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 280, 55, 42, 6, 0.15, 9, false, true);  // walk
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 22, 56, 42, 7, 0.15, 9, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 85, 56, 42, 3, 0.2, 9, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 214, 56, 42, 5, 0.15, 9, false, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 85, 56, 42, 3, 0.2, 9, false, false);  // dead

    }

    update() {
        super.update();

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x + 10, this.y, this.width * 1.5, this.height); // body
            this.BBMeleeAttackRange = new BoundingBox(this.BB.x + this.meleeAttackRangeWidth - 30, this.y,
                this.meleeAttackRangeWidth, this.height); // attack range
        } else {
            this.BB = new BoundingBox(this.x + this.width + 15, this.y, this.width * 1.5, this.height); // body
            this.BBMeleeAttackRange = new BoundingBox(this.BB.x - this.meleeAttackRangeWidth, this.y,
                this.meleeAttackRangeWidth, this.height); // attack range
        }
    };

    drawMinimap(ctx, mmX, mmY){

    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        super.draw(ctx);
    }
}



// Superclass for the far range enemies
class FarRangeEnemies {
    constructor(game, x, y){
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        // this.velocity = { x: -PARAMS.BITWIDTH, y: 0}; // 16 pixels per second
        this.spritesheet;

        this.animation;
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;

        this.width = 0;
        this.height = 0;

        this.state = STATE.IDLE;

        this.hp = 100;
        this.maxHp = this.hp;
        this.farDamage = 0;

        this.FAR_ATTACK_DURATION = 0;
        this.FAR_ATTACK_COOLDOWN = 0;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.attacking = false;
        this.farAttackRangeWidth = 0;

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.BBFarAttackRange = new BoundingBox(this.x + this.width, this.y, this.farAttackRangeWidth, PARAMS.CANVAS_WIDTH);

        this.gotDamaged = false;
        this.gotDamaged2 = false;
        
        this.dealDamage = false;

        this.healthBar = new HealthBar(this, game);
    }

    update(){

        const TICK = this.game.clockTick;

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

    drawMinimap(ctx, mmX, mmY){

    }
    draw(ctx) {
        
        this.healthBar.draw(ctx);

        this.drawDebug(ctx);
    }

    drawDebug(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BBFarAttackRange.x - this.game.camera.x, this.BBFarAttackRange.y,
                this.BBFarAttackRange.width, this.BBFarAttackRange.height);
        }
    }
}

class DarkMage extends FarRangeEnemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
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

        this.hp = 300;
        this.maxHp = this.hp;
        this.farDamage = 100;

        this.FAR_ATTACK_DURATION = 0.5;
        this.FAR_ATTACK_COOLDOWN = 3.5;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.farAttackRangeWidth = 650;

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
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2085, 1067, 60, 100, 8, 0.15, 190, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2085, 1570, 60, 100, 8, 0.15, 190, true, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2065, 60, 75, 100, 5, 0.15, 175, true, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3355, 1835, 60, 100, 3, 0.15, 190, true, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3600, 1335, 60, 100, 2, 0.15, 190, true, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2286, 570, 106, 97, 7, 0.15, 143, true, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1067, 60, 100, 8, 0.15, 190, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1570, 60, 100, 8, 0.15, 190, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 870, 60, 75, 100, 5, 0.15, 175, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1835, 60, 100, 3, 0.15, 190, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 95, 1335, 60, 100, 2, 0.15, 190, false, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 570, 106, 97, 7, 0.15, 143, false, false); // dead

    }
    update() {
        if (super.update()) {
            var bullet = null

            if (this.facing === FACING_SIDE.RIGHT) {
                bullet = new BulletOfDarkMage(this.game, this.BB.x + this.BB.width, this.BB.y + (this.BB.height - 48) / 1.5)
                bullet.velocity.x = bullet.velocityX
            } else {
                bullet = new BulletOfDarkMage(this.game, this.BB.x - this.BB.width,  this.BB.y + (this.BB.height - 48) / 1.5)
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
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.width * 3 - this.game.camera.x, this.y, 2.5);
        }else{
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        }
        super.draw(ctx);
    }
}

class FlyingDemon extends FarRangeEnemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/flying-demon.png");
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

        this.hp = 700;
        this.maxHp = this.hp;
        this.farDamage = 200;

        this.FAR_ATTACK_DURATION = 0.8;
        this.FAR_ATTACK_COOLDOWN = 3.5;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.farAttackRangeWidth = 300;

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
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1532, 182, 157, 120, 6, 0.3, 5, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1532, 182, 157, 120, 6, 0.3, 5, true, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1576, 15, 142, 153, 8, 0.1, 48, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3355, 1835, 60, 100, 3, 0.15, 190, true, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1728, 57, 157, 153, 5, 0.15, 35, false, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 570, 182, 157, 120, 6, 0.3, 5, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 570, 182, 157, 120, 6, 0.3, 5, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 35, 15, 142, 153, 8, 0.1, 48, true, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1835, 60, 100, 3, 0.15, 190, false, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 385, 57, 157, 153, 5, 0.15, 35, true, false); // dead

    }
    update() {
        if (super.update()) {
            var bullet = null

            if (this.facing === FACING_SIDE.RIGHT) {
                bullet = new BulletOfFlyingDemon(this.game, this.BB.x, this.BB.y + this.BB.height / 2)
                
            } else {
                bullet = new BulletOfFlyingDemon(this.game, this.BB.x - this.BB.width,  this.BB.y + (this.BB.height - 48) / 2)
                
            }
            bullet.facing = this.facing
            bullet.farDamage = this.farDamage;
            this.game.addEntity(bullet)
        }

        

        this.x += this.velocity.x;
        this.updateBB();
    }

    updateBB() {
        if(this.facing === FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x + this.width * 3.5, this.y + this.height - 10, this.width * 3, this.height * 2); // body
            this.BBFarAttackRange = new BoundingBox(this.BB.x, this.BB.y,
                this.farAttackRangeWidth * 1.5, this.BB.height * 3);
        } else {
            this.BB = new BoundingBox(this.x + this.width * 2, this.y + this.height - 10, this.width * 3, this.height * 2);
            this.BBFarAttackRange = new BoundingBox(this.BB.x + this.BB.width - this.farAttackRangeWidth * 1.5, this.BB.y,
                this.farAttackRangeWidth * 1.5, this.BB.height * 3);
        }
    
    };

    drawMinimap(ctx, mmX, mmY){

    }
    
    draw(ctx) {
        if(this.state === STATE.DEAD && this.facing === FACING_SIDE.LEFT){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.width * 3 - this.game.camera.x, this.y, 2.5);
        }else{
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        }
        super.draw(ctx);
    }
}



class Knight extends MeleeRangeEnemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/flying-demon.png");
        
        this.state = STATE.MOVING;
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
        this.farDamage = 80;

        this.FAR_ATTACK_DURATION = 1;
        this.FAR_ATTACK_COOLDOWN = 2.5;

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
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1532, 172, 157, 170, 6, 0.3, 5, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1532, 172, 157, 170, 6, 0.3, 5, true, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1540, 15, 157, 170, 8, 0.12, 40, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2139, 15, 147, 155, 3, 0.15, 53,  true, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2139, 15, 147, 155, 3, 0.15, 53,  true, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 570, 182, 157, 120, 6, 0.3, 5, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 570, 182, 157, 120, 6, 0.3, 5, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 20, 15, 157, 170, 8, 0.1, 40, true, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 412, 15, 147, 155, 3, 0.15, 53, false, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 412, 15, 147, 155, 3, 0.15, 53,  false, false); // dead

    }
    update() {
        if (super.update()) {
            var bullet = null

            if (this.facing === FACING_SIDE.RIGHT) {
                bullet = new BulletOfFlyingDemon(this.game, this.BB.x + this.BB.width, this.BB.y + (this.BB.height - 48) / 2)
            } else {
                bullet = new BulletOfFlyingDemon(this.game, this.BB.x - this.BB.width,  this.BB.y + (this.BB.height - 48) / 2)
               

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
            this.BB = new BoundingBox(this.x + this.width + 50, this.y + this.height - 10, this.width * 3, this.height * 2); // body
            this.BBFarAttackRange = new BoundingBox(this.BB.x + this.width, this.BB.y + this.BB.width, 
                this.farAttackRangeWidth, PARAMS.CANVAS_WIDTH); // range attack
        } else {
            this.BB = new BoundingBox(this.x + this.width, this.y + this.height - 10, this.width * 3, this.height * 2);
            this.BBFarAttackRange = new BoundingBox(this.BB.x - this.farAttackRangeWidth, this.y,
                this.farAttackRangeWidth, PARAMS.CANVAS_WIDTH);
        }
    };

    drawMinimap(ctx, mmX, mmY){

    }
    
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);    

        super.draw(ctx);
    }
}

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
        
        this.drawDebug(ctx);
    }

    drawDebug(ctx) {
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
