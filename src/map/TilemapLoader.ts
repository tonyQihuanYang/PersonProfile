interface CollisionParams {
    firstGid: number;
    layerIds: string[];
    collisionsIDs?: number[];
    from?: number;
    to?: number;
}

export class TilemapLoader {
    static Ground_Layer = 'Ground';
    static BuildingLayerId = 'Buildings';
    static Ground_Layer_1 = 'Ground-layer-1';
    static Assets_Layer = 'Assets';

    static preloadImages(scene: Phaser.Scene): void {
        scene.load.tilemapTiledJSON('world', 'assets/world.json');
        scene.load.spritesheet(
            'spritesheet',
            'assets/tilesets/spritesheet.png',
            {
                frameWidth: 32,
                frameHeight: 32
            }
        );
        scene.load.spritesheet(
            'buildings',
            'assets/tilesets/cozyFarm/Buildings/buildings.png',
            {
                frameWidth: 16,
                frameHeight: 16
            }
        );
        scene.load.spritesheet(
            'streets',
            'assets/tilesets/cozyFarm/tiles/tiles.png',
            {
                frameWidth: 16,
                frameHeight: 16
            }
        );
        scene.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        scene.load.spritesheet('arcadeButtons', 'assets/arcade_button.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    static create(scene: Phaser.Scene): Phaser.Tilemaps.Tilemap {
        const tileMap = scene.make.tilemap({
            key: 'world'
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
        const treeTileSet = tileMap.addTilesetImage(
            'spritesheet',
            'spritesheet'
        );
        const buildingTileSet = tileMap.addTilesetImage(
            'buildings',
            'buildings'
        );
        const streetTileSet = tileMap.addTilesetImage('streets', 'streets');
        // const animalTileSet = tileMap.addTilesetImage('animal', 'animal');

        const sharedTileSets = [
            buildingTileSet,
            streetTileSet
            // animalTileSet,
        ];
        tileMap.createLayer(TilemapLoader.Ground_Layer, [
            treeTileSet,
            ...sharedTileSets
        ]);

        tileMap.createLayer(TilemapLoader.Ground_Layer_1, sharedTileSets);
        tileMap.createLayer(TilemapLoader.Assets_Layer, sharedTileSets);
        tileMap.createLayer(TilemapLoader.BuildingLayerId, sharedTileSets);
    }

    private static setCollision(tileMap: Phaser.Tilemaps.Tilemap): void {
        const collisionObjects: Record<string, CollisionParams> = {
            Tree: {
                firstGid: 1,
                layerIds: [TilemapLoader.Ground_Layer],
                collisionsIDs: [0, 20]
            },
            Building: {
                firstGid: 181,
                layerIds: [TilemapLoader.BuildingLayerId],
                from: 0,
                to: 6230
            },
            StreetSnowFence: {
                firstGid: 6412,
                layerIds: [TilemapLoader.BuildingLayerId],
                collisionsIDs: [2043, 2044, 2045, 2097, 2099, 2151, 2152, 2153]
            },
            StreetFarmFence: {
                firstGid: 6412,

                layerIds: [TilemapLoader.BuildingLayerId],
                collisionsIDs: [1597, 1598, 1599, 1651, 1653, 1705, 1706, 1707]
            },
            StreetWater: {
                firstGid: 6412,
                layerIds: [TilemapLoader.Ground_Layer],
                collisionsIDs: [714, 761, 762, 763, 764, 765, 766, 767]
            }
        };

        Object.values(collisionObjects).forEach((collisionObj) => {
            collisionObj?.collisionsIDs?.length &&
                TilemapLoader.setCollisionByIds(tileMap, {
                    firstGid: collisionObj.firstGid,
                    layerIds: collisionObj.layerIds,
                    collisionsIDs: collisionObj.collisionsIDs
                });

            collisionObj.from !== undefined &&
                collisionObj.to !== undefined &&
                TilemapLoader.setCollisionBetweenIds(tileMap, {
                    firstGid: collisionObj.firstGid,
                    layerIds: collisionObj.layerIds,
                    from: collisionObj.from,
                    to: collisionObj.to
                });
        });
    }

    private static setCollisionByIds(
        tileMap: Phaser.Tilemaps.Tilemap,
        collisionObj: Required<
            Pick<CollisionParams, 'collisionsIDs' | 'firstGid' | 'layerIds'>
        >
    ): void {
        collisionObj.layerIds.forEach((layerId) => {
            tileMap.setCollision(
                collisionObj.collisionsIDs.map(
                    (id) => id + collisionObj.firstGid
                ),
                true,
                true,
                layerId
            );
        });
    }

    private static setCollisionBetweenIds(
        tileMap: Phaser.Tilemaps.Tilemap,
        collisionObj: Required<
            Pick<CollisionParams, 'from' | 'to' | 'firstGid' | 'layerIds'>
        >
    ): void {
        collisionObj.layerIds.forEach((layerId) => {
            tileMap.setCollisionBetween(
                collisionObj.firstGid + collisionObj.from,
                collisionObj.firstGid + collisionObj.to,
                true,
                true,
                layerId
            );
        });
    }
}
