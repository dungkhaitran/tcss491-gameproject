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
ASSET_MANAGER.queueDownload("./sprites/background/Castle-Background.png");
ASSET_MANAGER.queueDownload("./sprites/background/Ice-Background.png");

// tiles
ASSET_MANAGER.queueDownload("./sprites/tileset/tile1.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile2.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile3.png");

// enemies
ASSET_MANAGER.queueDownload("./sprites/mobs/bat.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/birdman.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/darkmage.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/flying-demon.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/nightmare-horse.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/knight.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/Fullmain.png");

ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/assassin-cultist.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/big-cultist.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/mage-cultist.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/cultist/twisted-cultist.png");

// projectiles
ASSET_MANAGER.queueDownload("./sprites/projectiles/dark-fire.png"); // skill of dark mage
ASSET_MANAGER.queueDownload("./sprites/projectiles/fire-skull.png"); // skill of 
ASSET_MANAGER.queueDownload("./sprites/projectiles/breath-fire.png"); // skill of flying demon


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
