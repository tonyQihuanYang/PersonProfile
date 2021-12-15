export class InfoSignLoader {
  static create({
    scene,
    tileMap,
    circleObject,
    crcleObjectGid
  }: {
    scene: Phaser.Scene;
    tileMap: Phaser.Tilemaps.Tilemap;
    circleObject: string,
    crcleObjectGid: number
  }): Phaser.Physics.Arcade.Group {
    const infoCircle = scene.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    tileMap
      .getObjectLayer(circleObject)
      .objects.forEach((element) => {
        if (element.gid === crcleObjectGid) {
          const circle = infoCircle.create(
            element.x,
            element.y,
            'spritesheet',
            element.gid - 1
          );
          circle.setOrigin(0, 1);
        }
      });
    return infoCircle;
  }
}
