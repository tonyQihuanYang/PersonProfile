import {
    ProfilesComponent,
    TemplateNames
} from '../profiles/profile-component';

export class InfoSignUtils {
    static create({
        scene,
        tileMap,
        objectLayerName,
        objectGid,
        objectName
    }: {
        scene: Phaser.Scene;
        tileMap: Phaser.Tilemaps.Tilemap;
        objectLayerName: string;
        objectGid: number;
        objectName: string;
    }): Phaser.Physics.Arcade.Group {
        const infoSign = scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        tileMap.getObjectLayer(objectLayerName).objects.forEach((element) => {
            if (element.gid === objectGid && element.name === objectName) {
                const circle = infoSign.create(
                    element.x,
                    element.y,
                    'spritesheet',
                    element.gid - 1
                );
                circle.setOrigin(0, 1);
            }
        });
        return infoSign;
    }

    static overlapHandler({
        sceneManager,
        profilesComponent,
        templateName
    }: {
        sceneManager: Phaser.Scenes.SceneManager;
        profilesComponent: HTMLElement;
        templateName: TemplateNames;
    }): void {
        sceneManager.run('MessageScene', {
            message: [
                'test 123...',
                {
                    message: 'Press Q to quit',
                    callback: () => {
                        ProfilesComponent.showTemplate(
                            profilesComponent,
                            templateName
                        );
                    }
                }
            ]
        });
        sceneManager.pause('GameMainScene');
    }
}

export class InfoSign {
    sign: Phaser.Physics.Arcade.Group;

    private _isOverlapped = false;
    private overlapHandler: () => void;

    constructor({
        scene,
        tileMap,
        objectLayerName,
        objectGid,
        objectName,
        overlapHandler
    }: {
        scene: Phaser.Scene;
        tileMap: Phaser.Tilemaps.Tilemap;
        objectLayerName: string;
        objectGid: number;
        objectName: string;
        overlapHandler: () => void;
    }) {
        this.sign = InfoSignUtils.create({
            scene,
            tileMap,
            objectLayerName,
            objectGid,
            objectName
        });
        this.overlapHandler = overlapHandler;
    }

    executeOverlapHandler(player: Phaser.Physics.Arcade.Sprite): void {
        if (!this._isOverlapped && this.isOverLappingPlayer(player)) {
            this._isOverlapped = true;
            this.overlapHandler();
        }
    }

    checkIsOverlapping(player: Phaser.Physics.Arcade.Sprite): void {
        if (this._isOverlapped && !this.isOverLappingPlayer(player)) {
            this._isOverlapped = false;
        }
    }

    private isOverLappingPlayer(player: Phaser.Physics.Arcade.Sprite): boolean {
        return Phaser.Geom.Intersects.RectangleToRectangle(
            player.getBounds(),
            this.sign.getChildren()[0].body as any
        );
    }
}
