
class MainCharacter {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game.main = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/full-main.png");

        this.animations = [];
        this.loadAnimations();

        this.MELEE_ATTACK_DURATION = 0.25;
        this.MELEE_ATTACK_COOLDOWN = 0.3;

        this.MELEE_ATTACK_DURATION2 = 0.25; // 3
        this.MELEE_ATTACK_COOLDOWN2 = 0.3; // 3.3

        this.SKILL2_DURATION = 0.3
        this.SKILL2_COOLDOWN = 0.1

        this.SKILL3_DURATION = 0.3
        this.SKILL3_COOLDOWN = 0.2

        this.meleeAttackRangeWidth = 85;
        this.meleeAttackRangeWidth2 = 0;

        this.width = 60;
        this.height = 105;
        this.CHAR_SIZE = 3.5;
        
        this.updateBB();

        this.healthBar = new HealthBar(this, game);

        this.jumping = false
        this.canJump = true
        this.jumpingDelta = -30
        this.durationJumping = 0
        this.jumpingSteps = []
        for (var i = 20; i >= 0; i--) {
            this.jumpingSteps.push(this.jumpingDelta)
            this.jumpingDelta += i / 7
            if (this.jumpingDelta >= 0) {
                break
            }
        }

        for (var i = this.jumpingSteps.length - 1; i >= 0; i--) {
            this.jumpingSteps.push(-this.jumpingSteps[i])
        }

        this.reset()
    };

    reset() {
        this.facing = FACING_SIDE.RIGHT;
        this.state = STATE.IDLE;
        this.deadCounter = 0;
        this.dead = false;

        this.velocity = { x: 0, y: 0 };

        this.hp = HP_MAIN;
        this.maxHp = this.hp;

        this.meleeDamage = 100;
        this.meleeDamage2 = 0;

        this.meleeAttackDuration = 0;
        this.meleeAttackCooldown = 0;

        this.meleeAttackDuration2 = 0;
        this.meleeAttackCooldown2 = 0;

        this.skill2Duration = 0
        this.skill2Cooldown = 0

        this.skill3Duration = 0
        this.skill3Cooldown = 0

        this.canAttackMelee = true;
        this.canAttackMelee2 = true;
        this.canCastSkill2 = true;
        this.canCastSkill3 = true;

        this.killedEnemiesCount = 0;

        this.chanceDropItems = 0
    }

    loadAnimations() {
        for (var i = 0; i < STATE.COUNT; i++) { // states
            this.animations.push([]);
            for (var k = 0; k < FACING_SIDE.COUNT; k++) { // directions
                this.animations[i].push([]);
            }
        }

        // idle animation
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 510, 5, 30, 30, 4, 0.2, 20, false, true);
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 310, 5, 30, 30, 4, 0.2, 20, true, true);
      

        // walk animation
        this.animations[STATE.MOVING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 510, 42, 30, 30, 6, 0.1, 20, false, true);
        this.animations[STATE.MOVING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 210, 42, 30, 30, 6, 0.1, 20, true, true);

        // attacking animation 1
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 498, 147, 49, 35, 10, 0.05, 1, false, true);
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3, 147, 49, 35, 10, 0.05, 1, false, true);

        // attacking animation 2 (used for all other magic attacks)
        this.animations[STATE.ATTACKING2][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 504, 117, 30, 30, 9, 0.03, 20, false, true);
        this.animations[STATE.ATTACKING2][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 67, 117, 30, 30, 9, 0.03, 20, true, true);

        // jumping animation
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 510, 73, 30, 36, 10, 0.07, 20, false, true);
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 8, 73, 30, 36, 10, 0.07, 20, false, true);

        //dead animation
        this.animations[STATE.DEAD][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 660, 230, 30, 30, 4, 0.1, 20, false, false);
        this.animations[STATE.DEAD][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 160, 230, 30, 30, 4, 0.1, 20, false, false);
       
    };

    updateBB() {
        if (this.facing == FACING_SIDE.RIGHT) {
            this.BB = new BoundingBox(this.x + 20, this.y, this.width, this.height);
            this.BBMeleeAttackRange = new BoundingBox(this.x + 20 + this.width, this.y, 
                this.meleeAttackRangeWidth, this.height);
        } else {
            this.BB = new BoundingBox(this.x + 20, this.y, this.width, this.height);
            this.BBMeleeAttackRange = new BoundingBox(this.x + 20 - this.meleeAttackRangeWidth , this.y,
                this.meleeAttackRangeWidth, this.height);
        }

        // if (this.facing == FACING_SIDE.RIGHT) {
        //     this.BB = new BoundingBox(this.x + 20, this.y, this.width / 2, this.height+ 5); //body
        //     this.BBMeleeAttackRange2 = new BoundingBox(this.x, this.y, 
        //         this.meleeAttackRangeWidth2, this.height+ 50);  // melee range
        // } else {
        //     this.BB = new BoundingBox(this.x, this.y, this.width / 2, this.height+ 5);
        //     this.BBMeleeAttackRange2 = new BoundingBox(this.x, this.y,
        //         this.meleeAttackRangeWidth2, this.height + 50);
        // }
    };
 

    update() {

        const TICK = this.game.clockTick;

        if (this.dead) {
            this.state = STATE.DEAD;
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 0.5) {
                this.removeFromWorld = true//false;
                this.game.state = GAME_STATE.LOSE
                this.game.camera.loadGame()
            }
            
        } else{
            if (this.game.jumping) {
                if (this.durationJumping < (this.jumpingSteps.length / 2)) {
                    if (this.state != STATE.ATTACKING && this.state != STATE.ATTACKING2) {
                        this.state = STATE.JUMPING
                    }
                    this.velocity.y = this.jumpingSteps[this.durationJumping++]
                } else if (this.durationJumping >= (this.jumpingSteps.length / 2) && this.durationJumping < this.jumpingSteps.length) {
                    this.velocity.y = this.jumpingSteps[this.durationJumping++]
                } else {
                    this.game.jumping = false
                    this.canJump = true
                    this.velocity.y = 0
                    this.durationJumping = 0
                    if (this.state != STATE.ATTACKING && this.state != STATE.ATTACKING2) {
                        this.state = STATE.IDLE
                    }
                }
            }
            if (!this.game.left && !this.game.right) {
                this.velocity.x = 0;
                if (this.state != STATE.ATTACKING && this.state != STATE.ATTACKING2 && this.state != STATE.JUMPING) {
                    this.state = STATE.IDLE;
                }
            } else if (this.game.left) {
                this.facing = FACING_SIDE.LEFT;
                if (this.state != STATE.ATTACKING && this.state != STATE.ATTACKING2 && this.state != STATE.JUMPING) {
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
                if (this.state != STATE.ATTACKING && this.state != STATE.ATTACKING2 && this.state != STATE.JUMPING) {
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
                        if (this.durationJumping > 0) {
                            this.state = STATE.JUMPING;
                        } else {
                            this.state = STATE.IDLE;
                        }
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

            // attack 2
            if (this.meleeAttackCooldown2 > 0) {
                this.meleeAttackCooldown2 -= TICK;
                if (this.meleeAttackCooldown2 <= 0) {
                    this.canAttackMelee2 = true;
                }
            }
        
            if (this.game.attacking2) {
                if (this.meleeAttackDuration2 > 0) {
                    this.meleeAttackDuration2 -= TICK;
                    if (this.meleeAttackDuration2 <= 0) {
                        if (this.durationJumping > 0) {
                            this.state = STATE.JUMPING;
                        } else {
                            this.state = STATE.IDLE;
                        }
                        this.game.attacking2 = false;
                        this.game.entities.forEach(function (entity) {
                            if (!(entity instanceof MainCharacter)) {
                                entity.gotDamaged2 = false;
                            }
                        })                               
                    }
                }
                if (this.meleeAttackDuration2 <= 0 && this.meleeAttackCooldown2 <= 0) {
                    this.canAttackMelee2 = false;
                    this.state = STATE.ATTACKING2;
                    this.meleeAttackDuration2 = this.MELEE_ATTACK_DURATION2;
                    this.meleeAttackCooldown2 = this.MELEE_ATTACK_COOLDOWN2;
                }
            }

            // skill 2
            if (this.skill2Cooldown > 0) {
                this.skill2Cooldown -= TICK;
                if (this.skill2Cooldown <= 0) {
                    this.canCastSkill2 = true;
                }
            }

            if (this.skill2Duration > 0) {
                this.skill2Duration -= TICK;
                if (this.skill2Duration <= 0) {
                    var bullet = null
            
                    if (this.facing === FACING_SIDE.RIGHT) {
                        bullet = new Tornado(this.game, this.BB.x - this.BB.width, this.BB.y - (this.BB.height - 48))
                        bullet.velocity.x = bullet.velocityX
                    } else {
                        bullet = new Tornado(this.game, this.BB.x - 10, this.BB.y - (this.BB.height - 48))
                        bullet.velocity.x = -bullet.velocityX
                    }
                    bullet.own = this
                    bullet.facing = this.facing;
                    setTimeout(() => {this.game.addEntity(bullet);}, 100);

                    if (this.durationJumping > 0) {
                        this.state = STATE.JUMPING;
                    } else {
                        this.state = STATE.IDLE;
                    }
                }
            }
    
            if (this.game.castSkill2) {
                if (this.skill2Cooldown <= 0) {
                    this.game.castSkill2 = false;
                    this.canCastSkill2 = false;
                    this.state = STATE.ATTACKING2;
                    this.skill2Duration = this.SKILL2_DURATION;
                    this.skill2Cooldown = this.SKILL2_COOLDOWN;
                }
            }

            // skill 3
            if (this.skill3Cooldown > 0) {
                this.skill3Cooldown -= TICK;
                if (this.skill3Cooldown <= 0) {
                    this.canCastSkill3 = true;
                }
            }

            if (this.skill3Duration > 0) {
                this.skill3Duration -= TICK;
                if (this.skill3Duration <= 0) {
                    var bullet = null
            
                    var y = this.BB.y - 20
                    if (this.facing === FACING_SIDE.RIGHT) {
                        bullet = new Comet(this.game, this.BB.x + this.BB.width, y)
                        bullet.velocity.x = bullet.velocityX
                    } else {
                        bullet = new FireSkull(this.game, this.BB.x - this.BB.width, y)
                        bullet.velocity.x = -bullet.velocityX
                    }
                    bullet.own = this
                    bullet.facing = this.facing;
                    setTimeout(() => {this.game.addEntity(bullet);}, 100);

                    if (this.durationJumping > 0) {
                        this.state = STATE.JUMPING;
                    } else {
                        this.state = STATE.IDLE;
                    }
                }
            }
    
            if (this.game.castSkill3) {
                if (this.skill3Cooldown <= 0) {
                    this.game.castSkill3 = false;
                    this.canCastSkill3 = false;
                    this.state = STATE.ATTACKING2;
                    this.skill3Duration = this.SKILL3_DURATION;
                    this.skill3Cooldown = this.SKILL3_COOLDOWN;
                }
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // collision
            var checkHpMain = false;
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (!(entity instanceof MainCharacter) && !(entity instanceof DamageText) 
                        && !(entity instanceof Bullet) && !(entity instanceof RunningEnemies)
                        && !(entity instanceof DropItems)
                        && !entity.dead) {
                    var checkHpMob = false;
                    if (that.game.attacking && entity.BB && that.BBMeleeAttackRange.collide(entity.BB)
                            && entity.gotDamaged === false) {
                        entity.gotDamaged = true;
                        entity.hp -= that.meleeDamage;
                        that.game.addEntity(new DamageText(that.game, entity.BB.x + entity.BB.width / 2 - 20, entity.BB.y, -that.meleeDamage, "White"));
                        checkHpMob = true;
                    }
                    if (that.game.attacking2 && entity.BB && that.BBMeleeAttackRange.collide(entity.BB)
                            && entity.gotDamaged2 === false) {
                        entity.gotDamaged2 = true;
                        entity.hp -= that.meleeDamage2;
                        that.game.addEntity(new DamageText(that.game, entity.BB.x + entity.BB.width / 2 - 20, entity.BB.y, -that.meleeDamage2, "White"));
                        checkHpMob = true;
                    }
                    var checkEndGame = false
                    if (entity instanceof MeleeEnemies) {
                        if (entity.attacking && entity.BBMeleeAttackRange && that.BB.collide(entity.BBMeleeAttackRange)
                                && entity.dealDamage === false) {
                            entity.dealDamage = true;
                            that.hp -= entity.meleeDamage;
                            that.game.addEntity(new DamageText(that.game, that.BB.x + that.BB.width / 2 - 20, that.BB.y, -entity.meleeDamage, "Red"));
                            checkHpMain = true;
                        }
                        if (checkHpMob) {
                            if (entity.hp <= 0) {
                                that.dropItems(entity)
                                entity.hp = 0;
                                entity.dead = true;
                                entity.velocity.x = 0
                                // that.killedEnemiesCount++
                                checkEndGame = true
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
                    if (entity instanceof RangeEnemies) {
                        if (checkHpMob) {
                            if (entity.hp <= 0) {
                                that.dropItems(entity)
                                entity.hp = 0;
                                entity.dead = true;
                                entity.velocity.x = 0
                                // that.killedEnemiesCount++
                                checkEndGame = true
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

                    if (checkEndGame) {
                        that.checkEndGame(that)
                    }

                    if(entity.gotDamaged || entity.gotDamaged2){
                        entity.state = STATE.HIT;
                    }
                } else
                if (entity instanceof Bullet) {
                    if (!entity.dead && entity.team === TEAM.TEAM_MOB && that.BB.collide(entity.BB)) {
                        that.hp -= entity.farDamage;
                        entity.dead = true;
                        that.game.addEntity(new DamageText(that.game, that.BB.x + that.BB.width / 2 - 20, that.BB.y, -entity.farDamage, "Red"));
                        checkHpMain = true;
                    }
                } else
                if (entity instanceof RunningEnemies) {
                    if (!entity.dealDamage && that.BB.collide(entity.BB)) {
                        entity.dealDamage = true
                        that.hp -= entity.damage;
                        that.game.addEntity(new DamageText(that.game, that.BB.x + that.BB.width / 2 - 20, that.BB.y, -entity.damage, "Red"));
                        checkHpMain = true;
                    }
                } else
                if (entity instanceof DropItems) {
                    if (that.BB.collide(entity.BB)) {
                        entity.removeFromWorld = true
                        that.hp += entity.val
                        if (that.hp > that.maxHp) {
                            that.hp = that.maxHp
                        }
                        that.game.addEntity(new DamageText(that.game, that.BB.x + that.BB.width / 2 - 20, that.BB.y, entity.val, "Yellow"));
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

    checkEndGame(that) {
        switch (that.game.level) {
            case 1:
                if (that.killedEnemiesCount >= 20) {
                    that.game.level++
                    that.killedEnemiesCount = 0
                    that.game.camera.loadGame()
                    that.game.camera.x = 0
                }
                break;

            case 2:
                if (that.killedEnemiesCount >= 25) {
                    that.game.level++
                    that.killedEnemiesCount = 0
                    that.game.camera.loadGame()
                    that.game.camera.x = 0
                }
                break;

            case 3:
                if (that.killedEnemiesCount >= 1) {
                    that.game.state = GAME_STATE.WIN
                    that.game.camera.loadGame()
                    that.game.camera.x = 0
                }
                break;
        }
    }

    dropItems(entity) {
        var rand = Math.floor(Math.random() * 100)

        var drop = false
        if (this.chanceDropItems >= 3) {
            drop = true
        } else {
            if (rand < 40) {
                drop = true
            } else {
                this.chanceDropItems++;
            }
        }

        if (drop) {
            var val = (Math.floor(Math.random() * 10) + 1) * 50
            this.game.addEntity(new healthPotion(this.game, entity.BB.x + entity.BB.width / 3, entity.BB.y + entity.BB.height - 35 * 0.7, val))
            this.chanceDropItems= 0
        }
    
    }

    draw(ctx) {

        if (this.state === STATE.DEAD) {
             this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.CHAR_SIZE);
        } else if (this.state === STATE.ATTACKING) {
            if (this.facing == FACING_SIDE.RIGHT) {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 20, this.CHAR_SIZE);
            } else {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 75, this.y - 20, this.CHAR_SIZE);//PARAMS.SCALE);
            }
        }else if (this.state === STATE.ATTACKING2) {
            if (this.facing == FACING_SIDE.RIGHT) {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.CHAR_SIZE);
            } else {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.CHAR_SIZE);//PARAMS.SCALE);
            }
        }
        else {
            if (this.facing == FACING_SIDE.RIGHT && this.state == STATE.MOVING) {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.CHAR_SIZE);
            } else {
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.CHAR_SIZE);
            }
        }
    
        this.healthBar.draw(ctx);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x - this.game.camera.x, this.BBMeleeAttackRange.y,
            this.BBMeleeAttackRange.width, this.BBMeleeAttackRange.height);
    
            // ctx.strokeStyle = 'Purple';
            // ctx.strokeRect(this.BBMeleeAttackRange2.x - this.game.camera.x, this.BBMeleeAttackRange2.y,
            //     this.BBMeleeAttackRange2.width, this.BBMeleeAttackRange2.height);
        }
    };

};