import 'phaser';
import * as map from './map/map';
import Player from './entities/Player';

export default class Game extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
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
    map.create(this);
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.player = new Player(this, 100, 192);
  }

  update(time, delta) {}
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 600,
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
