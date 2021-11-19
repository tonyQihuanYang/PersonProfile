/**
 * Animation ref: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.PlayAnimationConfig
 */
import Phaser from 'phaser';
import { GameMainScene } from '../scenes';

export enum PLAYER_SETTING {
  InitPosX = 250,
  InitPosY = 250,
  Velocity = 250,
}

enum PlayerAction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  Stand = 'Stand',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  keys: Record<string, Phaser.Input.Keyboard.Key> = {} as Record<
    string,
    Phaser.Input.Keyboard.Key
  >;
  action: PlayerAction = PlayerAction.Stand;
  constructor(
    readonly scene: GameMainScene,
    readonly textureKey: string,
    initialPostionX?: number,
    initialPostionY?: number
  ) {
    super(
      scene,
      initialPostionX || PLAYER_SETTING.InitPosX,
      initialPostionY || PLAYER_SETTING.InitPosY,
      textureKey,
      0
    );

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCursorKeys(scene);

    this.initilizePlayerObject();
    this.createAnimation();
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    this.detectcCrsorKeysPressed();
    this.updatePlayerMovement();
  }

  private setCursorKeys(scene: GameMainScene): void {
    if (scene.cursorKeys) {
      scene.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    }
    this.keys = scene.cursorKeys;
  }

  private initilizePlayerObject(): void {
    this.setCollideWorldBounds(true);
    this.setSize(32, 32);
    this.setOffset(0, 16);
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

  private detectcCrsorKeysPressed(): void {
    if (this.keys) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
        this.action = PlayerAction.Left;
        this.anims.play('left');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
        this.action = PlayerAction.Right;
        this.anims.play('right');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
        this.action = PlayerAction.Up;
        this.anims.play('up');
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
        this.action = PlayerAction.Down;
        this.anims.play('down');
      }
    }
  }

  private updatePlayerMovement(): void {
    switch (this.getActiveMode()) {
      case PlayerAction.Left:
        this.setVelocityX(-PLAYER_SETTING.Velocity);
        this.setVelocityY(0);
        break;
      case PlayerAction.Right:
        this.setVelocityX(PLAYER_SETTING.Velocity);
        this.setVelocityY(0);
        break;
      case PlayerAction.Up:
        this.setVelocityX(0);
        this.setVelocityY(-PLAYER_SETTING.Velocity);
        break;
      case PlayerAction.Down:
        this.setVelocityX(0);
        this.setVelocityY(PLAYER_SETTING.Velocity);
        break;
      default:
        if (this.anims.isPlaying) {
          this.action = PlayerAction.Stand;
          this.anims.play('down');
          this.setVelocityX(0);
          this.setVelocityY(0);
          this.anims.stop();
        }
    }
  }

  private getActiveMode(): PlayerAction {
    return this.action !== PlayerAction.Stand &&
      this.action &&
      this.keys[this.action.toLowerCase()].isDown
      ? this.action
      : PlayerAction.Stand;
  }
}
