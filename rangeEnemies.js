// Superclass for the far range enemies
class RangeEnemies {
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

class DarkMage extends RangeEnemies {
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

        this.hp = 500;
        this.maxHp = this.hp;
        this.farDamage = 100;

        this.FAR_ATTACK_DURATION = 0.5;
        this.FAR_ATTACK_COOLDOWN = 3.5;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.farAttackRangeWidth = 600;

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
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3355, 1817, 60, 100, 3, 0.15, 190, true, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3600, 1335, 60, 100, 2, 0.15, 190, true, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 2286, 570, 106, 97, 7, 0.15, 143, true, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1067, 60, 100, 8, 0.15, 190, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1570, 60, 100, 8, 0.15, 190, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 870, 60, 75, 100, 5, 0.15, 175, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1817, 60, 100, 3, 0.15, 190, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 1817, 60, 100, 3, 0.15, 190, false, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 105, 570, 106, 97, 7, 0.15, 143, false, false); // dead

    }
    update() {
        if (super.update()) {
            var bullet = null

            if (this.facing === FACING_SIDE.RIGHT) {
                bullet = new FireSkull(this.game, this.BB.x + this.BB.width, this.BB.y + (this.BB.height - 48) / 1.5)
                bullet.velocity.x = bullet.velocityX
            } else {
                bullet = new FireSkull(this.game, this.BB.x - this.BB.width,  this.BB.y + (this.BB.height - 48) / 1.5)
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

class FlyingDemon extends RangeEnemies {
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
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1728, 57, 157, 153, 5, 0.15, 35, false, true);  // hit
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1728, 57, 157, 153, 5, 0.15, 35, false, false); // dead
        
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 570, 182, 157, 120, 6, 0.3, 5, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 570, 182, 157, 120, 6, 0.3, 5, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 35, 15, 142, 153, 8, 0.1, 48, true, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 385, 57, 157, 153, 5, 0.15, 35, true, true);  // hit
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
            setTimeout(() => {this.game.addEntity(bullet);}, 600);
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

class mageCultist extends RangeEnemies {
    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 15;
        this.velocity = { x: -this.velocityX, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/cultist/mage-cultist.png");
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
        this.farDamage = 200;

        this.FAR_ATTACK_DURATION = 1;
        this.FAR_ATTACK_COOLDOWN = 3.5;

        this.farAttackDuration = 0;
        this.farAttackCooldown = 0;

        this.canAttackFar = true;
        this.farAttackRangeWidth = 600;

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
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 277, 211, 35, 40, 6, 0.15, 10, false, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 369, 337, 35, 40, 8, 0.15, 10, false, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 456, 0, 37, 40, 10, 0.1, 8, false, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 142, 171, 36, 40, 3, 0.15, 8, false, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 145, 296, 33, 40, 3, 0.15, 10, false, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 500, 43, 42, 40, 11, 0.15, 3, false, false); // dead
        
        this.animations[STATE.FALL][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 142, 84, 32, 40, 3, 0.15, 10, false, false); // fall
        // facing right
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2, 211, 35, 40, 6, 0.15, 10, true, true); // idle
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2, 337, 35, 40, 8, 0.15, 10, true, true);  // run
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2, 0, 37, 40, 10, 0.1, 8, true, true);  // attack
        this.animations[STATE.HIT][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2, 171, 36, 40, 3, 0.15, 8, true, true);  // hit
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2, 296, 33, 40, 3, 0.15, 10, true, true); // jump
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 43, 42, 40, 11, 0.15, 3, true, false); // dead

        this.animations[STATE.FALL][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2, 84, 32, 40, 3, 0.15, 10, true, false); // fall
    }
    update() {
        if (super.update()) {
            var bullet = null
            
            if (this.facing === FACING_SIDE.RIGHT) {
                bullet = new FireOfCultist(this.game, this.BB.x + this.BB.width, this.BB.y + (this.BB.height - 48) / 3)
                bullet.velocity.x = bullet.velocityX
            } else {
                bullet = new FireOfCultist(this.game, this.BB.x - this.BB.width, this.BB.y + (this.BB.height - 48) / 3)
                bullet.velocity.x = -bullet.velocityX
            }
            bullet.facing = this.facing;
            bullet.farDamage = this.farDamage;
            setTimeout(() => {this.game.addEntity(bullet);}, 600);
        }
        
        this.x += this.velocity.x;
        this.updateBB();
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

    drawMinimap(ctx, mmX, mmY){

    }
    
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        super.draw(ctx);
    }
}