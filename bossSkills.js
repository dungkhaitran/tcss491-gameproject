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

class BossThunder extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MOB) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss/boss-skills.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocity = { x: 0, y: this.velocityY };

        this.velocityY = PARAMS.BITWIDTH / 2;

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
        this.animations[FACING_SIDE.LEFT] = new Animator(this.spritesheet, 355, 20, 85, 205, 9, 0.15, 209, true, false); // moving
        //facing right
        this.animations[FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 2655, 20, 60, 205, 9, 0.15, 195, false, false); // moving
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
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.5);
        super.draw(ctx);
    };
};

class TeslaBall extends Bullet {
    constructor(game, x, y, team = TEAM.TEAM_MAIN) {
        super(game, x, y, team)
        Object.assign(this, { game, x, y, team });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/tesla-ball.png");

        this.facing = FACING_SIDE.RIGHT;
        this.velocityX = 0;

        this.damage = 250

        this.width = 120
        this.height = 168

        this.animation = new Animator(this.spritesheet, 18, 15, 85, 100, 11, 0.1, 43, false, false);

        this.updateBB();
    };

    update() {
        super.update()

    };

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3.5);
        
        super.draw(ctx);
    };
};
