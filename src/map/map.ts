import 'phaser';

enum MapLayer {
  Map = 'Ground',
  InformationCircleObject = 'InformationCircle',
  InformationCircleObjectGid = 3,
}

const collisionsMap = {
  Trees: [1, 21],
};

const loadImage = (scene: Phaser.Scene) => {
  scene.load.tilemapTiledJSON('world', 'assets/world.json');
  scene.load.spritesheet('spritesheet', 'assets/tilesets/spritesheet.png', {
    frameWidth: 32,
    frameHeight: 32,
  });
};

const create = (scene: Phaser.Scene): Phaser.Tilemaps.Tilemap => {
  const tileMap = scene.make.tilemap({ key: 'world' });
  const mapTiles = tileMap.addTilesetImage('spritesheet', 'spritesheet');
  tileMap.createLayer(MapLayer.Map, mapTiles);

  scene.physics.world.setBoundsCollision(true, true, true, true);

  const infoCircle = scene.physics.add.group({
    immovable: true,
    allowGravity: false,
  });

  tileMap
    .getObjectLayer(MapLayer.InformationCircleObject)
    .objects.forEach((element) => {
      if (element.gid === MapLayer.InformationCircleObjectGid) {
        console.log('Getting here');
        const circle = infoCircle.create(element.x, element.y, 'spritesheet', element.gid - 1);
        circle.setOrigin(0, 1);
      }
    });

  scene.cameras.main.setBounds(
    0,
    0,
    tileMap.widthInPixels,
    tileMap.heightInPixels
  );

  tileMap.setCollision(collisionsMap.Trees, true);

  return tileMap;
};

export { loadImage, create, MapLayer };
