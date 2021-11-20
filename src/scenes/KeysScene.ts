import Phaser from 'phaser';
import { ArcadeButtons } from '../entities/ArcadeButtons';
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

export class KeysScene extends Phaser.Scene {
  btnA: ArcadeButtons = {} as ArcadeButtons;
  btnQ: ArcadeButtons = {} as ArcadeButtons;
  btnB: ArcadeButtons = {} as ArcadeButtons;
  constructor() {
    super('KeysScene');
  }

  preload(): void {
    this.load.spritesheet('arcadeButtons', 'assets/arcade_button.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(): void {
    this.initWhateverEvent();
    this.initWakeEvent();
    this.createBtnA();
    this.createBtnB();
    this.createBtnQ();
    // this.add
    // .text(
    //   0,
    //   0,
    //   "fuck ing shit",
    //   {
    //     color: '#000000',
    //     align: 'center',
    //   }
    // )
    // .setFontSize(16);
  }

  destoryAllBtns(): void {
    this.btnA.clean();
    this.btnQ.clean();
    this.btnB.clean();
  }

  private initWhateverEvent(): void {
    this.events.on('create', (...args: any) => {
      console.log('whatever..event', args);
    });    
  }

  private initWakeEvent(): void {
    this.events.on('wake', (...args: any) => {
      console.log('wake..event', args);
    });
  }

  private createBtnA(): void {
    this.btnA = new ArcadeButtons({
      scene: this,
      textureKey: 'arcadeButtons',
      button: 'A',
      text: 'Next',
      initialPostionX: ButtonPosition.LeftX,
      initialPostionY: ButtonPosition.LeftY,
      onButtonJustDown: () => {
        this.game.scene.sleep('KeysScene');
        this.game.scene.resume('GameMainScene');
      },
    });
  }

  private createBtnB(): void {
    this.btnB = new ArcadeButtons({
      scene: this,
      textureKey: 'arcadeButtons',
      button: 'B',
      text: 'Back',
      initialPostionX: ButtonPosition.MiddleX,
      initialPostionY: ButtonPosition.MiddleY,
      onButtonJustDown: () => {
        // this.destoryAllBtns();
        this.game.scene.sleep('KeysScene');
        this.game.scene.resume('GameMainScene');
      },
    });
  }

  private createBtnQ(): void {
    this.btnQ = new ArcadeButtons({
      scene: this,
      textureKey: 'arcadeButtons',
      button: 'Q',
      text: 'Quit',
      initialPostionX: ButtonPosition.RightX,
      initialPostionY: ButtonPosition.RightY,
      onButtonJustDown: () => {
        this.game.scene.sleep('KeysScene');
        this.game.scene.resume('GameMainScene');
      },
    });
  }
}
