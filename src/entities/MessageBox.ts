import Phaser from 'phaser';
import { GAME_SETTING } from '../game';

export interface Boarder {
  width: number;
  radius: number;
  color: number;
}

export interface TextBoxOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: number;
  padding?: number;
  boarder?: Boarder;
}

interface RequiredTextBoxOptions
  extends Required<Omit<TextBoxOptions, 'boarder'>> {
  boarder: Required<Boarder>;
}

export class TextBox extends Phaser.GameObjects.Graphics {
  static DefaultMessage = '...';

  private textBoxOptions: RequiredTextBoxOptions = {
    x: 0,
    y: 395,
    width: GAME_SETTING.Width,
    height: GAME_SETTING.Height / 3,
    color: 0xfff9fd,
    padding: 8,
    boarder: {
      width: 5,
      radius: 10,
      color: 0x786c84,
    },
  };

  private messageObject: Phaser.GameObjects.Text;
  private messageStore: { messages: string[]; curIndex: number } = {
    messages: [],
    curIndex: -1,
  };

  constructor(
    scene: Phaser.Scene,
    options?: {
      phaserGraphicOptions?: Phaser.Types.GameObjects.Graphics.Options;
      textBoxOptions?: TextBoxOptions;
    }
  ) {
    super(scene, options?.phaserGraphicOptions);
    scene.add.existing(this);

    options?.textBoxOptions &&
      this.updateTextBoxOptions(options.textBoxOptions);
    this.messageObject = this.initilizeText();
    this.initilizeTextBox();
  }

  show(messages: string[] = []): void {
    this.storeMessages(messages);

    this.messageObject.text = this.getCurMessage();
    this.messageObject.setVisible(true);
    this.setVisible(true);
  }

  showNextMessage(): void {
    this.messageObject.text = this.getCurMessage();
  }

  showPreviousMessage(): void {
    this.messageObject.text = this.getPrevMessage();
  }

  hide(): void {
    this.messageObject.setVisible(false);
    this.setVisible(false);
  }

  get hasRemainedMessage(): boolean {
    return this.messageStore.curIndex < this.messageStore.messages.length - 1;
  }

  get isMessageInFirstIndex(): boolean {
    return this.messageStore.curIndex === 0;
  }

  private updateTextBoxOptions(textBoxOptions: TextBoxOptions): void {
    textBoxOptions.boarder = Object.assign(
      this.textBoxOptions.boarder,
      textBoxOptions.boarder || {}
    );
    this.textBoxOptions = Object.assign(textBoxOptions, this.textBoxOptions);
  }

  private initilizeTextBox(): void {
    this.createBorderOutLine();
    this.createMessageBoxOutline();
  }

  private createBorderOutLine(): void {
    this.fillStyle(this.textBoxOptions.boarder.color, 1);
    const locatedX = this.textBoxOptions.x,
      locatedY = this.textBoxOptions.y,
      width = this.textBoxOptions.width,
      height = this.textBoxOptions.height,
      radis = this.textBoxOptions.boarder.radius;

    this.fillRoundedRect(locatedX, locatedY, width, height, radis);
  }

  private createMessageBoxOutline(): void {
    const locatedX = this.textBoxOptions.x + this.textBoxOptions.boarder.width,
      locatedY = this.textBoxOptions.y + this.textBoxOptions.boarder.width,
      width = this.textBoxOptions.width - 2 * this.textBoxOptions.boarder.width,
      height =
        this.textBoxOptions.height - 2 * this.textBoxOptions.boarder.width,
      radius = this.textBoxOptions.boarder.radius;
    this.fillStyle(this.textBoxOptions.color, 1);
    this.fillRoundedRect(locatedX, locatedY, width, height, radius);
  }

  private initilizeText(): Phaser.GameObjects.Text {
    const locatedX =
        this.textBoxOptions.x +
        this.textBoxOptions.boarder.width +
        this.textBoxOptions.padding,
      locatedY =
        this.textBoxOptions.y +
        this.textBoxOptions.boarder.width +
        this.textBoxOptions.padding,
      textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
        color: '#000000',
        align: 'center',
        wordWrap: {
          width:
            this.textBoxOptions.width -
            2 *
              (this.textBoxOptions.boarder.width + this.textBoxOptions.padding),
        },
      };

    return this.scene.add
      .text(locatedX, locatedY, TextBox.DefaultMessage, textStyle)
      .setFontSize(25);
  }

  private storeMessages(messages: string[]): void {
    this.messageStore.messages = messages;
    this.messageStore.curIndex = -1;
  }

  private getCurMessage(): string {
    if (!this.messageStore.messages.length) {
      return TextBox.DefaultMessage;
    }

    if (this.hasRemainedMessage) {
      ++this.messageStore.curIndex;
      return this.messageStore.messages[this.messageStore.curIndex];
    }
    return TextBox.DefaultMessage;
  }

  private getPrevMessage(): string {
    if (this.messageStore.curIndex > 0) {
      --this.messageStore.curIndex;
      return this.messageStore.messages[this.messageStore.curIndex];
    }
    return this.messageStore.messages[0];
  }
}
