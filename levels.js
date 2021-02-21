class firstLevel {
    constructor(game, main, x, y){
        Object.assign(this, {game, main, x, y});
        
    }

    loadLevel(x, y) {
        this.game.entities = [];
        this.x = 0;
    
        // first background
        for (var i = 0; i <= 5; i++) {
          let background = new bloodForest(this.game, i * PARAMS.CANVAS_WIDTH, 0);
          this.game.addEntity(background);
        }
    
        // Add mobs 
        // Dark mage squad
        for(var i = 1; i <= 10; i++){
          this.game.addEntity(
            new DarkMage(this.game, 1300 * i, 375)
          );
        }
    
        // Birdman squad
        for(var i = 1; i <= 20; i++){
          this.game.addEntity(
            new BirdMan(this.game, 1000 * i, 525)
          );
        }
    
        // Flying Demon squad
        for(var i = 1; i <= 5; i++){
          this.game.addEntity(
            new FlyingDemon(this.game, 1500 * i, 50)
          );
        }
    
        // Nightmare Horse squad
        for(var i = 1; i <= 10; i++){
          this.game.addEntity(
            new NightmareHorse(this.game, 2000 * i, 450, FACING_SIDE.LEFT)
          );
        }
        
        // Knight squad
        // for(var i = 1; i <= 1; i++){
        //   this.game.addEntity(
        //     new Knight(this.game, 500 * i, 400)
        //   );
        // }
        
        this.main.x = x;
        this.game.addEntity(this.main);
      }
}

class secondLevel {
    constructor(game, main, x, y){
        Object.assign(this, {game, main, x, y});

    }

    loadLevel(x, y) {
        this.game.entities = [];
        this.x = 0;
    
        // first background
        for (var i = 0; i <= 5; i++) {
          let background = new nightBackground(this.game, i * PARAMS.CANVAS_WIDTH, 0);
          this.game.addEntity(background);
        }
    
        // Add mobs 
         // Flying Demon squad
         for(var i = 1; i <= 5; i++){
          this.game.addEntity(
            new FlyingDemon(this.game, 500 * i, 50)
          );
        }
    // Dark mage squad
    for(var i = 1; i <= 10; i++){
      this.game.addEntity(
        new DarkMage(this.game, 1300 * i, 375)
      );
    }

    // Birdman squad
    for(var i = 1; i <= 20; i++){
      this.game.addEntity(
        new BirdMan(this.game, 1000 * i, 525)
      );
    }
        
        this.main.x = x;
        this.game.addEntity(this.main);
      }
}