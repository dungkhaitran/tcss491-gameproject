// Extra decorations for the backgrounds

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

class animatedDoor {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/animated-door.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 112, 164, 16, 12, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);
    };
}

class flame {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/flame.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 112, 164, 16, 12, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);
    };
}

class lampStand {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/lamp-stand.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 112, 164, 16, 12, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);
    };
}

class torch {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/torch.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 112, 164, 16, 12, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);
    };
}

class healthPotion {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/decoration/health-potion.png");
    }
    update() {

    };

    drawMiniMap(ctx, mmx, mmy) {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 112, 164, 16, 12, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);
    };
}