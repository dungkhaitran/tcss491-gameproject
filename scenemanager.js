class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;

    this.main = new MainCharacter(
      this.game,
      5.5 * PARAMS.BLOCKWIDTH,
      10 * PARAMS.BLOCKWIDTH
    );

    this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
  }

  loadLevelOne(x, y) {
    this.game.entities = [];
    this.x = 0;

    // Outdoor background
    for (var i = 0; i <= 1; i++) {
      let background = new Outdoor(this.game, i * PARAMS.CANVAS_WIDTH, 0);
      this.game.addEntity(background);
    }

    // Add background walls
    this.game.addEntity(
      new Wall1(this.game, 2.7 * PARAMS.BLOCKWIDTH, 0.7 * PARAMS.BLOCKWIDTH)
    );
    for (var i = 0; i <= 20; i++) {
      this.game.addEntity(
        new Wall2(
          this.game,
          i * 2.4 * PARAMS.BLOCKWIDTH,
          8.5 * PARAMS.BLOCKWIDTH
        )
      );
    }
    for (var i = -0.35; i <= 20; i++) {
      if (i === 1.65) {
        continue;
      }
      this.game.addEntity(
        new Wall2(
          this.game,
          i * 2.4 * PARAMS.BLOCKWIDTH,
          3.5 * PARAMS.BLOCKWIDTH
        )
      );
    }
    for (var i = 0; i <= 20; i++) {
      this.game.addEntity(
        new Wall2(
          this.game,
          i * 2.4 * PARAMS.BLOCKWIDTH,
          -1.5 * PARAMS.BLOCKWIDTH
        )
      );
    }

    // Add background decorations
    this.game.addEntity(
      new Flag(this.game, PARAMS.BLOCKWIDTH * 1.5, PARAMS.BLOCKWIDTH)
    );
    this.game.addEntity(
      new Window(this.game, PARAMS.BLOCKWIDTH * 3.6, PARAMS.BLOCKWIDTH * 5.1)
    );
    this.game.addEntity(
      new Flag(this.game, PARAMS.BLOCKWIDTH * 6.6, PARAMS.BLOCKWIDTH)
    );
    this.game.addEntity(
      new Pillar(this.game, PARAMS.BLOCKWIDTH * 10.4, PARAMS.BLOCKWIDTH * 0.5)
    );
    this.game.addEntity(
      new BackPillar(this.game, PARAMS.BLOCKWIDTH * 16, PARAMS.BLOCKWIDTH * 6)
    );
    this.game.addEntity(
      new FrontPillar(this.game, PARAMS.BLOCKWIDTH * 18, PARAMS.BLOCKWIDTH * 6)
    );

    // Add roof level
    this.game.addEntity(
      new Tile3(this.game, PARAMS.BLOCKWIDTH * -0.8, PARAMS.BLOCKWIDTH * -1)
    );
    this.game.addEntity(
      new Tile1(this.game, PARAMS.BLOCKWIDTH * 4.2, PARAMS.BLOCKWIDTH * 1)
    );
    this.game.addEntity(
      new Tile3(this.game, PARAMS.BLOCKWIDTH * 10, PARAMS.BLOCKWIDTH * -1)
    );

    for (var i = 0; i < 100; i += 3.8) {
      this.game.addEntity(
        new Tile5(this.game, PARAMS.BLOCKWIDTH * i, PARAMS.BLOCKWIDTH * -4.5)
      );
    }
    this.game.addEntity(
      new Wall1(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * -4)
    );
    for (var i = 6; i < 100; i += 3.8) {
      this.game.addEntity(
        new Wall1(this.game, PARAMS.BLOCKWIDTH * i, PARAMS.BLOCKWIDTH * -4.4)
      );
    }

    // Add floating level
    this.game.addEntity(
      new FloatingBrick1(
        this.game,
        PARAMS.BLOCKWIDTH * 3.6,
        PARAMS.BLOCKWIDTH * 8
      )
    );

    this.game.addEntity(
      new FloatingBrick2(
        this.game,
        PARAMS.BLOCKWIDTH * 13.8,
        PARAMS.BLOCKWIDTH * 5.5
      )
    );
    this.game.addEntity(
      new FloatingBrick2(
        this.game,
        PARAMS.BLOCKWIDTH * 12,
        PARAMS.BLOCKWIDTH * 7
      )
    );
    this.game.addEntity(
      new FloatingBrick2(
        this.game,
        PARAMS.BLOCKWIDTH * 13.5,
        PARAMS.BLOCKWIDTH * 8.5
      )
    );

    this.game.addEntity(
      new Tile4(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 4.5)
    );
    this.game.addEntity(
      new Tile5(this.game, PARAMS.BLOCKWIDTH * 14.5, PARAMS.BLOCKWIDTH * 0.5)
    );

    // Add ground level
    this.game.addEntity(
      new Tile5(this.game, PARAMS.BLOCKWIDTH * -4.5, PARAMS.BLOCKWIDTH * 9)
    );
    this.game.addEntity(
      new Tile1(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 12)
    );
    this.game.addEntity(
      new Tile2(this.game, PARAMS.BLOCKWIDTH * 2.9, PARAMS.BLOCKWIDTH * 12)
    );

    this.game.addEntity(
      new Tile3(this.game, PARAMS.BLOCKWIDTH * 10, PARAMS.BLOCKWIDTH * 10)
    );
    this.game.addEntity(
      new Tile2(this.game, PARAMS.BLOCKWIDTH * 8.5, PARAMS.BLOCKWIDTH * 12)
    );
    this.game.addEntity(
      new BigBrick(this.game, PARAMS.BLOCKWIDTH * 11, PARAMS.BLOCKWIDTH * 11)
    );
    this.game.addEntity(
      new BigBrick(this.game, PARAMS.BLOCKWIDTH * 13, PARAMS.BLOCKWIDTH * 11)
    );

    this.game.addEntity(
      new Tile5(this.game, PARAMS.BLOCKWIDTH * 14, PARAMS.BLOCKWIDTH * 11)
    );
    for (var i = 18; i < 100; i += 4) {
      this.game.addEntity(
        new Tile5(this.game, PARAMS.BLOCKWIDTH * i, PARAMS.BLOCKWIDTH * 13)
      );
    }

    // Add mobs
    this.game.addEntity(
      new Bat(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 3)
    );
    this.game.addEntity(
      new Bat(this.game, PARAMS.BLOCKWIDTH * 16, PARAMS.BLOCKWIDTH * 9)
    );
    this.game.addEntity(
      new Bat(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 6)
    );

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
