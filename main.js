/**
 * TCSS 491 - Winter 2021 - Professor Chris Marriott
 * Group: Gold 5
 * Members: Hung Thai, Dung Tran, Quoc Phung
 */

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/1.png");
ASSET_MANAGER.queueDownload("./sprites/background/ParFull.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile1.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile2.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/tile3.png");
ASSET_MANAGER.queueDownload("./sprites/decoration/deco1.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/bat.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/enemy1.png");
ASSET_MANAGER.queueDownload("./sprites/mobs/enemy2.png");


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
