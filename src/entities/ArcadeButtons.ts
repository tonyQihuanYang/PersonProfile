/**
 * Animation ref: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.PlayAnimationConfig
 */

import Phaser from 'phaser';

const LOOKUPs: Record<string, Phaser.Types.Animations.GenerateFrameNumbers> = {
  A: {
    start: 40,
    end: 41,
  },
  B: {
    start: 28,
    end: 29,
  },
  Q: {
    start: 32,
    end: 33,
  },
};

interface ArcadeButtonsArgs {
  readonly scene: Phaser.Scene;
  readonly textureKey: string;
  button: string;
  text?: string;
  onButtonJustDown?: () => void;
  initialPostionX?: number;
  initialPostionY?: number;
}

export class ArcadeButtons extends Phaser.Physics.Arcade.Sprite {
  static readonly ButtonHeight = 32;
  static readonly ButtonWidth = 32;

  onButtonJustDown?: () => void;

  private cursorKeys: Record<string, Phaser.Input.Keyboard.Key>;
  private button: string;
  private textureId: string;
  private buttonText?: Phaser.GameObjects.Text;
  constructor({
    scene,
    textureKey,
    button,
    text,
    onButtonJustDown,
    initialPostionX,
    initialPostionY,
  }: ArcadeButtonsArgs) {
    super(
      scene,
      initialPostionX || ArcadeButtons.ButtonWidth,
      initialPostionY || ArcadeButtons.ButtonHeight,
      textureKey,
      0
    );
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.textureId = textureKey;
    this.button = button;
    this.cursorKeys = this.scene.input.keyboard.addKeys('A,B,Q') as Record<
      string,
      Phaser.Input.Keyboard.Key
    >;
    if (onButtonJustDown) {
      this.onButtonJustDown = onButtonJustDown;
    }
    this.createButtonAnimation();

    this.createButtonText(text, initialPostionX, initialPostionY);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    if (
      this.cursorKeys &&
      Phaser.Input.Keyboard.JustDown(this.cursorKeys[this.button]) &&
      this.onButtonJustDown
    ) {
      this.onButtonJustDown();
    }
  }

  clean(): void {
    this.anims.stop();
    if (this.buttonText) {
      this.buttonText.destroy();
    }
    this.destroy();
  }

  private createButtonAnimation(): void {
    this.setSize(ArcadeButtons.ButtonWidth, ArcadeButtons.ButtonHeight);
    this.anims.create({
      key: this.button,
      frames: this.anims.generateFrameNumbers(
        this.textureId,
        LOOKUPs[
          this.button
        ] as unknown as Phaser.Types.Animations.GenerateFrameNumbers
      ),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.play(this.button);
  }

  private createButtonText(
    text?: string,
    initialPostionX: number = ArcadeButtons.ButtonWidth,
    initialPostionY: number = ArcadeButtons.ButtonHeight
  ): void {
    // console.log(this.scene);
    if (text) {
      this.buttonText = this.scene.add
        .text(initialPostionX + 16, initialPostionY - 16, text, {
          color: '#000000',
          align: 'center',
        })
        .setFontSize(32);
    }
  }
}
