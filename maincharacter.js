
class MainCharacter {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game.main = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/2.png");

        this.facing = FACING_SIDE.RIGHT;
        this.state = STATE.IDLE;
        this.dead = false;

        this.velocity = { x: 0, y: 0 };

        this.animations = [];
        this.loadAnimations();
        

        this.blood = 1000;
        this.meleeDamage = 100;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.canAttackMelee = true;

        this.meleeAttackRangeWidth = 70;
        this.width = 48;
        this.height = 96;
        this.updateBB();
    };

    loadAnimations() {
        for (var i = 0; i < STATE.COUNT; i++) { // states
            this.animations.push([]);
                for (var k = 0; k < FACING_SIDE.COUNT; k++) { // directions
                    this.animations[i].push([]);
                }
        }

        // idle animation
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 28, 101, 62, 115, 2, 0.2, 315, false, true);
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 24, 334, 62, 115, 2, 0.2, 315, true, true);

        // walk animation
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 23, 571, 93, 107, 8, 0.1, 315, false, true);
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 39, 781, 93, 107, 8, 0.1, 315, true, true);

        // attacking animation
        // this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 35, 1652, 140, 250, 4, 0.1, 219, false, true);
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 45, 1623, 155, 250, 3, 0.1, 190, false, true);
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 0, 1860, 155, 250, 3, 0.1, 215, false, true);

        // jumping animation
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 0, 297, 317, 3, 0.1, 43, false, true);
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3575, 843, 303, 322, 3, 0.1, 40, false, true);
    };

    updateBB() {
        // this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        // this.lastBBMeleeAttackRange = this.BBMeleeAttackRange;
        if (this.facing == FACING_SIDE.RIGHT) {
            this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, this.meleeAttackRangeWidth, this.height);
        } else {
            this.BBMeleeAttackRange = new BoundingBox(this.x - this.meleeAttackRangeWidth, this.y,
                this.meleeAttackRangeWidth, this.height);
        }
    };

    update() {

        const TICK = this.game.clockTick;

        if (!this.game.left && !this.game.right) {
            this.velocity.x = 0;
            if (this.state != STATE.ATTACKING && this.state != STATE.JUMPING) {
                this.state = STATE.IDLE;
            }
        } else if (this.game.left) {
            this.facing = FACING_SIDE.LEFT;
            if (this.state != STATE.ATTACKING && this.state != STATE.JUMPING) {
                this.state = STATE.MOVING;
            }

            if (this.x <= 0) {
                this.velocity.x = 0;
                this.x = 0;
            } else {
                this.velocity.x = -MIN_WALK;
            }
        } else if (this.game.right) {
            this.facing = FACING_SIDE.RIGHT;
            if (this.state != STATE.ATTACKING && this.state != STATE.JUMPING) {
                this.state = STATE.MOVING;
            }

            if (this.x >= (MAX_WIDTH - this.width)) {
                this.velocity.x = 0;
                this.x = MAX_WIDTH - this.width;
            } else {
                this.velocity.x = MIN_WALK;
            }
        }

        if (this.meleeAttackCooldown > 0) {
            this.meleeAttackCooldown -= TICK;
            if (this.meleeAttackCooldown <= 0) {
                this.canAttackMelee = true;
            }
        }
    
        if (this.game.attacking) {
            if (this.meleeAttackDuration > 0) {
                this.meleeAttackDuration -= TICK;
                if (this.meleeAttackDuration <= 0) {
                    this.state = STATE.IDLE;
                    this.game.attacking = false;
                }
            }
            if (this.meleeAttackDuration <= 0 && this.meleeAttackCooldown <= 0) {
                this.canAttackMelee = false;
                this.state = STATE.ATTACKING;
                this.meleeAttackDuration = MELEE_ATTACK_DURATION;
                this.meleeAttackCooldown = MELEE_ATTACK_COOLDOWN;
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // collision
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (!(entity instanceof MainCharacter)) {
                if (entity.BBMeleeAttackRange && that.BB.collide(entity.BBMeleeAttackRange)) {
                    entity.velocity.x = 0;
                    entity.state = STATE.IDLE;
                }
                else {
                    if (that.x < entity.x) {
                        if (entity.velocity) {
                            entity.facing = FACING_SIDE.LEFT;
                            entity.state = STATE.MOVING;
                            entity.velocity.x = -entity.velocityX;
                        }
                    } else {
                        if (entity.velocity) {
                            entity.facing = FACING_SIDE.RIGHT;
                            entity.state = STATE.MOVING;
                            entity.velocity.x = entity.velocityX;
                        }
                    }
                }
            }
        })

        this.updateBB();

        var cameraCharacter = this.x - this.game.camera.x;
        if (this.velocity.x < 0 && cameraCharacter < 350) {
            this.game.camera.x += this.velocity.x;
            this.game.camera.x = Math.max(0, this.game.camera.x);
        } else if (this.velocity.x > 0 && cameraCharacter > 650) {
            this.game.camera.x += this.velocity.x;
            this.game.camera.x = Math.min(this.game.camera.x , MAX_WIDTH - PARAMS.CANVAS_WIDTH);
        }

    };

    draw(ctx) {

        if (this.dead) {
            this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        } else if (this.state === STATE.ATTACKING) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 60, 0.9);//PARAMS.SCALE);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.9);//PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x - this.game.camera.x, this.BBMeleeAttackRange.y,
                 this.BBMeleeAttackRange.width + 23, this.BBMeleeAttackRange.height);

         
        }
    };

};