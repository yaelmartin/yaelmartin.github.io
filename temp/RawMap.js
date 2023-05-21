"use strict";
class RawMap {
    constructor(levelname) {
        switch (levelname) {
            case "training_move":
                this.getTrainingMove();
                break;
            case "training_flowers":
                this.getTrainingFlowers();
                break;
            case "training_zone":
                this.getTrainingZone();
                break;
            case "training_wall_jump":
                this.getTrainingWallJump();
                break;
            case "parkour_classic":
                this.getParkourClassic();
                break;
            default:
                console.log("this level name doesn't exist !");
                break;
        }
    }
    minimalLevel() {
        this.rawGrid_ =
            [
                [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        this.buttons_ = [];
        this.backgroundImage_ = ["img/transparent.png"];
        this.foregroundImage_ = ["img/transparent.png"];
        this.playerSpawnX_ = 3;
        this.playerSpawnY_ = 5;
        this.initialLifeAmount_ = 0.5;
        this.flowers_ = [];
        this.flowersToOpenPortal_ = 0;
        this.portalCenterX_ = 15, 5;
        this.portalCenterY_ = 8.5;
        this.safeAreaWidth_ = 21;
        this.safeAreaHeight_ = 12;
        this.safeAreaX_ = -0.5;
        this.safeAreaY_ = 0;
        this.safeAreaAccelHorizontalSpeed_ = 0;
        this.safeAreaIsHorizontal_ = true;
        this.safeAreaMaxHorizontalSpeed_ = 0;
        this.showBlocks_ = true;
        this.blocksImgurl_ = "img/defaultBlock.png";
    }
    getTrainingWallJump() {
        this.minimalLevel();
        this.rawGrid_ =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        this.playerSpawnX_ = 1.2;
        this.playerSpawnY_ = 10;
        this.safeAreaX_ = 1;
        this.safeAreaY_ = 0;
        this.safeAreaWidth_ = 22;
        this.safeAreaHeight_ = 12;
        this.safeAreaIsHorizontal_ = true;
        this.safeAreaMaxHorizontalSpeed_ = 0.01;
        this.safeAreaAccelHorizontalSpeed_ = (0);
        this.backgroundImage_ = ["img/montain1.jpg"];
        this.foregroundImage_ = ["img/transparent.png"];
        this.flowers_ =
            [
                [6.5, 3.5, "img/flowerYellow.png", false, true, false, null, null],
                [9, 3.5, "img/flowerRed.png", true, true, false, null, null],
                [12.5, 3.5, "img/flowerBlue.png", false, true, false, null, null],
            ];
        this.flowersToOpenPortal_ = this.flowers_.length;
        this.showBlocks_ = true;
        this.initialLifeAmount_ = 0.1;
        this.portalCenterX_ = 17;
        this.portalCenterY_ = 5;
    }
    getParkourClassic() {
        this.minimalLevel();
        this.rawGrid_ =
            [
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            ];
        this.playerSpawnX_ = 9.5;
        this.playerSpawnY_ = 9;
        this.safeAreaX_ = 7;
        this.safeAreaY_ = 0;
        this.safeAreaWidth_ = 14;
        this.safeAreaHeight_ = 12;
        this.safeAreaIsHorizontal_ = true;
        this.safeAreaMaxHorizontalSpeed_ = 0.015;
        this.safeAreaAccelHorizontalSpeed_ = (-0.0001);
        this.backgroundImage_ = ["img/montain1.jpg"];
        this.foregroundImage_ = ["img/transparent.png"];
        this.flowersToOpenPortal_ = 2;
        this.flowers_ =
            [
                [15.5, 10.5, "img/flowerYellow.png", false, true, false, null, null],
                [3, 4.5, "img/flowerRed.png", true, true, false, null, null],
                [19.5, 1.5, "img/flowerBlue.png", false, true, false, null, null],
            ];
        this.buttons_ =
            [
                [0.5, 0.5, +0.0001, 0.03],
                [16.5, 2.5, -0.0005, 0.04],
            ];
        this.showBlocks_ = true;
        this.initialLifeAmount_ = 1;
        this.portalCenterX_ = 10.5;
        this.portalCenterY_ = 1.5;
    }
    getTrainingMove() {
        this.minimalLevel();
        this.rawGrid_ =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        this.playerSpawnX_ = 2;
        this.playerSpawnY_ = 2;
        this.portalCenterX_ = 17.5;
        this.portalCenterY_ = 9.5;
        this.backgroundImage_ = ["img/trainingMove.jpg"];
        this.foregroundImage_ = ["img/transparent.png"];
        this.blocksImgurl_ = "img/blockOrange.png";
    }
    getTrainingFlowers() {
        this.minimalLevel();
        this.initialLifeAmount_ = 0.1;
        this.rawGrid_ =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        this.playerSpawnX_ = 10;
        this.playerSpawnY_ = 2;
        this.portalCenterX_ = 10;
        this.portalCenterY_ = 9.5;
        this.flowers_ =
            [
                [1.5, 10.5, "img/flowerYellow.png", true, true, false, null, null],
                [5, 10.5, "img/flowerRed.png", false, true, false, null, null],
                [15, 10.5, "img/flowerBlue.png", true, true, false, null, null],
                [18.5, 10.5, "img/flowerPink.png", false, true, false, null, null]
            ];
        this.flowersToOpenPortal_ = 4;
        this.foregroundImage_ = ["img/trainingFlowersForeground0.png", "img/trainingFlowersForeground0.png", "img/trainingFlowersForeground0.png", "img/trainingFlowersForeground0.png", "img/trainingFlowersForeground4.png"];
        this.backgroundImage_ = ["img/trainingFlowersBackground0.jpg", "img/trainingFlowersBackground1.jpg", "img/trainingFlowersBackground2.jpg", "img/trainingFlowersBackground3.jpg", "img/trainingFlowersBackground4.jpg"];
    }
    getTrainingZone() {
        this.minimalLevel();
        this.rawGrid_ =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        this.playerSpawnX_ = 7;
        this.playerSpawnY_ = 1;
        this.portalCenterX_ = 17.5;
        this.portalCenterY_ = 9.5;
        this.flowers_;
        this.safeAreaX_ = 2;
        this.safeAreaWidth_ = 8;
        this.safeAreaMaxHorizontalSpeed_ = 0.03;
        this.safeAreaAccelHorizontalSpeed_ = 0.0001;
        this.buttons_ =
            [
                [18.5, 6.5, -0.0005, 0.03],
                [1.5, 10.5, +0.0005, 0.05],
            ];
        this.flowers_ =
            [
                [11.5, 6.5, "img/flowerRed.png", true, true, false, null, null]
            ];
        this.backgroundImage_ = [null];
        this.foregroundImage_ = ["img/trainingZoneForeground0.png"];
        this.blocksImgurl_ = "img/blockBlue.png";
    }
}
