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

// tiles
ASSET_MANAGER.queueDownload("./sprites/tileset/tile1.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile2.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile3.png");

// enemies
ASSET_MANAGER.queueDownload("./sprites/mobs/bat.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/birdman.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/darkmage.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/flying-demon.png");


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
