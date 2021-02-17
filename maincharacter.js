
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
        

        this.hp = 100000;
        this.maxHp = this.hp;
        this.meleeDamage = 100;

        this.MELEE_ATTACK_DURATION = 0.25;
        this.MELEE_ATTACK_COOLDOWN = 0.3;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.canAttackMelee = true;

        this.meleeAttackRangeWidth = 70;
        this.width = 48;
        this.height = 96;
        this.updateBB();

        this.healthBar = new HealthBar(this, game);
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
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 39, 571, 93, 107, 8, 0.1, 315, false, true);
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 45, 781, 93, 107, 8, 0.1, 315, true, true);

        // attacking animation
        //this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 40, 1623, 155, 250, 3, 0.1, 190, false, true);
        //this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 15, 1860, 155, 250, 3, 0.1, 215, false, true);
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 1505, 1672, 159, 146, 2, 0.1, 182, false, true);
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 1495, 1901, 159, 146, 4, 0.1, 182, false, true);

        // jumping animation
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 29, 2587, 77, 112, 2, 0.1, 273, false, true);
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 718, 2591, 95, 117, 2, 0.1, 273, false, true);

        //dead animation
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 25, 2830, 140, 105, 7, 0.15, 240, false, false);
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 25, 2830,140, 105, 7, 0.15, 240, false, false);
       
    };

    updateBB() {
        if (this.facing == FACING_SIDE.RIGHT) {
            this.BB = new BoundingBox(this.x + 20, this.y, this.width / 2, this.height+ 5); //body
            this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, 
                this.meleeAttackRangeWidth + 80, this.height+ 50);  // melee range
        } else {
            this.BB = new BoundingBox(this.x, this.y, this.width / 2, this.height+ 5);
            this.BBMeleeAttackRange = new BoundingBox(this.x - this.meleeAttackRangeWidth , this.y,
                this.meleeAttackRangeWidth + 80, this.height + 50);
        }
    };
 

    update() {

        const TICK = this.game.clockTick;
        if (this.dead) {
            this.state = STATE.DEAD;
            this.deadCounter += this.game.clockTick;
            if(this.deadCounter > 0.5) this.removeFromWorld = false;
            
        } else{        
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
                        this.game.entities.forEach(function (entity) {
                            if (!(entity instanceof MainCharacter)) {
                                entity.gotDamaged = false;
                            }
                        })                                
                    }
                }
                if (this.meleeAttackDuration <= 0 && this.meleeAttackCooldown <= 0) {
                    this.canAttackMelee = false;
                    this.state = STATE.ATTACKING;
                    this.meleeAttackDuration = this.MELEE_ATTACK_DURATION;
                    this.meleeAttackCooldown = this.MELEE_ATTACK_COOLDOWN;
                }
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // collision
            var that = this;
            var checkHpMain = false;
            this.game.entities.forEach(function (entity) {
                if (!(entity instanceof MainCharacter) && !(entity instanceof DamageText) 
                        && !(entity instanceof Bullet) && !entity.dead) {
                    var checkHpMob = false;
                    if (that.game.attacking && entity.BB && that.BBMeleeAttackRange.collide(entity.BB)
                            && entity.gotDamaged === false) {
                        entity.gotDamaged = true;
                        entity.hp -= that.meleeDamage;
                        that.game.addEntity(new DamageText(that.game, entity.BB.x + entity.BB.width / 2 - 20, entity.BB.y, -that.meleeDamage, "White"));
                        checkHpMob = true;
                    }
                    if (entity instanceof Enemies) {
                        if (entity.attacking /*&& entity.BBMeleeAttackRange*/ && that.BB.collide(entity.BBMeleeAttackRange)
                                && entity.dealDamage === false) {
                            entity.dealDamage = true;
                            that.hp -= entity.meleeDamage;
                            that.game.addEntity(new DamageText(that.game, that.BB.x + that.BB.width / 2 - 20, that.BB.y, -entity.meleeDamage, "Red"));
                            checkHpMain = true;
                        }
                        if (checkHpMob) {
                            if (entity.hp <= 0) {
                                entity.hp = 0;
                                entity.dead = true;
                            }
                        }
                        // if (entity.BBMeleeAttackRange) {
                            if (that.BB.collide(entity.BBMeleeAttackRange)) {
                                entity.velocity.x = 0;
                                if (entity.state != STATE.ATTACKING && entity.state != STATE.JUMPING) {
                                    entity.state = STATE.IDLE;
                                }
                                if (entity.canAttackMelee) {
                                    entity.attacking = true;
                                }
                            }
                            else {
                                if (entity.velocity) {
                                if ((that.BB.x + that.BB.width) < entity.BBMeleeAttackRange.x) {
                                        entity.facing = FACING_SIDE.LEFT;
                                        entity.state = STATE.MOVING;
                                        entity.velocity.x = -entity.velocityX;
                                    } else if (that.BB.x  > (entity.BBMeleeAttackRange.x + entity.BBMeleeAttackRange.width)) {
                                        entity.facing = FACING_SIDE.RIGHT;
                                        entity.state = STATE.MOVING;
                                        entity.velocity.x = entity.velocityX;
                                    } else {
                                        entity.velocity.x = 0;
                                        if (entity.state != STATE.ATTACKING && entity.state != STATE.JUMPING) {
                                            entity.state = STATE.IDLE;
                                        }
                                    }
                                }
                            }
                        // }
                    }
                    if (entity instanceof FarRangeEnemies) {
                        // if (entity.attacking && that.BB.collide(entity.BBFarAttackRange)
                        //         && entity.dealDamage === false) {
                        //     entity.dealDamage = true;
                        //     that.hp -= entity.farDamage;
                        //     that.game.addEntity(new DamageText(that.game, that.BB.x + that.BB.width / 2 - 20, that.BB.y, -entity.farDamage, "Red"));
                        //     checkHpMain = true;
                        // }
                        if (checkHpMob) {
                            if (entity.hp <= 0) {
                                entity.hp = 0;
                                entity.dead = true;
                            }
                        }
                        // if (entity.BBFarAttackRange) {
                            if (that.BB.collide(entity.BBFarAttackRange)) {
                                entity.velocity.x = 0;
                                if (entity.state != STATE.ATTACKING && entity.state != STATE.JUMPING) {
                                    entity.state = STATE.IDLE;
                                }
                                if (entity.canAttackFar) {
                                    entity.attacking = true;
                                }
                            }
                            else {
                                if (entity.velocity) {
                                    if ((that.BB.x + that.BB.width) < entity.BBFarAttackRange.x) {
                                        entity.facing = FACING_SIDE.LEFT;
                                        entity.state = STATE.MOVING;
                                        entity.velocity.x = -entity.velocityX;
                                    } else if (that.BB.x  > (entity.BBFarAttackRange.x + entity.BBFarAttackRange.width)) {
                                        entity.facing = FACING_SIDE.RIGHT;
                                        entity.state = STATE.MOVING;
                                        entity.velocity.x = entity.velocityX;
                                    } else {
                                        entity.velocity.x = 0;
                                        if (entity.state != STATE.ATTACKING && entity.state != STATE.JUMPING) {
                                            entity.state = STATE.IDLE;
                                        }
                                    }
                                }
                            }
                        // }
                    }
                }

                if (entity instanceof Bullet) {
                    if (that.BB.collide(entity.BB)) {
                        that.hp -= entity.farDamage;
                        entity.dead = true;
                        that.game.addEntity(new DamageText(that.game, that.BB.x + that.BB.width / 2 - 20, that.BB.y, -entity.farDamage, "Red"));
                        checkHpMain = true;
                    }
                }
            })

            if (checkHpMain && this.hp <= 0) {
                this.hp = 0;
                this.dead = true;
                // this.removeFromWorld = false;
            }

            this.updateBB();

            var cameraCharacter = this.x - this.game.camera.x;
            if (this.velocity.x < 0 && cameraCharacter < 350) {
                this.game.camera.x += this.velocity.x;
                this.game.camera.x = Math.max(0, this.game.camera.x);
            } else if (this.velocity.x > 0 && cameraCharacter > 650) {
                this.game.camera.x += this.velocity.x;
                this.game.camera.x = Math.min(this.game.camera.x , MAX_WIDTH - PARAMS.CANVAS_WIDTH);
            }
    }
    };

    draw(ctx) {

        if (this.state === STATE.DEAD) {
             this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.3);
        } else if (this.state === STATE.ATTACKING) {
            if (this.facing == FACING_SIDE.RIGHT) {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y-20, 1.3);
            } else {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.meleeAttackRangeWidth, this.y-20, 1.3);//PARAMS.SCALE);
            }
        } else {
            if (this.facing == FACING_SIDE.RIGHT && this.state == STATE.MOVING) {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.3);
            } else {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.3);
            }
        }

        this.healthBar.draw(ctx);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width + 50, this.BB.height + 50);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x - this.game.camera.x, this.BBMeleeAttackRange.y,
                 this.BBMeleeAttackRange.width, this.BBMeleeAttackRange.height);

         
        }
    };

};