/**
 * TCSS 491 - Winter 2021 - Professor Chris Marriott
 * Group: Gold 5
 * Members: Hung Thai, Dung Tran, Quoc Phung
 */

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/2.png");

//backgrounds
ASSET_MANAGER.queueDownload("./sprites/background/ParFull.png");
ASSET_MANAGER.queueDownload("./sprites/background/forest.png");
ASSET_MANAGER.queueDownload("./sprites/background/blood-forest.png");
ASSET_MANAGER.queueDownload("./sprites/background/old-dark-castle.png");
ASSET_MANAGER.queueDownload("./sprites/background/night-town.png");
ASSET_MANAGER.queueDownload("./sprites/background/Castle-Background.png");
ASSET_MANAGER.queueDownload("./sprites/background/Ice-Background.png");
ASSET_MANAGER.queueDownload("./sprites/background/lose.png");
ASSET_MANAGER.queueDownload("./sprites/background/win.png");
ASSET_MANAGER.queueDownload("./sprites/background/start.png");

// tiles
ASSET_MANAGER.queueDownload("./sprites/tileset/tile1.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile2.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile3.png");

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
ASSET_MANAGER.queueDownload("./sprites/mobs/Fullmain.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/archer.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/knight-2.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/skeleton.png");

// projectiles
ASSET_MANAGER.queueDownload("./sprites/projectiles/dark-fire.png"); // skill of dark mage
ASSET_MANAGER.queueDownload("./sprites/projectiles/fire-skull.png"); // skill of 
ASSET_MANAGER.queueDownload("./sprites/projectiles/breath-fire.png"); // skill of flying demon
ASSET_MANAGER.queueDownload("./sprites/projectiles/arrow.png"); // skill of archer
ASSET_MANAGER.queueDownload("./sprites/projectiles/tornado.png"); // skill of 
ASSET_MANAGER.queueDownload("./sprites/projectiles/tornado-2.png"); // skill of

ASSET_MANAGER.queueDownload("./sprites/effects/aura.png");
ASSET_MANAGER.queueDownload("./sprites/effects/beam.png");
ASSET_MANAGER.queueDownload("./sprites/effects/explosion.png");
ASSET_MANAGER.queueDownload("./sprites/effects/shine.png");
ASSET_MANAGER.queueDownload("./sprites/effects/snow.png");
ASSET_MANAGER.queueDownload("./sprites/effects/spark.png");
ASSET_MANAGER.queueDownload("./sprites/effects/sunburn.png");


ASSET_MANAGER.downloadAll(function () {
  var gameEngine = new GameEngine();

  PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  PARAMS.CANVAS_WIDTH = canvas.width;

  gameEngine.init(ctx);

  new SceneManager(gameEngine);

  gameEngine.start();
});
