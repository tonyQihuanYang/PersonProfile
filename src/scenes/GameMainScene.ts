import Phaser from 'phaser';
import { GAME_SETTING } from '../game';
// import * as map from '../map/map';
import { TilemapLoader } from '../map/TilemapLoader';
import { Player } from '../entities/Player';
import { ArcadeButtons } from '../entities/ArcadeButtons';
import {
    ProfilesComponent,
    TemplateNames
} from '../profiles/profile-component';
import { InfoSign } from '../map/InfoSignLoader';

enum MSG_BOX {
    Y = 400,
    Padding = 20,
    Boarder = 5,
    Radius = 10,
    Width = GAME_SETTING.Width - 2 * MSG_BOX.Padding,
    Height = GAME_SETTING.Height / 3 - MSG_BOX.Padding
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
        this.renderProfilesComponent();
    }

    preload(): void {
        TilemapLoader.preloadImages(this);
    }

    create(): void {
        const tilemap = TilemapLoader.create(this);
        this.player = new Player(this, 'player');

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.player);

        // Prevent player across the collision, ex trees;
        this.physics.add.collider(this.player, [
            tilemap.getLayer(TilemapLoader.Ground_Layer).tilemapLayer,
            tilemap.getLayer(TilemapLoader.Ground_Layer_1).tilemapLayer,
            tilemap.getLayer(TilemapLoader.Assets_Layer).tilemapLayer,
            tilemap.getLayer(TilemapLoader.BuildingLayerId).tilemapLayer
        ]);

        this.createRoundsSigns(tilemap);
    }

    update(): void {
        this.updateRoundSignStatus();
    }

    private renderProfilesComponent(): void {
        const contentDOM = document.getElementById('content');
        if (contentDOM) {
            this.profilesComponent = document.createElement(
                ProfilesComponent.selector
            );
            contentDOM.appendChild(this.profilesComponent);
        }
    }

    private createRoundsSigns(tilemap: Phaser.Tilemaps.Tilemap): void {
        const sharedConfig = {
            scene: this,
            tileMap: tilemap,
            crcleObjectGid: 3
        };

        const lastMessage = (template: TemplateNames) => {
            return {
                message: 'Press Q to quit',
                callback: () => {
                    ProfilesComponent.showTemplate(
                        this.profilesComponent,
                        template
                    );
                }
            };
        };

        this.roadSigns.UofM = new InfoSign({
            ...sharedConfig,
            circleObject: 'InformationCircle',
            overlapHandler: () => {
                this.game.scene.run('MessageScene', {
                    message: [
                        'Unversity of Manitoba...',
                        lastMessage(TemplateNames.University)
                    ]
                });
                this.game.scene.pause('GameMainScene');
            }
        });

        this.roadSigns.FPC = new InfoSign({
            ...sharedConfig,
            circleObject: 'FleetProfitCenterInfo',
            overlapHandler: () => {
                this.game.scene.run('MessageScene', {
                    message: [
                        'Fleet Profit Center Inc...',
                        lastMessage(TemplateNames.FleetProfitCenter)
                    ]
                });
                this.game.scene.pause('GameMainScene');
            }
        });
        this.initRoundSignsEvents();
    }

    private initRoundSignsEvents(): void {
        for (const [_, roundSign] of Object.entries(this.roadSigns)) {
            this.physics.add.overlap(this.player, roundSign.sign, () =>
                roundSign.executeOverlapHandler(this.player)
            );
        }
    }

    private updateRoundSignStatus(): void {
        for (const [_, roundSign] of Object.entries(this.roadSigns)) {
            roundSign.checkIsOverlapping(this.player);
        }
    }
}
