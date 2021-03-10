/**
 * TCSS 491 - Winter 2021 - Professor Chris Marriott
 * Group: Gold 5
 * Members: Hung Thai, Dung Tran, Quoc Phung
 */

 // main character
var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/full-main.png");

//backgrounds
ASSET_MANAGER.queueDownload("./sprites/background/abandon-castle.png");
ASSET_MANAGER.queueDownload("./sprites/background/cave.jpg");
ASSET_MANAGER.queueDownload("./sprites/background/forest.png");
ASSET_MANAGER.queueDownload("./sprites/background/blood-forest.png");
ASSET_MANAGER.queueDownload("./sprites/background/old-dark-castle.png");
ASSET_MANAGER.queueDownload("./sprites/background/lose.png");
ASSET_MANAGER.queueDownload("./sprites/background/win.png");
ASSET_MANAGER.queueDownload("./sprites/background/start.png");

// enemies
ASSET_MANAGER.queueDownload("./sprites/mobs/birdman.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/darkmage.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/flying-demon.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/nightmare-horse.png");

ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/assassin-cultist.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/big-cultist.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/mage-cultist.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/twisted-cultist.png");

ASSET_MANAGER.queueDownload("./sprites/mobs/knight.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/archer.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/knight-2.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/skeleton.png");

// boss
ASSET_MANAGER.queueDownload("./sprites/boss/boss.png");
ASSET_MANAGER.queueDownload("./sprites/boss/boss-skills.png"); // skills

// projectiles
ASSET_MANAGER.queueDownload("./sprites/projectiles/dark-fire.png"); // skill of dark mage
ASSET_MANAGER.queueDownload("./sprites/projectiles/fire-skull.png"); // skill of 
ASSET_MANAGER.queueDownload("./sprites/projectiles/breath-fire.png"); // skill of flying demon
ASSET_MANAGER.queueDownload("./sprites/projectiles/arrow.png"); // skill of archer
ASSET_MANAGER.queueDownload("./sprites/projectiles/tornado.png"); // skill of 
ASSET_MANAGER.queueDownload("./sprites/projectiles/tesla-ball.png"); // skill of 


//background music
ASSET_MANAGER.queueDownload("./music/first-stage-music.mp3");
ASSET_MANAGER.queueDownload("./music/second-stage-music.mp3");
ASSET_MANAGER.queueDownload("./music/final-boss-music.mp3");

// items
ASSET_MANAGER.queueDownload("./sprites/decoration/health-potion.png");


ASSET_MANAGER.downloadAll(function () {
  var gameEngine = new GameEngine();

  ASSET_MANAGER.autoRepeat("./music/first-stage-music.mp3");
  ASSET_MANAGER.autoRepeat("./music/second-stage-music.mp3");
  ASSET_MANAGER.autoRepeat("./music/final-boss-music.mp3");


  PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  PARAMS.CANVAS_WIDTH = canvas.width;

  gameEngine.init(ctx);

  new SceneManager(gameEngine);

  gameEngine.start();
});
