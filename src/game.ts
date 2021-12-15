import Phaser from 'phaser';
import './profiles';
import { GameMainScene, MessageScene } from './scenes/index';

export enum GAME_SETTING {
  Width = 800,
  Height = 600,
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#83924c',
  scene: [GameMainScene, MessageScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scale: {
    parent: 'game-canvas-wrapper',
    width: GAME_SETTING.Width,
    height: GAME_SETTING.Height,
  },
  render: {
    pixelArt: true,
  },
});
