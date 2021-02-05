
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

        this.width = PARAMS.BLOCKWIDTH;
        this.height = PARAMS.BLOCKWIDTH * 2;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, 10, this.height);

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
        this.animations[STATE.IDLE][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 19, 101, 73, 117, 2, 0.33, 319, false, true);
        this.animations[STATE.IDLE][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 11, 333, 67, 111, 2, 0.33, 321, true, true);

        // walk animation
        this.animations[STATE.WALKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 23, 571, 95, 107, 8, 0.33, 315, true, true);
        this.animations[STATE.WALKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 49, 781, 99, 95, 8, 0.2, 315, false, true);

        // attacking animation
        this.animations[STATE.ATTACKING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 0, 297, 317, 3, 0.1, 43, false, true);
        this.animations[STATE.ATTACKING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3575, 843, 303, 322, 3, 0.1, 40, false, true);

        // jumping animation
        this.animations[STATE.JUMPING][FACING_SIDE.RIGHT] = new Animator(this.spritesheet, 0, 0, 297, 317, 3, 0.1, 43, false, true);
        this.animations[STATE.JUMPING][FACING_SIDE.LEFT] = new Animator(this.spritesheet, 3575, 843, 303, 322, 3, 0.1, 40, false, true);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);

        this.lastBBMeleeAttackRange = this.BBMeleeAttackRange;
        this.BBMeleeAttackRange = new BoundingBox(this.x + this.width, this.y, 20, this.height);
    };

    update() {

        const TICK = this.game.clockTick;
        // var delta = this.velocity * TICK;
        // console.log(delta);
        // this.x += delta;

        // if (this.x >= PARAMS.CANVAS_WIDTH) {
        //     this.x = -140;
        // }
        if (!this.game.left && !this.game.right) {
            this.state = STATE.IDLE;
            this.velocity.x = 0;
        } else if (this.game.left) {
            this.facing = FACING_SIDE.LEFT;
            this.state = STATE.WALKING;
            this.velocity.x = -MIN_WALK;

            this.x = Math.max(0, this.x);
        } else if (this.game.right) {
            this.facing = FACING_SIDE.RIGHT;
            this.state = STATE.WALKING;
            this.velocity.x = MIN_WALK;

            this.x = Math.min(this.x, MAX_WIDTH - 16 * PARAMS.SCALE);
        }

        if (this.attacking) {
            this.state = STATE.ATTACKING;
        }

        // if (this.game.up & this.state !== 4) {
        //     this.state = 4;
        //     this.init = true;
            
        //     if (this.initJump) {
        //         this.initJump = false;
        //         this.startJumpY = this.y;
        //         this.velocity.y = -40;
        //     } else {
        //         this.jumped = this.startJumpY - this.y;
        //         if (this.jumped >= MAX_FALL) {
        //             this.velocity.y -= 10;
        //         } else {
        //             this.velocity.y += 3;
        //         }
        //     }

        // }

        var falling = true;
        // collision
        var that = this;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.game.entities.forEach(function (entity) {
            // if (entity.BB && that.BB.collide(entity.BB)) {
            //     entity.x = 0;
            //     entity.state = STATE.IDLE;
            // }
            if (!(entity instanceof MainCharacter) && entity.BB && that.BB.collide(entity.BB)) {
                entity.velocity.x = 0;
                entity.state = STATE.IDLE;
                if (that.velocity.y > 0) {
                    // console.log("that.BB.bottom: " + that.BB.bottom);
                    // console.log("entity.BB.top: " + entity.BB.top);
                    if (that.canCollide(entity)) {
                        if (that.velocity.y > 0 && entity.BB.top < (that.y + that.height)) { // falling
                            that.y -= that.velocity.y;
                            that.velocity.y = 0;
                        } else if (that.velocity.y < 0 && entity.BB.bottom > that.y) {      // jumping
                            that.y -= that.velocity.y;
                            that.velocity.y = 0;
                        }
                        falling = false;

                        // if(that.state === 4) that.state = 0; // set state to idle
                    }
                } else if (that.velocity.y < 0) {
                    // console.log("that.BB.bottom: " + that.BB.bottom);
                    // console.log("entity.BB.top: " + entity.BB.top);
                    if (that.canCollide(entity)) {
                        if (that.velocity.y > 0 && entity.BB.top < (that.y + that.height)) { // falling
                            that.y -= that.velocity.y;
                            that.velocity.y = 0;
                        } else if (that.velocity.y < 0 && entity.BB.bottom > that.y) {      // jumping
                            that.y -= that.velocity.y;
                            that.velocity.y = 0;
                        }
                        falling = false;

                        // if(that.state === 4) that.state = 0; // set state to idle
                    }

                } else if (that.velocity.x !== 0) {
                    if (that.canCollide(entity)) {
                        if ((that.velocity.x > 0 && entity.BB.left > that.x) || (that.velocity.x < 0 && entity.BB.left < that.x)) {
                            that.x -= that.velocity.x;
                            that.velocity.x = 0;
                        }

                    }
                }
            }
        })
        // if (falling && this.velocity.y === 0) {
        //     this.velocity.y = 6;
        // }
        this.updateBB();

        var cameraCharacter = this.x - this.game.camera.x;
        if (this.velocity.x < 0 && cameraCharacter < 300) {
            this.game.camera.x += this.velocity.x;
            this.game.camera.x = Math.max(0, this.game.camera.x);
        } else if (this.velocity.x > 0 && cameraCharacter > 700) {
            this.game.camera.x += this.velocity.x;
            this.game.camera.x = Math.min(this.game.camera.x , MAX_WIDTH - PARAMS.CANVAS_WIDTH);
        }

    };

    canCollide(entity) {
        if (entity instanceof Brick1 || entity instanceof Brick2 || entity instanceof BigBrick
            || entity instanceof FloatingBrick1 || entity instanceof FloatingBrick2
            || entity instanceof Tile1 || entity instanceof Tile2
            || entity instanceof Tile3 || entity instanceof Tile4
            || entity instanceof Tile5 || entity instanceof Tile6)
            return true;
        return false;
    }

    draw(ctx) {

        if (this.dead) {
            this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, 0.9);//PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBMeleeAttackRange.x, this.BBMeleeAttackRange.y, this.BBMeleeAttackRange.width, this.BBMeleeAttackRange.height);
        }
    };

};
