export class TilemapLoader {
  static MapLayerId = 'Ground';
  static BuildingLayerId = 'Buildings';
  static Ground_Layer_1 = 'Ground-layer-1';
  static Assets_Layer = 'Assets';

  static preloadImages(scene: Phaser.Scene): void {
    scene.load.tilemapTiledJSON('world', 'assets/world.json');
    scene.load.spritesheet('spritesheet', 'assets/tilesets/spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    scene.load.spritesheet(
      'buildings',
      'assets/tilesets/cozyFarm/Buildings/buildings.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
    scene.load.spritesheet(
      'streets',
      'assets/tilesets/cozyFarm/tiles/tiles.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
  }

  static create(scene: Phaser.Scene): Phaser.Tilemaps.Tilemap {
    const tileMap = scene.make.tilemap({
      key: 'world',
    });

    this.addTileSet(tileMap);
    this.setCollision(tileMap);

    scene.physics.world.setBoundsCollision(true, true, true, true);
    scene.cameras.main.setBounds(
      0,
      0,
      tileMap.widthInPixels,
      tileMap.heightInPixels
    );

    return tileMap;
  }

  private static addTileSet(tileMap: Phaser.Tilemaps.Tilemap): void {
    const treeTileSet = tileMap.addTilesetImage('spritesheet', 'spritesheet');
    const buildingTileSet = tileMap.addTilesetImage('buildings', 'buildings');
    const streetTileSet = tileMap.addTilesetImage('streets', 'streets');
    // const animalTileSet = tileMap.addTilesetImage('animal', 'animal');

    const sharedTileSets = [
      buildingTileSet,
      streetTileSet,
      // animalTileSet,
    ];
    tileMap.createLayer(TilemapLoader.MapLayerId, [
      treeTileSet,
      ...sharedTileSets,
    ]);
    tileMap.createLayer(TilemapLoader.Ground_Layer_1, sharedTileSets);
    tileMap.createLayer(TilemapLoader.Assets_Layer, sharedTileSets);
    tileMap.createLayer(TilemapLoader.BuildingLayerId, [
      buildingTileSet,
      streetTileSet,
    ]);
  }

  private static setCollision(tileMap: Phaser.Tilemaps.Tilemap): void {
    const collisionObjects = {
      Tree: {
        firstGid: 1,
        collisionsIDs: [0, 20],
      },
    };

    let collisionIndexArray: number[] = [];
    Object.values(collisionObjects).forEach((collisionObj) => {
      collisionIndexArray.concat(
        collisionObj.collisionsIDs.map((id) => id + collisionObj.firstGid)
      );
    });
    tileMap.setCollision(collisionIndexArray, true);
  }
}

// const create = (
//     scene: Phaser.Scene
//   ): { map: Phaser.Tilemaps.Tilemap; circle: Phaser.Physics.Arcade.Group } => {
//     const tileMap = scene.make.tilemap({
//       key: 'world'
//     });

//     const uOfM_TitleSet = tileMap.addTilesetImage(
//       MapLayer.UofMTitleSetID,
//       MapLayer.UofMTitleSetID
//     );
//     const treeTileSet = tileMap.addTilesetImage('spritesheet', 'spritesheet');

//     const freeTileSet = tileMap.addTilesetImage('free', 'free');

//     tileMap.createLayer(MapLayer.Map, [treeTileSet, uOfM_TitleSet, freeTileSet]);

//     scene.physics.world.setBoundsCollision(true, true, true, true);

//     const infoCircle = scene.physics.add.group({
//       immovable: true,
//       allowGravity: false,
//     });

//     tileMap
//       .getObjectLayer(MapLayer.InformationCircleObject)
//       .objects.forEach((element) => {
//         if (element.gid === MapLayer.InformationCircleObjectGid) {
//           const circle = infoCircle.create(
//             element.x,
//             element.y,
//             'spritesheet',
//             element.gid - 1
//           );
//           circle.setOrigin(0, 1);
//         }
//       });

//     scene.cameras.main.setBounds(
//       0,
//       0,
//       tileMap.widthInPixels,
//       tileMap.heightInPixels
//     );

//     tileMap.setCollision([...collisionsMap.Trees, ...collisionsMap.UofM], true);

//     return { map: tileMap, circle: infoCircle };
//   };
