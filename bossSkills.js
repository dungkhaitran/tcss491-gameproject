class BossIce extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss-skills.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocityX = PARAMS.BITWIDTH / 2;

        this.damage = 250

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1880, 369, 77, 31, 3, 0.1, 172, true, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2643, 369, 77, 31, 3, 0.1, 172, false, true); // moving
    }

    updateBB() {
        super.updateBB()

        this.BB.width += 45;
        this.BB.height += 120;

        var that = this;
        this.game.entities.forEach(function (entity) {
            if ((entity instanceof MeleeEnemies) || (entity instanceof RangeEnemies)) {
                if (!that.dead && !entity.dead && that.BB.collide(entity.BB)) {
                    entity.hp -= that.damage;
                    that.dead = true;
                    that.game.addEntity(new DamageText(that.game, entity.BB.x + entity.BB.width / 2 - 20, entity.BB.y, -that.damage, "White"));

                    if (entity.hp <= 0) {
                        that.own.dropItems(entity)
                        entity.hp = 0;
                        entity.dead = true;
                        entity.velocity.x = 0
                        that.own.killedEnemiesCount++
                        that.own.checkEndGame(that.own)
                    }
                }
            }
        })
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        super.draw(ctx);
    };
};

class BossIceImpact extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss-skills.png");

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 825, 305, 132, 125, 4, 0.1, 130, true, false); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 3415, 305, 132, 125, 4, 0.1, 130, false, false); // moving
    }

    updateBB() {
        super.updateBB()

        this.BB.width += 45;
        this.BB.height += 120;

    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        super.draw(ctx);
    };
};

class BossFire extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss-skills.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocityX = PARAMS.BITWIDTH / 2;

        this.damage = 250

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1903, 625, 64, 24, 3, 0.1, 192, true, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2645, 625, 64, 24, 3, 0.1, 192, false, true); // moving
    }

    updateBB() {
        super.updateBB()

        this.BB.width += 45;
        this.BB.height += 120;

        var that = this;
        this.game.entities.forEach(function (entity) {
            if ((entity instanceof MeleeEnemies) || (entity instanceof RangeEnemies)) {
                if (!that.dead && !entity.dead && that.BB.collide(entity.BB)) {
                    entity.hp -= that.damage;
                    that.dead = true;
                    that.game.addEntity(new DamageText(that.game, entity.BB.x + entity.BB.width / 2 - 20, entity.BB.y, -that.damage, "White"));

                    if (entity.hp <= 0) {
                        that.own.dropItems(entity)
                        entity.hp = 0;
                        entity.dead = true;
                        entity.velocity.x = 0
                        that.own.killedEnemiesCount++
                        that.own.checkEndGame(that.own)
            }
                }
            }
        })
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        super.draw(ctx);
    };
};

class BossFireImpact extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss-skills.png");

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 62, 563, 133, 162, 7, 0.1, 120, true, false); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 3365, 563, 133, 162, 7, 0.1, 120, false, false); // moving
    }

    updateBB() {
        super.updateBB()

        this.BB.width += 45;
        this.BB.height += 120;

    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        super.draw(ctx);
    };
};

class Thunder extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss-skills.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocity = { x: 0, y: 0 };

        // this.velocityY = PARAMS.BITWIDTH / 2;
        this.farDamage = 200 + Math.floor(Math.random() * 100)

        this.width = 50
        this.height = 300

        this.deltaBBX = 30
        this.deltaBBY = 0

        this.duration = 1.5

        this.animations = [];
        this.loadAnimations();

        this.updateBB();
    };

    update() {
        super.update()

        this.duration -= this.game.clockTick;

        if (this.duration <= 0) {
            this.removeFromWorld = true
            return
        }
    };

    drawMinimap(ctx, mmX, mmY) {
    }

    loadAnimations() {
        for (var k = 0; k < FACING_SIDE.COUNT; k++) {
            this.animations.push([]);
        }

        //facing left
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 355, 20, 85, 205, 9, 0.15, 209, true, false); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2655, 20, 60, 205, 9, 0.15, 195, false, false); // moving
    }

    updateBB() {
        super.updateBB()
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.5);
        super.draw(ctx);
    };
};

class TeslaBall extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/tesla-ball.png");

        this.facing = FACING_SIDE.RIGHT;
        // this.velocityX = 0;
        this.velocity = { x: 0, y: 0 };

        this.farDamage = 200 + Math.floor(Math.random() * 100)

        this.width = 310
        this.height = 320

        this.duration = 1.5

        this.animation = new Animator(this.spritesheet, 18, 15, 85, 100, 11, 0.1, 43, false, false);

        this.updateBB();
    };

    update() {
        super.update()

        this.duration -= this.game.clockTick;

        if (this.duration <= 0) {
            this.removeFromWorld = true
        }
    };

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3.5);
        
        super.draw(ctx);
    };
};

class Comet extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MAIN){
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/comet.png");

        this.facing = FACING_SIDE.RIGHT;

        this.width = 78
        this.height = 78

        this.damage = 233

        this.animations = [];
        this.impactAnimations = [];
        this.loadAnimations();

        this.updateBB();

        this.damagedEntities = []
    }

    loadAnimations(){
        for(var i = 0; i < FACING_SIDE.COUNT; i++){
            this.animations.push([]);
            // for(var j = 0; j < FACING_SIDE.COUNT; j++){
            //     this.animations[i].push([]);
            // }
        }

        //facing left
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 179, 58, 68, 24, 3, 0.15, 60, true, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1288, 58, 68, 24, 3, 0.15, 60, false, true); // moving

        for(var j = 0; j < FACING_SIDE.COUNT; j++){
            this.impactAnimations.push([]);
        }

        //facing left
        this.impactAnimations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 8, 135, 112, 121, 7, 0.15, 15, true, true); // moving
        //facing right
        this.impactAnimations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 890, 135, 112, 121, 7, 0.15, 18, false, true); // moving
        
    }

    update(){
        super.update()

        
    }

    draw(ctx){

        if(this.dead && this.impactAnimations){
            this.impactAnimations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 90, this.y - 100, 2.5);
        } else {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 90, this.y, 3.5);

        }

        super.draw(ctx);
    }
};

class Explosion extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MAIN){
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss-skills.png");

        this.facing = FACING_SIDE.RIGHT;

        this.width = 78
        this.height = 78

        this.damage = 233

        this.animations = [];
        this.impactAnimations = [];
        this.loadAnimations();

        this.updateBB();

        this.damagedEntities = []
    }

    loadAnimations(){
        for(var i = 0; i < FACING_SIDE.COUNT; i++){
            this.animations.push([]);
            // for(var j = 0; j < FACING_SIDE.COUNT; j++){
            //     this.animations[i].push([]);
            // }
        }

        //facing left
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1903, 625, 64, 25, 3, 0.15, 190, true, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2643, 625, 64, 25, 3, 0.15, 190, false, true); // moving

        for(var j = 0; j < FACING_SIDE.COUNT; j++){
            this.impactAnimations.push([]);
        }

        //facing left
        this.impactAnimations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 61, 557, 134, 168, 7, 0.15, 100, true, true); // moving
        //facing right
        this.impactAnimations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 3358, 557, 134, 168, 7, 0.15, 100, false, true); // moving
        
    }

    update(){
        super.update()

        
    }

    draw(ctx){

        if(this.dead && this.impactAnimations){
            this.impactAnimations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 90, this.y - 100, 1.5);
        } else {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 90, this.y, 2.5);

        }

        super.draw(ctx);
    }
};