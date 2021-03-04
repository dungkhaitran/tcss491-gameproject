class firstLevel {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        
    }

    loadLevel(x, y) {
        this.game.entities = [];
        this.x = 0;
    
        // first background
        for (var i = 0; i <= 5; i++) {
          let background = new forest(this.game, i * PARAMS.CANVAS_WIDTH, 0);
          this.game.addEntity(background);
        }
    
        this.game.addEntity(new healthPotion(this.game, 300, 570));
        
        // Add mobs 
        // Dark mage squad
        for(var i = 1; i <= 2; i++){
          this.game.addEntity(
            new DarkMage(this.game, 1300 * i, 375)
          );
        }
    
        // Birdman squad
        for(var i = 1; i <= 2; i++){
          this.game.addEntity(
            new BirdMan(this.game, 1000 * i, 525)
          );
        }
    
        // Flying Demon squad
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new FlyingDemon(this.game, 1500 * i, 50)
          );
        }
    
        // Nightmare Horse squad
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new NightmareHorse(this.game, 1200 * i, 450, FACING_SIDE.LEFT)
          );
        }
        
        // Knight squad
        // for(var i = 1; i <= 1; i++){
        //   this.game.addEntity(
        //     new Knight(this.game, 500 * i, 400)
        //   );
        // }
        

        this.game.main = new MainCharacter(
          this.game,
          6.5 * 16,
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
    
        // first background
        for (var i = 0; i <= 5; i++) {
          let background = new cave(this.game, i * PARAMS.CANVAS_WIDTH, 0);
          this.game.addEntity(background);
        }
    
        // Add mobs 
        // assassin cultists
        for(var i = 1; i <= 2; i++){
          this.game.addEntity(
            new assassinCultist(this.game, 800 * i, 475)
          );
        }
        // big cultists
        for(var i = 1; i <= 1; i++){
          this.game.addEntity(
            new bigCultist(this.game, 1300 * i, 300)
          );
        }
        // mage cultists
        for(var i = 1; i <= 2; i++){
          this.game.addEntity(
            new mageCultist(this.game, 1000 * i, 450)
          );
        }
        // twisted cultists
        for(var i = 1; i <= 2; i++){
          this.game.addEntity(
            new twistedCultist(this.game, 900 * i, 450)
          );
        }

        this.game.main = new MainCharacter(
          this.game,
          6.5 * 16,
          450
        );
    
        this.game.main.x = x;
        this.game.addEntity(this.game.main);
      }
}

// class finalLevel {
//   constructor(game, main, x, y){
//       Object.assign(this, {game, main, x, y});

//   }

//   loadLevel(x, y) {
//       this.game.entities = [];
//       this.x = 0;
  
//       // first background
//       for (var i = 0; i <= 5; i++) {
//         let background = new oldCastle(this.game, i * PARAMS.CANVAS_WIDTH, 0);
//         this.game.addEntity(background);
//       }
  
      

//       // big cultists
//        for(var i = 1; i <= 1; i++){
//         this.game.addEntity(
//           new bigCultist(this.game, 500 * i, 350)
//         );
//       }


//       this.main.x = x;
//       this.game.addEntity(this.main);
//     }
// }

class LoseLevel {
  constructor(game, main, x, y){
      Object.assign(this, {game, main, x, y});

  }

  loadLevel(x, y) {
      let background = new Lose(this.game, 0, 0);
      this.game.addEntity(background);
    }
}

class WinLevel {
  constructor(game, main, x, y){
      Object.assign(this, {game, main, x, y});

  }

  loadLevel(x, y) {
      let background = new Win(this.game, 0, 0);
      this.game.addEntity(background);
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