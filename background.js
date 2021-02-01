class Outdoor {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/ParFull.png");
    };

    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.spritesheet.width, this.spritesheet.height, 
            this.x - this.game.camera.x, this.y, 1000, 650);
    };

};

class Wall1 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 48, 48, 48, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 5);
    };
}

class Wall2 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 48, 48, 32, 64, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 2.5, PARAMS.BLOCKWIDTH * 5);
    };
}

class Wall3 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile3.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 400, 48, 80, 80, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 5);
    };
}

class Window {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/deco1.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 74, 8, 42, 56, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 3);
    };
}

class Flag {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/deco1.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 272, 0, 30, 48, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4);
    };
}

class Pillar {
    constructor(game, x, y, length){
        Object.assign(this, {game, x, y, length});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/deco1.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 18, 0, 24, 50, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1.2, PARAMS.BLOCKWIDTH * 5);
    };
}

class FrontPillar {
    constructor(game, x, y, height){
        Object.assign(this, {game, x, y, height});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 64, 116, 16, 60, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 5);
    };
}

class BackPillar {
    constructor(game, x, y, height){
        Object.assign(this, {game, x, y, height});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 80, 116, 16, 60, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 5);
    };
}

class SingleBone {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 96, 168, 10, 8, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 0.5, PARAMS.BLOCKWIDTH * 0.5);
    };
}

class Bones {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 112, 164, 16, 12, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);
    };
}