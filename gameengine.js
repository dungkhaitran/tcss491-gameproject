/**
 * TCSS 491 - Winter 2021 - Professor Chris Marriott
 * Group: Gold 5
 * Members: Hung Thai, Dung Tran, Quoc Phung
 */

class GameEngine {
    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.reset()
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    reset() {
        this.entities = [];

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.state = GAME_STATE.START
        this.level = 1
    }

    start() {
        var that = this;
        that.camera.loadGame();
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;

        this.ctx.canvas.addEventListener("keydown", function (e) {
            if (that.state != GAME_STATE.ONGOING) {
                return
            }
            switch (e.code) {
                case "ArrowLeft":
                    that.left = true;
                    break;
                case "ArrowRight":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "Space":
                    if (that.main.canJump) {
                        that.jumping = true;
                    }
                    break;
                case "KeyQ":
                    if (that.main.canAttackMelee) {
                        that.attacking = true;
                    }
                    break;
                case "KeyW":
                    // if (that.main.canAttackMelee2) {
                    //     that.attacking2 = true;
                    // }
                    if (that.main.canCastSkill2 && that.main.canCastSkill3) {
                        that.castSkill2 = true;
                    }
                    break;
                case "KeyE":
                    if (that.main.canCastSkill2 && that.main.canCastSkill3) {
                        that.castSkill3 = true;
                    }
                    break;
                }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            if (that.state !== GAME_STATE.ONGOING) {
                if (e.code === "Enter") {
                    if (that.main) {
                        that.main.reset()
                    }
                    that.reset()
                    if (that.camera) {
                        that.camera.x = 0
                    }

                    if (that.state === GAME_STATE.START) {
                        that.state = GAME_STATE.ONGOING
                        that.camera.loadGame()
                    }
                }
                return
            }
            switch (e.code) {
                case "ArrowLeft":
                    that.left = false;
                    break;
                case "ArrowRight":
                    that.right = false;
                    break;
            }
        }, false);    
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    clearBullets() {
        for (var i = this.entities.length - 1; i >= 0; --i) {
            var entity = this.entities[i]
            if (entity instanceof Bullet) {
                this.entities.splice(i, 1);
            }
        }
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    };

    update() {
        if (this.state != GAME_STATE.ONGOING) {
            return
        }
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (entity && !entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};
