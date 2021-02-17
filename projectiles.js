class Bullet {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.velocityX = PARAMS.BITWIDTH / 3;
        this.velocity = { x: -this.velocityX, y: 0 };

        this.width = 48;
        this.height = 48;

        this.farDamage = 0

        this.dead = false

        this.updateBB();
    };

    update() {
        if (this.dead){
            this.removeFromWorld = true;
            return
        }

        this.x += this.velocity.x;

        this.updateBB()
    };

    drawMinimap(ctx, mmX, mmY) {
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'White';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};


class BulletOfDarkMage extends Bullet {
    constructor(game, x, y) {
        super(game, x, y)
        Object.assign(this, { game, x, y });

        // this.velocityX = PARAMS.BITWIDTH / 6;
        // this.velocity = { x: -this.velocityX, y: 0 };

        // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/bat.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/dark-fire.png");

        // this.width = 48;
        // this.height = 48;
        this.facing = FACING_SIDE.RIGHT;


        this.animations = [];
        this.loadAnimations();

        this.updateBB();
    };

    update() {
        super.update()
    };

    drawMinimap(ctx, mmX, mmY) {
    }

    loadAnimations() {
        for (var k = 0; k < FACING_SIDE.COUNT; k++) {
            this.animations.push([]);
        }

        //facing left
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 50, 3, 42, 70, 1, 0.15, 0, false, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 3, 42, 70, 1, 0.15, 0, false, true); // moving
    }

    updateBB() {
        super.updateBB()
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 100, 2);
        super.draw(ctx);
    };
};


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