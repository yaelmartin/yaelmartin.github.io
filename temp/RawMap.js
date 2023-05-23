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
            case "training_good_luck":
                this.getGoodLuck();
                break;
            case "parkour_classic":
                this.getParkourClassic();
                break;
            case "painting_level":
                this.getPaintingLevel();
                break;
            case "painting_zone":
                this.getPaintingZone();
                break;
            case "ending_scene":
                this.getEndingScene();
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
        this.music_ = null;
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
        this.initialLifeAmount_ = 0.01;
        this.portalCenterX_ = 17.5;
        this.portalCenterY_ = 9.5;
        this.backgroundImage_ = ["img/trainingMoveBackground.jpg"];
        this.foregroundImage_ = ["img/trainingMoveForeground.png"];
        this.blocksImgurl_ = "img/blockOrange.png";
        this.music_ = "zen_garden";
    }
    getTrainingFlowers() {
        this.minimalLevel();
        this.initialLifeAmount_ = 0.01;
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
        this.blocksImgurl_ = "img/blockGreen.png";
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
        this.music_ = "danger";
    }
    getTrainingWallJump() {
        this.minimalLevel();
        this.rawGrid_ =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        this.playerSpawnX_ = 1.1;
        this.playerSpawnY_ = 10;
        this.flowers_ =
            [
                [1.5, 4.5, "img/flowerYellow.png", false, true, false, null, null],
                [4, 4.5, "img/flowerRed.png", true, true, false, null, null],
                [7.5, 4.5, "img/flowerBlue.png", false, true, false, null, null],
            ];
        this.backgroundImage_ = ["img/trainingWallJump0.jpg", "img/trainingWallJump1.jpg", "img/trainingWallJump2.jpg", "img/trainingWallJump3.jpg"];
        this.foregroundImage_ = ["img/trainingWallJumpForeground.png", "img/trainingWallJumpForeground.png", "img/trainingWallJumpForeground.png", "img/trainingWallJumpForeground.png"];
        this.flowersToOpenPortal_ = this.flowers_.length;
        this.showBlocks_ = true;
        this.initialLifeAmount_ = 0.1;
        this.portalCenterX_ = 12;
        this.portalCenterY_ = 4.5;
        this.music_ = "zen_garden";
        this.blocksImgurl_ = "img/blockGrey.png";
    }
    getGoodLuck() {
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
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
        this.showBlocks_ = false;
        this.playerSpawnX_ = 1;
        this.playerSpawnY_ = 5;
        this.portalCenterX_ = 18.5;
        this.portalCenterY_ = 6.5;
        this.flowers_ =
            [];
        this.flowersToOpenPortal_ = 3;
        this.flowers_ =
            [
                [5.5, 7.5, "img/flowerYellow.png", true, true, false, null, null],
                [10, 7.5, "img/flowerRed.png", false, true, false, null, null],
                [15, 7.5, "img/flowerPink.png", false, true, false, null, null],
            ];
        this.backgroundImage_ = ["img/endingSceneBackground.png", "img/endingSceneBackground.png", "img/endingSceneBackground.png", "img/endingSceneBackground.png"];
        this.foregroundImage_ = ["img/transparent.png", "img/goodLuck1.png", "img/goodLuck2.png", "img/transparent.png"];
        this.music_ = "punchy";
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
                [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            ];
        this.playerSpawnX_ = 9.5;
        this.playerSpawnY_ = 9;
        this.initialLifeAmount_ = 0.5;
        this.safeAreaX_ = 7;
        this.safeAreaY_ = 0;
        this.safeAreaWidth_ = 14;
        this.safeAreaHeight_ = 12;
        this.safeAreaIsHorizontal_ = true;
        this.safeAreaMaxHorizontalSpeed_ = 0.02;
        this.safeAreaAccelHorizontalSpeed_ = (-0.0001);
        this.backgroundImage_ = ["img/parkourClassic.jpg"];
        this.foregroundImage_ = ["img/transparent.png"];
        this.flowersToOpenPortal_ = 2;
        this.flowers_ =
            [
                [15.5, 10.5, "img/flowerYellow.png", false, false, false, null, null],
                [3, 4.5, "img/flowerPink.png", true, false, false, null, null],
                [19.5, 1.5, "img/flowerBlue.png", false, false, false, null, null],
            ];
        this.buttons_ =
            [
                [0.5, 0.5, +0.0002, 0.04],
                [16.5, 2.5, -0.0008, 0.07],
            ];
        this.showBlocks_ = true;
        this.initialLifeAmount_ = 1;
        this.portalCenterX_ = 10.5;
        this.portalCenterY_ = 1.5;
        this.music_ = "punchy";
        this.blocksImgurl_ = "img/blockWhite.png";
    }
    getPaintingLevel() {
        this.minimalLevel();
        this.rawGrid_ =
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
                [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
            ];
        this.showBlocks_ = false;
        this.initialLifeAmount_ = 1;
        this.flowersToOpenPortal_ = 5;
        this.playerSpawnX_ = 8;
        this.playerSpawnY_ = 1.5;
        this.portalCenterX_ = 10;
        this.portalCenterY_ = 2;
        this.flowers_ =
            [
                [3.5, 2.5, "img/flowerYellow.png", true, true, false, null, null],
                [5, 7.5, "img/flowerRed.png", false, true, false, null, null],
                [10.5, 10.5, "img/flowerBlue.png", false, true, false, null, null],
                [16.5, 7.5, "img/flowerGreen.png", true, true, false, null, null],
                [14.5, 2.5, "img/flowerPink.png", false, true, false, null, null]
            ];
        this.foregroundImage_ = ["img/transparent.png", "img/transparent.png", "img/transparent.png", "img/transparent.png", "img/transparent.png", "img/transparent.png"];
        this.backgroundImage_ = ["img/paintingLevel0.png", "img/paintingLevel1.jpg", "img/paintingLevel2.jpg", "img/paintingLevel3.jpg", "img/paintingLevel4.jpg", "img/paintingLevel5.jpg"];
    }
    getPaintingZone() {
        this.minimalLevel();
        this.rawGrid_ =
            [
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ];
        this.showBlocks_ = true;
        this.initialLifeAmount_ = 0.3;
        this.flowersToOpenPortal_ = 5;
        this.playerSpawnX_ = 0.8;
        this.playerSpawnY_ = 0.8;
        this.portalCenterX_ = 5;
        this.portalCenterY_ = 7.5;
        this.flowers_ =
            [
                [9.5, 4.5, "img/flowerBlue.png", true, true, false, null, null],
                [2.5, 11, "img/flowerPink.png", false, true, false, null, null],
                [9, 9.5, "img/flowerYellow.png", false, true, false, null, null],
                [17, 8, "img/flowerRed.png", true, true, false, null, null],
                [14.5, 2.5, "img/flowerGreen.png", false, true, false, null, null]
            ];
        this.safeAreaAccelHorizontalSpeed_ = 0.001;
        this.safeAreaMaxHorizontalSpeed_ = 0.01;
        this.safeAreaWidth_ = 18;
        this.buttons_ =
            [
                [5, 10.5, -0.001, 0.8],
                [10.5, 7, +0.005, 0.06],
                [18, 8, -0.003, 0.04],
                [18, 5, 0.008, 0.04],
                [16, 2, -0.05, 0.09],
                [8.5, 4.5, 0.05, 0.07],
            ];
        this.foregroundImage_ = ["img/transparent.png", "img/paintingZoneForeground1.png", "img/paintingZoneForeground2.png", "img/paintingZoneForeground3.png", "img/paintingZoneForeground4.png", "img/paintingZoneForeground5.png"];
        this.backgroundImage_ = ["img/paintingLevel0.png", "img/paintingZoneBackground1.jpg", "img/paintingZoneBackground2.jpg", "img/paintingZoneBackground3.jpg", "img/paintingZoneBackground4.jpg", "img/paintingZoneBackground5.jpg"];
        this.showBlocks_ = false;
    }
    getEndingScene() {
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
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
        this.showBlocks_ = false;
        this.playerSpawnX_ = 10;
        this.playerSpawnY_ = 5;
        this.portalCenterX_ = 18.5;
        this.portalCenterY_ = 6.5;
        this.flowers_ =
            [];
        this.flowersToOpenPortal_ = 0;
        this.backgroundImage_ = ["img/endingSceneBackground.png"];
        this.foregroundImage_ = ["img/transparent.png"];
        this.music_ = "ending_scene";
    }
}
