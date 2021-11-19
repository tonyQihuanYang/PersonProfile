import Phaser from 'phaser';
import './profiles';
import { GameMainScene, KeysScene } from './scenes/index';

export enum GAME_SETTING {
  Width = 800,
  Height = 600,
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  // width: GAME_SETTING.Width,
  // height: GAME_SETTING.Height,
  scene: [GameMainScene, KeysScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scale: {
    parent: 'game-canvas-wrapper',
    // mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
  },
  render: {
    pixelArt: true,
  },
});
