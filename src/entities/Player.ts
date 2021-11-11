import 'phaser';
import GameScene from '../game';
import { PlayerConfig } from '../game.config';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'player', 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.keys = scene.cursorKeys;
    console.log(this.keys);

    this.setCollideWorldBounds(true);
    this.setSize(32, 32);
    this.setOffset(0, 16);
    // this.setMaxVelocity(250, 400);
    // this.setDrag(750);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  preUpdate(time, delta): void {
    super.preUpdate(time, delta);

    if (this.keys) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
        console.log('just left');
        this.anims.play('left');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
        console.log('just right');
        this.anims.play('right');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
        console.log('just up');
        this.anims.play('up');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
        this.anims.play('down');
        console.log('just down');
      } else {
        if (this.anims.isPaused) {
          this.anims.play('down');
        }
      }

      if (this.keys.left.isDown) {
        this.setVelocityX(-PlayerConfig.Velocity);
        this.setVelocityY(0);
        // this.setAccelerationX(-1000);
        // this.setFlipX(true);
      } else if (this.keys.right.isDown) {
        // this.setAccelerationX(1000);
        this.setVelocityX(PlayerConfig.Velocity);
        // this.setFlipX(false);
        this.setVelocityY(0);
      } else if (this.keys.up.isDown) {
        this.setVelocityY(-PlayerConfig.Velocity);
        this.setVelocityX(0);
        // this.setFlipY(true);
      } else if (this.keys.down.isDown) {
        this.setVelocityY(PlayerConfig.Velocity);
        this.setVelocityX(0);
        // this.setFlipY(false);
      } else {
        if (this.anims.isPlaying) {
          this.anims.play('down');
          this.setVelocityX(0);
          this.setVelocityY(0);
          this.anims.stop();
        }
      }
    }
  }
}
