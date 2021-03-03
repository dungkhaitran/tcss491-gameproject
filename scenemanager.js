class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;
  
   
    this.levels = [];
    this.loadGameLevels();
  }

  loadGameLevels() {
    // this.firstLevel = new firstLevel(this.game, this.main, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
    // this.secondLevel = new secondLevel(this.game, this.main, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
    // this.finalLevel = new finalLevel(this.game, this.main, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
    this.levels[1] = new firstLevel(this.game, this.x, this.y)
    this.levels[2] = new secondLevel(this.game, this.x, this.y)
   
 
  }

  loadGame() {
    if (this.game.state === GAME_STATE.LOSE) {
      new LoseLevel(this.game, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH)
    } else if (this.game.state === GAME_STATE.WIN) {
      new WinLevel(this.game, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH)
    }else if(this.game.state === GAME_STATE.START){
      new StartLevel(this.game, this.x, this.y).loadLevel(2.5 * PARAMS.BLOCKWIDTH,0 * PARAMS.BLOCKWIDTH)
    }else {
      this.levels[this.game.level].loadLevel(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH)
    }
  }
  /* audio
  updateAudio(){
    var mute = document.getElementById("mute").checked;
    var volume = document.getElementById("volume").value;

    ASSET_MANAGER.muteAudio(mute);
    ASSET_MANAGER.adjustVolume(volume);
  };
  */
  update() {
    PARAMS.DEBUG = document.getElementById("debug").checked;
    this.updateAudio();
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
