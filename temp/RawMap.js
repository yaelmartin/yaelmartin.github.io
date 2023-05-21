"use strict";
class RawMap {
    constructor(level) {
        if (level == 0) {
            this.getLevel0();
        }
        if (level == 1) {
            this.getLevel1();
        }
    }
    getLevel0() {
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
        this.flowersToOpenPortal_ = 0;
        this.isbackgroundSpecific_ = false;
        this.showBlocks = true;
        this.initialLifeAmount_ = 0.1;
        this.portalCenterX_ = 17;
        this.portalCenterY_ = 5;
    }
    getLevel1() {
        this.rawGrid_ =
            [
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
                [0, 7, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 8, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            ];
        this.playerSpawnX_ = 14;
        this.playerSpawnY_ = 1;
        this.safeAreaX_ = 10;
        this.safeAreaY_ = 0;
        this.safeAreaWidth_ = 14;
        this.safeAreaHeight_ = 12;
        this.safeAreaIsHorizontal_ = true;
        this.safeAreaMaxHorizontalSpeed_ = 0.01;
        this.safeAreaAccelHorizontalSpeed_ = (-0.00005);
        this.backgroundImage_ = ["img/montain1.jpg"];
        this.foregroundImage_ = ["img/transparent.png"];
        this.flowersToOpenPortal_ = 0;
        this.isbackgroundSpecific_ = false;
        this.showBlocks = true;
        this.initialLifeAmount_ = 1;
        this.portalCenterX_ = 18;
        this.portalCenterY_ = 10;
    }
}
