class Brick1 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    }
    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 48, 0, 18, 17, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Brick2 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    }
    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 48, 18, 18, 18, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 1);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class BigBrick {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 3);
    }
    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 0, 96, 32, 52, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 3);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class FloatingBrick1 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 0.5);
    }
    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 80, 48, 48, 10, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 0.5);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class FloatingBrick2 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 0.5);
    }
    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 112, 64, 16, 10, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 0.5);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Tile1 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile3.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 2);
    }

    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 160, 112, 32, 32, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 2);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Tile2 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2.8, PARAMS.BLOCKWIDTH * 3);
    }

    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 0, 0, 48, 48, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 2.8, PARAMS.BLOCKWIDTH * 3);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Tile3 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile3.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4);
    }

    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 256, 48, 32, 64, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Tile4 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile3.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 3.7);
    }

    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 160, 52, 78, 60, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 3.7)

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Tile5 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile3.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 6);
    }
    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 48, 48, 94, 94, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 6);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Tile6 {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset/tile2.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 4.5, PARAMS.BLOCKWIDTH * 3.5);
    }
    update(){

    }
    drawMinimap(ctx, mmx, mmy){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, 64, 0, 64, 48, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH * 4.5, PARAMS.BLOCKWIDTH * 3.5);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}