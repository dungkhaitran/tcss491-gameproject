// Superclass for all flying projectiles
class Projectiles {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.velocity = {x: 100, y: 0};
        this.spritesheet;

        this.animation;
        
        this.width;
        this.height;

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.vanish = false;
        this.vanishCounter = 0;

        this.dealDamage = true;
        this.gotDamaged = false;

    }

    update(){
        const TICK = this.game.clockTick;

        this.x += this.velocity.x + this.game.clockTick;

        if(this.vanish){
            this.vanishCounter += this.game.clockTick;
            if(this.vanishCounter > 10.5) this.removeFromWorld = true;
        }
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x, this.y + this.height + 10, this.width * 2, this.height * 1.5);
        } else {
            this.BB = new BoundingBox(this.x + this.width, this.y + this.height + 10, this.width * 2, this.height * 1.5);
        }
    };

    draw(ctx){
        
        this.drawDebug(ctx);
    }

    drawDebug(ctx){
        if(PARAMS.DEBUG){
            ctx.strokeStyle = 'Pink';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class DarkFire extends Projectiles {
    constructor(game, x, y){
        super(game, x, y);
        Object.assign(this, {game, x, y});

        this.velocity = {x: 20, y: 0};
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/dark-fire.png");

        this.darkMage = new DarkMage(this.game, this.x, this.y);

        this.animations = [];
        this.loadAnimations();
        
        this.width;
        this.height;

        this.vanish = false;
        this.dealDamage = true;
        this.gotDamaged = false;

    }

    loadAnimations(){
        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            for(var j = 0; j < FACING_SIDE.COUNT; j++){
                this.animations[i].push([]);
            }
        }

        //facing left
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 50, 3, 42, 70, 1, 0.15, 0, false, true); // moving
        //facing right
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 3, 42, 70, 1, 0.15, 0, false, true); // moving
    }

    update(){
        super.update();

        if(this.darkMage.state === STATE.ATTACKING){
            if(this.darkMage.facing === FACING_SIDE.RIGHT){
                this.state = FACING_SIDE.RIGHT;
                this.x += this.velocity.x + this.game.clockTick;
            } else {
                this.state = FACING_SIDE.LEFT;
                this.x -= this.velocity.x + this.game.clockTick;
            }
        }
        if(this.x === this.darkMage.x) this.vanish = true;

        this.updateBB();
    }

    updateBB() {
        if(this.facing == FACING_SIDE.RIGHT){
            this.BB = new BoundingBox(this.x, this.y + this.height + 10, this.width * 2, this.height * 1.5);
        } else {
            this.BB = new BoundingBox(this.x + this.width, this.y + this.height + 10, this.width * 2, this.height * 1.5);
        }
    };

    draw(ctx){
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);

        super.draw(ctx);
    }
}

class FireSkull extends Projectiles {
    constructor(game, x, y){
        super(game, x, y);
        Object.assign(this, {game, x, y});

        this.velocity = {x: -10, y: 0};
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/fire-skull.png");

        this.darkMage = new DarkMage(this.game, this.x, this.y);

        this.animations = [];
        this.loadAnimations();
        
        this.width;
        this.height;

        this.vanish = false;
        this.dealDamage = true;
        this.gotDamaged = false;

    }

    loadAnimations(){
        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            for(var j = 0; j < FACING_SIDE.COUNT; j++){
                this.animations[i].push([]);
            }
        }

        //facing left
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 10, 130, 86, 90, 8, 0.15, 12, true, true); // moving
        //facing right
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 10, 20, 86, 90, 8, 0.15, 12, false, true); // moving
    }

    update(){
        const TICK = this.game.clockTick;

        this.x += this.darkMage.x

        if(this.vanish){
            this.deadCounter += this.game.clockTick;
            if(this.deadCounter > 0.5) this.removeFromWorld = true;
        }
        if(this.x === (this.hero.x + this.hero.width)/2 && this.y === (this.hero.y + this.hero.height)/2){
            this.vanish = true;
        }

    }

    draw(ctx){
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);

        super.draw(ctx);
    }
}

class BreathFire extends Projectiles {
    constructor(game, x, y){
        super(game, x, y);
        Object.assign(this, {game, x, y});

        this.velocity = {x: -100, y: 0};
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/breath-fire.png");

        this.flyingDemon = new FlyingDemon(this.game, this.x, this.y);

        this.animations = [];
        this.loadAnimations();
        
        this.width;
        this.height;

        this.vanish = false;
        this.dealDamage = true;
        this.gotDamaged = false;

    }

    loadAnimations(){
        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            for(var j = 0; j < FACING_SIDE.COUNT; j++){
                this.animations[i].push([]);
            }
        }

        //facing left
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 32, 15, 120, 70, 5, 0.15, 28, true, false); // moving
        //facing right
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 808, 15, 120, 70, 5, 0.15, 28, false, false); // moving
    }

    update(){
        const TICK = this.game.clockTick;

        if(this.vanish){
            this.deadCounter += this.game.clockTick;
            if(this.deadCounter > 0.5) this.removeFromWorld = true;
        }
        if(this.x === (this.hero.x + this.hero.width)/2 && this.y === (this.hero.y + this.hero.height)/2){
            this.vanish = true;

        }

    }

    draw(ctx){
        if(this.flyingDemon.state === STATE.ATTACKING){
            if(this.flyingDemon.facing === FACING_SIDE.LEFT){
                this.animations[STATE.MOVING][FACING_SIDE.LEFT].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
            }
            this.animations[STATE.MOVING][FACING_SIDE.RIGHT].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
        }

        super.draw(ctx);
    }
}