import 'phaser';

enum MapLayer {
  Map = 'Ground',
  InformationCircleObject = 'InformationCircle',
  InformationCircleObjectGid = 3,

  UofMTitleSetID = 'UofM',
}

const firstGid = {
  Tree: 1,
  UofM: 181,
};

const collisionsMap = {
  Trees: [0, 20].map((e) => e + firstGid.Tree),
  UofM: [2, 3, 7, 8, 9, 10, 12, 17, 18, 23, 24, 29, 30, 31, 32, 33, 34, 35].map(
    (e) => e + firstGid.UofM
  ),
};

const loadImage = (scene: Phaser.Scene) => {
  scene.load.tilemapTiledJSON('world', 'assets/world.json');
  scene.load.spritesheet('spritesheet', 'assets/tilesets/spritesheet.png', {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('UofM', 'assets/tilesets/UofM.png', {
    frameWidth: 32,
    frameHeight: 32,
  });
};

const create = (
  scene: Phaser.Scene
): { map: Phaser.Tilemaps.Tilemap; circle: Phaser.Physics.Arcade.Group } => {
  const tileMap = scene.make.tilemap({
    key: 'world'
  });

  const uOfM_TitleSet = tileMap.addTilesetImage(
    MapLayer.UofMTitleSetID,
    MapLayer.UofMTitleSetID
  );
  const treeTileSet = tileMap.addTilesetImage('spritesheet', 'spritesheet');
  tileMap.createLayer(MapLayer.Map, [treeTileSet, uOfM_TitleSet]);

  scene.physics.world.setBoundsCollision(true, true, true, true);

  const infoCircle = scene.physics.add.group({
    immovable: true,
    allowGravity: false,
  });

  tileMap
    .getObjectLayer(MapLayer.InformationCircleObject)
    .objects.forEach((element) => {
      if (element.gid === MapLayer.InformationCircleObjectGid) {
        const circle = infoCircle.create(
          element.x,
          element.y,
          'spritesheet',
          element.gid - 1
        );
        circle.setOrigin(0, 1);
      }
    });

  scene.cameras.main.setBounds(
    0,
    0,
    tileMap.widthInPixels,
    tileMap.heightInPixels
  );

  tileMap.setCollision([...collisionsMap.Trees, ...collisionsMap.UofM], true);

  return { map: tileMap, circle: infoCircle };
};

export { loadImage, create, MapLayer };
