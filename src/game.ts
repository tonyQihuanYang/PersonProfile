import 'phaser';
import { GameMainScene, KeysScence } from './scenes/index';

export enum GAME_SETTINGS {
  Width = 800,
  Height = 600,
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: GAME_SETTINGS.Width,
  height: GAME_SETTINGS.Height,
  scene: [GameMainScene, KeysScence],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  render: {
    pixelArt: true,
  },
});
