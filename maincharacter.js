/**
 * TCSS 491 - Winter 2021 - Professor Chris Marriott
 * Group: Gold 5
 * Members: Hung Thai, Dung Tran, Quoc Phung
 */

class MainCharacter {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game.main = this;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/1.png");

        // this.velocity = 200;

        // mario's state variables
         // 0 = little, 1 = big, 2 = super, 3 = little invincible, 4 = big invincible, 5 = super invincible
        this.facing = FACING_SIDE.RIGHT; // 0 = right, 1 = left
        this.state = STATE.IDLE; // 0 = idle, 1 = walking, 2 = running, 3 = skidding, 4 = jumping/falling, 5 = ducking
        this.dead = false;

        this.velocity = { x: 0, y: 0 };

        // mario's animations
        this.animations = [];
        this.loadAnimations();

        this.width = PARAMS.BLOCKWIDTH;
        if (this.size === 0 || this.size === 3) {
            this.height = PARAMS.BLOCKWIDTH * 2;
            this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        }
        else {
            this.height = PARAMS.BLOCKWIDTH * 2;
            this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        }
        this.updateBB();
    };

    loadAnimations() {
        for (var i = 0; i < 6; i++) { // six states
            this.animations.push([]);
                 for (var k = 0; k < 2; k++) { // two directions
                    this.animations[i].push([]);
                }
            
        }

        // idle animation for state = 0
        // facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, 60, 30, 330, 342, 2, 0.33, 87, false, true);
        // this.animations[0][0] = new Animator(this.spritesheet, 60, 29, 332, 342, 2, 0.33, 87, false, true);
        // this.animations[0][0] = new Animator(this.spritesheet, 470, 28, 329, 30, 2, 0.33, 79, false, true);
        // this.animations[0][0] = new Animator(this.spritesheet, 890, 27, 323, 337, 2, 0.33, 87, false, true);

        // facing left = 1
        this.animations[0][1] = new Animator(this.spritesheet, 2543, 30, 330, 340, 2, 0.33, 87, true, true);
        // this.animations[0][1] = new Animator(this.spritesheet, 3287, 22, 335, 334, 2, 0.33, 87, false, true);
        // this.animations[0][1] = new Animator(this.spritesheet, 2859, 30, 331, 340, 2, 0.33, 87, true, true);
        // this.animations[0][1] = new Animator(this.spritesheet, 2452, 30, 16, 32, 2, 0.33, 87, false, true);

        // walk animation
        // facing right
        this.animations[1][0] = new Animator(this.spritesheet, 69, 455, 280, 329, 4, 0.1, 150, false, true);
        // this.animations[1][0] = new Animator(this.spritesheet, 489, 443, 308, 319, 2, 0.1, 135, false, true);
        // this.animations[1][0] = new Animator(this.spritesheet, 947, 456, 293, 308, 2, 0.1, 142, false, true);

         // walk animation
        // facing left
        this.animations[1][1] = new Animator(this.spritesheet, 2750, 453, 293, 319, 2, 0.1, 142, false, true);
        // this.animations[1][1] = new Animator(this.spritesheet, 3650, 438, 280, 324, 2, 0.1, 149, false, true);
        // this.animations[1][1] = new Animator(this.spritesheet, 3250, 447, 311, 318, 2, 0.1, 135, false, true);
        // this.animations[1][1] = new Animator(this.spritesheet, 2750, 453, 293, 319, 2, 0.1, 142, false, true);

          // run animation
        // facing right
        // this.animations[2][0] = new Animator(this.spritesheet, 0, 0, 297, 317, 3, 0.1, 43, false, true);
        // this.animations[2][0] = new Animator(this.spritesheet, 336, 842, 283, 324, 3, 0.1, 72, false, true);
        // this.animations[2][0] = new Animator(this.spritesheet, 690, 847, 283, 321, 3, 0.1, 94, false, true);
        // this.animations[2][0] = new Animator(this.spritesheet, 1419, 854, 307, 326, 3, 0.1, 127, false, true);

        // run animation
        // facing right
        // this.animations[2][0] = new Animator(this.spritesheet, 3575, 843, 303, 322, 3, 0.1, 40, false, true);
        // this.animations[2][0] = new Animator(this.spritesheet, 3248, 838, 290, 325, 3, 0.1, 73, false, true);
        // this.animations[2][0] = new Animator(this.spritesheet, 2882, 860, 285, 327, 3, 0.1, 95, false, true);
        // this.animations[2][0] = new Animator(this.spritesheet, 1419, 854, 307, 326, 2, 0.1, 127, false, true);
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.size === 0 || this.size === 3) {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        else {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        }
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
            if (!(entity instanceof MainCharacter) && entity.BB && that.BB.collide(entity.BB)) {
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
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, 0.3);
            // this.animations[this.state][this.size][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
        }
    };

};
