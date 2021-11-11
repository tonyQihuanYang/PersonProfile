/**
 * Animation ref: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.PlayAnimationConfig
 */
import 'phaser';
import { GameMainScene } from '../scenes';
import { PlayerConfig } from '../game.config';

export enum PLAYER_INITIAL_POSITION {
  X = 250,
  Y = 250,
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(
    readonly scene: GameMainScene,
    readonly textureKey: string,
    initialPostionX?: number,
    initialPostionY?: number
  ) {
    super(
      scene,
      initialPostionX || PLAYER_INITIAL_POSITION.X,
      initialPostionY || PLAYER_INITIAL_POSITION.Y,
      textureKey,
      0
    );

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.keys = scene.cursorKeys;

    this.setCollideWorldBounds(true);
    this.setSize(32, 32);
    this.setOffset(0, 16);

    this.createAnimation();
  }

  preUpdate(time, delta): void {
    super.preUpdate(time, delta);

    if (this.keys) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
        this.anims.play('left');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
        this.anims.play('right');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
        this.anims.play('up');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
        this.anims.play('down');
      }

      if (this.keys.left.isDown) {
        this.setVelocityX(-PlayerConfig.Velocity);
        this.setVelocityY(0);
      } else if (this.keys.right.isDown) {
        this.setVelocityX(PlayerConfig.Velocity);
        this.setVelocityY(0);
      } else if (this.keys.up.isDown) {
        this.setVelocityY(-PlayerConfig.Velocity);
        this.setVelocityX(0);
      } else if (this.keys.down.isDown) {
        this.setVelocityY(PlayerConfig.Velocity);
        this.setVelocityX(0);
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

  private createAnimation(): void {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(this.textureKey, {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(this.textureKey, {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers(this.textureKey, {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
