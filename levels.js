class firstLevel {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
       
    }

    loadLevel(x, y) {
        this.game.entities = [];
        this.x = 0;
      
        ASSET_MANAGER.playAsset("./music/final-boss-music.mp3");

        // first background
        for (var i = 0; i <= 10; i++) {
          let background = new forest(this.game, i * PARAMS.CANVAS_WIDTH, 0);
          this.game.addEntity(background);
        }
        
        // Add mobs 
        // Dark mage squad
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new DarkMage(this.game, 500 * i, 375)
          );
        }
        
    
        // Birdman squad
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new BirdMan(this.game, 200 * i, 525)
          );
        }
    
        // Flying Demon squad
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new FlyingDemon(this.game, 1000 * i, 50)
          );
        }
    
        // Nightmare Horse squad
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new NightmareHorse(this.game, 1000 * i, 450, FACING_SIDE.LEFT)
          );
        }


        this.game.main = new MainCharacter(
          this.game,
          6.5 * 16,
          // 32 * 16
          32 * 16
        );
      
        this.game.main.x = x;
        this.game.addEntity(this.game.main);

      }
}

class secondLevel {
    constructor(game, main, x, y){
        Object.assign(this, {game, main, x, y});

    }

    loadLevel(x, y) {
        this.game.entities = [];
        this.x = 0;

        // ASSET_MANAGER.playAsset("./music/second-stage-music.mp3");
    
        // first background
        for (var i = 0; i <= 5; i++) {
          let background = new cave(this.game, i * PARAMS.CANVAS_WIDTH, 0);
          this.game.addEntity(background);
        }
    
        // Add mobs 
        // assassin cultists
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new assassinCultist(this.game, 800 * i, 475)
          );
        }
        // big cultists
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new bigCultist(this.game, 900 * i, 300)
          );
        }
        // mage cultists
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new mageCultist(this.game, 1000 * i, 450)
          );
        }
        // twisted cultists
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new twistedCultist(this.game, 800 * i, 450)
          );
        }

        this.game.main = new MainCharacter(
          this.game,
          6.5 * 16,
          460
        );
    
        this.game.main.x = x;
        this.game.addEntity(this.game.main);
      }
}

class finalLevel {
  constructor(game, main, x, y){
      Object.assign(this, {game, main, x, y});

  }

  loadLevel(x, y) {
      this.game.entities = [];
      this.x = 0;
  
      // first background
      for (var i = 0; i <= 5; i++) {
        let background = new abandonCastle(this.game, i * PARAMS.CANVAS_WIDTH, 0);
        this.game.addEntity(background);
      }

      // Add mobs

  
      this.game.addEntity(new Boss(this.game, 1000, 300));

      this.game.main = new MainCharacter(
        this.game,
        6.5 * 16,
        32 * 16
      );

      this.game.main.x = x;
      this.game.addEntity(this.game.main);
    }
}

class StartLevel {
       constructor(game, main, x, y){
      Object.assign(this, {game, main, x, y});

  }

  loadLevel(x, y) {
      let background = new Start(this.game, 0, 0);
      this.game.addEntity(background);
    }
}