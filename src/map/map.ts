import 'phaser';

const collisionsMap = {
  Trees: [1, 21],
};

const loadImage = (scene: Phaser.Scene) => {
  scene.load.tilemapTiledJSON('world', 'assets/world.json');
  scene.load.image('spritesheet', 'assets/tilesets/spritesheet.png');
};

const create = (scene: Phaser.Scene): Phaser.Tilemaps.Tilemap => {
  const tileMap = scene.make.tilemap({ key: 'world' });
  const mapTiles = tileMap.addTilesetImage('spritesheet', 'spritesheet');
  tileMap.createLayer('Tile Layer 1', mapTiles);

  scene.physics.world.setBoundsCollision(true, true, true, true);

  scene.cameras.main.setBounds(
    0,
    0,
    tileMap.widthInPixels,
    tileMap.heightInPixels
  );

  tileMap.setCollision(collisionsMap.Trees, true);

  return tileMap;
};

export { loadImage, create };
