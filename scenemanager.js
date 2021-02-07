class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;

    this.main = new MainCharacter(
      this.game,
      5.5 * PARAMS.BLOCKWIDTH,
      11 * PARAMS.BLOCKWIDTH
    );

    this.game.main = this.main;

    this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
  }

  loadLevelOne(x, y) {
    this.game.entities = [];
    this.x = 0;

    // first background
    for (var i = 0; i <= 1; i++) {
      let background = new nightBackground(this.game, i * PARAMS.CANVAS_WIDTH, 0);
      this.game.addEntity(background);
    }

    // Add ground level
    for (var i = -2; i < 100; i += 4) {
      this.game.addEntity(
        new Tile5(this.game, PARAMS.BLOCKWIDTH * i, PARAMS.BLOCKWIDTH * 13)
      );
    }

    // Add mobs
    this.game.addEntity(
      new Bat(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 1)
    );
    this.game.addEntity(
      new Enemy2(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 7.2)
    );
    this.game.addEntity(
      new Enemy1(this.game, PARAMS.BLOCKWIDTH * 15, PARAMS.BLOCKWIDTH * 10.5)
    );
    this.main.x = x + 7 * PARAMS.BLOCKWIDTH;
    this.game.addEntity(this.main);
  }

  update() {
    PARAMS.DEBUG = document.getElementById("debug").checked;

    // let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;

    // if (this.x < this.man.x - midpoint) {
    //     this.x = this.man.x - midpoint;
    // }

    // if (this.man.dead && this.man.y > PARAMS.BLOCKWIDTH * 16) {
    //     this.man.dead = false;
    //     this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
    // };
  }

  draw(ctx) {
    ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
    ctx.fillStyle = "White";
    ctx.fillText("MARRIOTT", 1.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
  }
}

class Minimap {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });
  }

  update() {}

  draw(ctx) {
    ctx.strokeStyle = "Black";
    ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
    for (var i = 0; i < this.game.entities.length; i++) {
      this.game.entities[i].drawMinimap(ctx, this.x, this.y);
    }
  }
}
