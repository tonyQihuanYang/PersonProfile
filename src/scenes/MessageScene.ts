import Phaser from 'phaser';
import { ArcadeButtons } from '../entities/ArcadeButtons';
import { TextBox } from '../entities/MessageBox';
import { GAME_SETTING } from '../game';

enum ButtonPosition {
  Offset = 32,
  OffsetX = 120,
  BasicX = GAME_SETTING.Width - OffsetX,
  BasicY = GAME_SETTING.Height - Offset,
  RightX = BasicX,
  RightY = BasicY,
  MiddleX = BasicX - OffsetX,
  MiddleY = BasicY,
  LeftX = BasicX - 2 * OffsetX,
  LeftY = BasicY,
}

export interface MessageSceneOptions {
  message: string[];
}

export class MessageScene extends Phaser.Scene {
  textBox: TextBox = {} as TextBox;
  message: string[] = [];

  btnNext: ArcadeButtons = {} as ArcadeButtons;
  btnQuit: ArcadeButtons = {} as ArcadeButtons;
  // btnBack: ArcadeButtons = {} as ArcadeButtons;
  constructor() {
    super('MessageScene');
  }

  init(options?: MessageSceneOptions): void {
    this.message = options?.message || [];
  }

  preload(): void {
    this.load.spritesheet('arcadeButtons', 'assets/arcade_button.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(): void {
    this.initWakeEvent();
    this.initMessageBox();
    this.createBtnA();
    // this.createBtnB();
    this.createBtnQ();
  }

  private initWakeEvent(): void {
    this.events.on('wake', (_: any, options?: MessageSceneOptions) => {
      this.textBox.show(options?.message);
      this.btnNext.show();
      this.btnQuit.show();
      // this.btnBack.hide();
    });
  }

  initMessageBox(): void {
    this.textBox = new TextBox(this);
    this.textBox.show(this.message);
  }

  private createBtnA(): void {
    this.btnNext = new ArcadeButtons({
      scene: this,
      textureKey: 'arcadeButtons',
      button: 'A',
      text: 'Next',
      initialPostionX: ButtonPosition.MiddleX,
      initialPostionY: ButtonPosition.MiddleY,
      onButtonJustDown: () => {
        this.textBox.showNextMessage();
        // this.btnBack.show();
        if (!this.textBox.hasRemainedMessage) {
          this.btnNext.hide();
        }
      },
    });
  }

  // private createBtnB(): void {
  //   this.btnBack = new ArcadeButtons({
  //     scene: this,
  //     textureKey: 'arcadeButtons',
  //     button: 'B',
  //     text: 'Back',
  //     initialPostionX: ButtonPosition.MiddleX,
  //     initialPostionY: ButtonPosition.MiddleY,
  //     onButtonJustDown: () => {
  //       this.btnNext.show();
  //       this.textBox.showPreviousMessage();
  //       if (this.textBox.isMessageInFirstIndex) {
  //         this.btnBack.hide();
  //       }
  //     },
  //   });
  // }

  private createBtnQ(): void {
    this.btnQuit = new ArcadeButtons({
      scene: this,
      textureKey: 'arcadeButtons',
      button: 'Q',
      text: 'Quit',
      initialPostionX: ButtonPosition.RightX,
      initialPostionY: ButtonPosition.RightY,
      onButtonJustDown: () => {
        this.textBox.hide();
        this.game.scene.sleep('MessageScene');
        this.game.scene.resume('GameMainScene');
      },
    });
  }
}
