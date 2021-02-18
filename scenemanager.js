class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;

    this.main = new MainCharacter(
      this.game,
      6.5 * 16,
      30 * 16
    );

    this.game.main = this.main;

    this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
  }

  loadLevelOne(x, y) {
    this.game.entities = [];
    this.x = 0;

    // first background
    for (var i = 0; i <= 5; i++) {
      let background = new darkForest(this.game, i * PARAMS.CANVAS_WIDTH, 0);
      this.game.addEntity(background);
    }

    // Add mobs 
    // this.game.addEntity(
    //   new Bat(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 1.01)
    // );

    // Dark mage squad
    // for(var i = 1; i <= 5; i++){
    //   this.game.addEntity(
    //     new DarkMage(this.game, 900 * i, 375)
    //   );
    // }

    // Birdman squad
    // for(var i = 1; i <= 10; i++){
    //   this.game.addEntity(
    //     new BirdMan(this.game, 900 * i, 525)
    //   );
    // }

    // Flying Demon squad
    for(var i = 1; i <= 1; i++){
      this.game.addEntity(
        new FlyingDemon(this.game, 500 * i, 50)
      );
    }

    // Nightmare Horse squad
    // for(var i = 1; i <= 2; i++){
    //   this.game.addEntity(
    //     new NightmareHorse(this.game, 500 * i, 450)
    //   );
    // }
    
    // Knight squad
    // for(var i = 1; i <= 1; i++){
    //   this.game.addEntity(
    //     new Knight(this.game, 500 * i, 400)
    //   );
    // }
    
    this.main.x = x;
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
