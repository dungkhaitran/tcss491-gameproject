class Bullet {
    constructor(game, x, y, team) {
        Object.assign(this, { game, x, y, team });

        this.velocityX = 11;
        this.velocity = { x: -this.velocityX, y: 0 };

        this.width = 48;
        this.height = 48;

        this.farDamage = 0

        this.type = BULLET_TYPE.BULLET_NORMAL

        this.dead = false
        this.deadCounter = 0

        this.updateBB();
    };

    update() {
        if (this.dead){
            if (this.impactAnimations) {
                this.deadCounter += this.game.clockTick;
                if (this.deadCounter > 0.5) {
                    this.removeFromWorld = true
                }
            } else {
                this.removeFromWorld = true;
            }
            return
        }

        this.x += this.velocity.x;

        var camera = this.x - this.game.camera.x;
        if ((camera <= -this.width) || (camera >= PARAMS.CANVAS_WIDTH) || (this.y <= -this.height) || (this.y >= 650)) {
            this.dead = true
            this.removeFromWorld = true
        }

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
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/dark-fire.png");

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

        this.BB.width = this.BB.height = 90;
        this.BB.y = this.BB.y - 60;
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 80, 2);
        super.draw(ctx);
    };
};

class BulletOfFlyingDemon extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB){
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/breath-fire.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocity.x = 0;

        this.animations = [];
        this.loadAnimations();

        this.updateBB();

    }

    loadAnimations(){
        for (var k = 0; k < FACING_SIDE.COUNT; k++) {
            this.animations.push([]);
        }

        //facing left
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 32, 15, 120, 70, 5, 0.3, 28, false, false); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 828, 15, 120, 70, 5, 0.3, 28, true, false); // moving
    }

    update(){
        super.update();
       
        if(this.facing === FACING_SIDE.LEFT){
            this.x -= 10;
            this.y += 5;
        }else{
            this.x += 10;
            this.y += 5;
        }
    }

    updateBB() {
        super.updateBB()

        this.BB.x += 100;
        this.BB.y += 10;
        this.BB.width += 80;
        this.BB.height += 70;
        
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        super.draw(ctx);
    };
};

class FireSkull extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MAIN){
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/fire-skull.png");

        this.facing = FACING_SIDE.RIGHT;

        this.width = 78
        this.height = 78

        this.damage = 233

        this.animations = [];
        this.loadAnimations();

        this.updateBB();

        this.damagedEntities = []
    }

    loadAnimations(){
        for(var i = 0; i < STATE.COUNT; i++){
            this.animations.push([]);
            // for(var j = 0; j < FACING_SIDE.COUNT; j++){
            //     this.animations[i].push([]);
            // }
        }

        //facing left
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 10, 130, 86, 90, 8, 0.15, 12, false, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 10, 20, 86, 90, 8, 0.15, 12, false, true); // moving
    }

    update(){
        super.update()

        // this.BB.width += 30;

        var that = this;
        this.game.entities.forEach(function (entity) {
            if ((entity instanceof MeleeEnemies) || (entity instanceof RangeEnemies)) {
                if (!entity.dead && that.BB.collide(entity.BB)) {
                    var damaged = false
                    that.damagedEntities.forEach(function (damagedEntity) {
                        if (damagedEntity === entity) {
                            damaged = true
                        }
                    })
                    if (!damaged) {
                        that.damagedEntities.push(entity)
                        entity.hp -= that.damage;
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
            }
        })
    }

    draw(ctx){
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.5);

        super.draw(ctx);
    }
};

class FireOfCultist extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/cultist/mage-cultist.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocityX = PARAMS.BITWIDTH / 2;

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 196, 139, 22, 14, 4, 0.15, 24, false, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 6, 139, 22, 14, 4, 0.15, 24, false, true); // moving
    }

    updateBB() {
        super.updateBB()

        this.BB.width += 30;
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3.5);
        super.draw(ctx);
    };
};

class FireImpactOfCultist {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        //super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mobs/cultist/mage-cultist.png");

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 242, 258, 22, 22, 5, 0.15, 22, false, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 4, 258, 22, 22, 5, 0.15, 22, false, true); // moving
    }

    updateBB() {
        super.updateBB()

        this.BB.width = this.BB.height = 90;
        this.BB.y = this.BB.y - 60;
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 80, 2);
        super.draw(ctx);
    };
};

class Tornado extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MAIN) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/tornado.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocityX = PARAMS.BITWIDTH / 2;

        this.damage = 250

        this.width = 120
        this.height = 168

        this.animations = [];
        this.impactAnimations = [];
        this.loadAnimations();

        this.updateBB();
    };

    update() {
        super.update()

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

    drawMinimap(ctx, mmX, mmY) {
    }

    loadAnimations() {
        for (var k = 0; k < FACING_SIDE.COUNT; k++) {
            this.animations.push([]);
        }

        //facing left
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 40, 160, 65, 68, 4, 0.08, 70, true, true); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1040, 160, 65, 68, 4, 0.08, 70, false, true); // moving

        for (var k = 0; k < FACING_SIDE.COUNT; k++) {
            this.impactAnimations.push([]);
        }

        //facing left
        this.impactAnimations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 158, 26, 75, 68, 5, 0.1, 50, true, false); // moving
        //facing right
        this.impactAnimations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 800, 26, 75, 68, 5, 0.1, 50, false, false); // moving
    }

    draw(ctx) {
        if (this.dead && this.impactAnimations) {
            this.impactAnimations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        } else {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.5);
        }
        super.draw(ctx);
    };
};

class TornadoImpact extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/tornado.png");

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 40, 26, 75, 68, 5, 0.1, 50, true, false); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 800, 26, 75, 68, 5, 0.1, 50, false, false); // moving
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

