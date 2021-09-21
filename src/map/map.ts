const loadImage = (scene: Phaser.Scene) =>  {
    scene.load.tilemapTiledJSON("world", 'assets/world.json');
    scene.load.image('spritesheet', 'assets/tilesets/spritesheet.png');
}

const create = (scene: Phaser.Scene) => {
    const tileMap = scene.make.tilemap({key: 'world'});
    const mapTiles = tileMap.addTilesetImage('spritesheet', 'spritesheet');
    tileMap.createLayer('Tile Layer 1', mapTiles);
}

export {
    loadImage,
    create
}