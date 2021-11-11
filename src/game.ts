import 'phaser';
import * as map from './map/map';
import Player from './entities/Player';

enum GAME_SETTINGS {
  Width = 800,
  Height = 600,
}

enum MSG_BOX {
  Y = 400,
  Padding = 20,
  Boarder = 5,
  Radius = 10,
  Width = GAME_SETTINGS.Width - 2 * MSG_BOX.Padding,
  Height = GAME_SETTINGS.Height / 3 - MSG_BOX.Padding,
}

const PLAYER_INITIAL_POSITION = {
  x: 250,
  y: 250,
};

export default class Game extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  graphics: Phaser.GameObjects.Graphics;
  text: Phaser.GameObjects.Text;
  isOverlap: boolean = false;

  circle: any;

  constructor() {
    super('Game');
  }

  preload() {
    map.loadImage(this);

    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const mapObjects = map.create(this);
    const _map = mapObjects.map;
    this.circle = mapObjects.circle;
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.player = new Player(
      this,
      PLAYER_INITIAL_POSITION.x,
      PLAYER_INITIAL_POSITION.y
    );
    this.cameras.main.startFollow(this.player);

    // Prevent player across the collision, ex trees;
    this.physics.add.collider(
      this.player,
      _map.getLayer(map.MapLayer.Map).tilemapLayer
    );

    // this.physics.add.collider(
    //   this.player,
    //   _map.getLayer(map.MapLayer.Map).tilemapLayer
    // );

    // Do callback if player hit the circle
    this.initMessageBox();
    this.addProfileOverlayHandler();

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
      this.graphics.x = this.cameras.main.worldView.x;
      this.graphics.y = this.cameras.main.worldView.y;
      console.log(this.cameras.main.worldView.x + 2 * MSG_BOX.Padding);

      this.text.x =
        this.cameras.main.worldView.x + MSG_BOX.Padding + MSG_BOX.Boarder;
      this.text.y = this.cameras.main.worldView.y + MSG_BOX.Y + MSG_BOX.Boarder;
      // console.log('overlapping...');
      this.graphics.setVisible(true);
      this.text.setVisible(true);
      this.isOverlap = true;
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

  update(time, delta) {
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

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: GAME_SETTINGS.Width,
  height: GAME_SETTINGS.Height,
  scene: Game,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  render: {
    pixelArt: true,
  },
};

const game = new Phaser.Game(config);
