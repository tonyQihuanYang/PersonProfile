import Phaser from 'phaser';
import { GAME_SETTING } from '../game';
import * as map from '../map/map';
import { Player } from '../entities/Player';
import { ArcadeButtons } from '../entities/ArcadeButtons';
import { ProfilesComponent } from '../profiles/profile-component';

enum MSG_BOX {
  Y = 400,
  Padding = 20,
  Boarder = 5,
  Radius = 10,
  Width = GAME_SETTING.Width - 2 * MSG_BOX.Padding,
  Height = GAME_SETTING.Height / 3 - MSG_BOX.Padding,
}

export class GameMainScene extends Phaser.Scene {
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys =
    {} as Phaser.Types.Input.Keyboard.CursorKeys;
  player: Phaser.Physics.Arcade.Sprite = {} as Phaser.Physics.Arcade.Sprite;
  arcadeButtons: Phaser.Physics.Arcade.Sprite =
    {} as Phaser.Physics.Arcade.Sprite;

  graphics: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
  text: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
  isOverlap: boolean = false;
  circle: any;

  profilesComponent: HTMLElement = {} as HTMLElement;

  constructor() {
    super('GameMainScene');

    const contentDOM = document.getElementById('content');
    if (contentDOM) {
      this.profilesComponent = document.createElement(ProfilesComponent.selector);
      contentDOM.appendChild(this.profilesComponent);
      setTimeout(() => {
        console.log('dispatched');
        ProfilesComponent.showTemplate(this.profilesComponent, 'x');
      }, 2000);
    }
  }

  preload() {
    map.loadImage(this);
    // this.profilesTemplate = new ProfilesTemplate();

    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet('arcadeButtons', 'assets/arcade_button.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const mapObjects = map.create(this);
    const _map = mapObjects.map;
    this.circle = mapObjects.circle;

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 'player');
    this.cameras.main.startFollow(this.player);

    // Prevent player across the collision, ex trees;
    this.physics.add.collider(
      this.player,
      _map.getLayer(map.MapLayer.Map).tilemapLayer
    );

    // Do callback if player hit the circle
    this.initMessageBox();
    this.addProfileOverlayHandler();

    // this.arcadeButtons = new ArcadeButtons({
    //   scene: this,
    //   textureKey: 'arcadeButtons',
    //   button: 'Q',
    //   onButtonJustDown: () => {
    //     console.log('Pressed Q');
    //     this.arcadeButtons.anims.stop();
    //     this.arcadeButtons.destroy();
    //   },
    // });

    // var boundsA = this.player.getBounds();
    //     var boundsB = _circle.getChildren()[0].body.gameObject;
  }

  private addProfileOverlayHandler(): void {
    this.physics.add.overlap(this.player, this.circle, () =>
      this.displayProfileMessage()
    );
  }

  private displayProfileMessage(): void {
    if (!this.isOverlap) {
      // this.profilesTemplate.show('FleetProfitCenter');

      console.log('sleeping');
      // this.graphics.x = this.cameras.main.worldView.x;
      // this.graphics.y = this.cameras.main.worldView.y;
      console.log(this.cameras.main.worldView.x + 2 * MSG_BOX.Padding);

      // this.text.x =
      //   this.cameras.main.worldView.x + MSG_BOX.Padding + MSG_BOX.Boarder;
      // this.text.y = this.cameras.main.worldView.y + MSG_BOX.Y + MSG_BOX.Boarder;
      // console.log('overlapping...');
      // this.graphics.setVisible(true);
      // this.text.setVisible(true);
      this.isOverlap = true;

      this.game.scene.pause('GameMainScene');
      this.game.scene.run('KeysScene');
    }
  }

  initMessageBox(): void {
    this.graphics = this.add.graphics();

    this.graphics.fillStyle(0x786c84, 1);
    // Grey boarder
    this.graphics.fillRoundedRect(
      MSG_BOX.Padding - MSG_BOX.Boarder,
      MSG_BOX.Y - MSG_BOX.Boarder,
      MSG_BOX.Width + 2 * MSG_BOX.Boarder,
      MSG_BOX.Height + 2 * MSG_BOX.Boarder,
      MSG_BOX.Radius
    );
    this.graphics.fillStyle(0xfff9fd, 1);
    this.graphics.fillRoundedRect(
      MSG_BOX.Padding,
      MSG_BOX.Y,
      MSG_BOX.Width,
      MSG_BOX.Height,
      MSG_BOX.Radius
    );
    this.text = this.add
      .text(0, MSG_BOX.Y, 'Fleet Profit Center\nDIU mie', {
        color: '#000000',
        align: 'center',
        wordWrap: { width: MSG_BOX.Width },
      })
      .setFontSize(25);

    this.graphics.setVisible(false);
    this.text.setVisible(false);
  }

  update() {
    var boundsA = this.player.getBounds();
    var boundsB = this.circle.getChildren()[0].body;
    const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
      boundsA,
      boundsB
    );
    if (this.isOverlap !== overlap && this.isOverlap === true) {
      this.graphics.setVisible(false);
      this.text.setVisible(false);
      this.isOverlap = false;
    }
    // console.log(overlap);
    // console.log(this.isOverlap);
  }
}
