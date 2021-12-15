export class InfoSignLoader {
  static create(
    scene: Phaser.Scene,
    tileMap: Phaser.Tilemaps.Tilemap
  ): Phaser.Physics.Arcade.Group {
    const infoCircle = scene.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    const InformationCircleObject = 'InformationCircle';
    const InformationCircleObjectGid = 3;

    tileMap
      .getObjectLayer(InformationCircleObject)
      .objects.forEach((element) => {
        if (element.gid === InformationCircleObjectGid) {
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
