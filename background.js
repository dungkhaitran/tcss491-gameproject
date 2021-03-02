class nightTown {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/night-town.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    }
}

class oldCastle {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/old-dark-castle.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    }
}

class nightBackground {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/ParFull.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    }
}

class forest {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/forest.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    }
}

class bloodForest {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/blood-forest.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    }
}

class deadScreen {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/game-over-background.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    }
}

class Lose {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/lose.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            0, 0, 1000, 650);
    }
}

class Win {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/win.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            0, 0, 1000, 650);
    }
}
class Start {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/start.png");
    }
    update() {

    }
    drawMiniMap(ctx, mmx, mmy) {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            0, 0, 1000, 650);
    }
}
