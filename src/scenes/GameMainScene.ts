import Phaser from 'phaser';
import { GAME_SETTING } from '../game';
// import * as map from '../map/map';
import { TilemapLoader } from '../map/TilemapLoader';
import { Player } from '../entities/Player';
import { ArcadeButtons } from '../entities/ArcadeButtons';
import {
  ProfilesComponent,
  TemplateNames,
} from '../profiles/profile-component';
import { InfoSignLoader } from '../map/InfoSignLoader';

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

  roadSigns: {
    UofM?: any;
    FPC?: any;
  } = {};

  profilesComponent: HTMLElement = {} as HTMLElement;

  constructor() {
    super('GameMainScene');

    const contentDOM = document.getElementById('content');
    if (contentDOM) {
      this.profilesComponent = document.createElement(
        ProfilesComponent.selector
      );
      contentDOM.appendChild(this.profilesComponent);
      // setTimeout(() => {
      //   console.log('dispatched');
      //   ProfilesComponent.showTemplate(this.profilesComponent, 'x');
      // }, 2000);
    }
  }

  preload() {
    TilemapLoader.preloadImages(this);
    // map.loadImage(this);
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
    const tilemap = TilemapLoader.create(this);
    this.roadSigns.UofM = InfoSignLoader.create({
      scene: this,
      tileMap: tilemap,
      circleObject: 'InformationCircle',
      crcleObjectGid: 3,
    });
    this.roadSigns.FPC = InfoSignLoader.create({
      scene: this,
      tileMap: tilemap,
      circleObject: 'FleetProfitCenterInfo',
      crcleObjectGid: 3,
    });

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 'player');
    this.cameras.main.startFollow(this.player);

    // Prevent player across the collision, ex trees;
    this.physics.add.collider(this.player, [
      tilemap.getLayer(TilemapLoader.MapLayerId).tilemapLayer,
      tilemap.getLayer(TilemapLoader.BuildingLayerId).tilemapLayer,
    ]);

    // Do callback if player hit the circle
    // this.initMessageBox();
    this.addOverlappingRoadSignHandlers();
  }

  private addOverlappingRoadSignHandlers(): void {
    this.physics.add.overlap(this.player, this.roadSigns.UofM, () =>
      this.overlappingRoadSignHandler(this.roadSigns.UofM, TemplateNames.University)
    );
    this.physics.add.overlap(this.player, this.roadSigns.FPC, () =>
      this.overlappingRoadSignHandler(this.roadSigns.FPC, TemplateNames.FleetProfitCenter),
    );
  }

  private overlappingRoadSignHandler(roadSign: any, template: TemplateNames): void {
    var boundsA = this.player.getBounds();
    var boundsB = roadSign.getChildren()[0].body;
    const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
      boundsA,
      boundsB
    );

    if (!overlap) {
      this.isOverlap = true;

      this.game.scene.run('MessageScene', {
        message: [
          'test 123...',
          {
            message: 'Press Q to quit',
            callback: () => {
              ProfilesComponent.showTemplate(
                this.profilesComponent,
                template
              );
            },
          },
        ],
      });
      this.game.scene.pause('GameMainScene');
    }
  }

  update() {
    // var boundsA = this.player.getBounds();
    // var boundsB = this.roadSigns.UofM.getChildren()[0].body;
    // const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
    //   boundsA,
    //   boundsB
    // );
    // console.log(`on update => detected ${overlap} stored => ${this.isOverlap}`);
  }
}
