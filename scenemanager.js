class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;

    this.levels = [];
    this.loadGameLevels();
  }

  loadGameLevels() {
    this.levels[1] = new firstLevel(this.game, this.x, this.y)
    this.levels[2] = new secondLevel(this.game, this.x, this.y)
  }

  loadGame() {
    if (this.game.state === GAME_STATE.LOSE) {
      console.log(this.game.state)
      new LoseLevel(this.game, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH)
    } else if (this.game.state === GAME_STATE.WIN) {
      new WinLevel(this.game, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH)
    } else {
      this.levels[this.game.level].loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH)
    }
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
