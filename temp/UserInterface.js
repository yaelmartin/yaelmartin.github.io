"use strict";
class UserInterface {
    constructor(jeu) {
        this.defaultZIndex_ = 120;
        this.jeu_ = jeu;
        let elementBackground = document.createElement("img");
        elementBackground.style.zIndex = "" + (this.defaultZIndex_);
        this.background_ = new Sprite(elementBackground);
        this.background_.setXY(0, 384);
        this.background_.setImage("img/bannerBottom.png", 640, 96);
        this.jeu_.appendChild(this.background_);
        let elementLifeBackgroundBox = document.createElement("img");
        elementLifeBackgroundBox.style.zIndex = "" + (this.defaultZIndex_ + 1);
        elementLifeBackgroundBox.style.outline = "4px solid #7D5A5A";
        elementLifeBackgroundBox.style.boxShadow = "box-shadow: 10px 10px 5px rgba(0,0,0,0.2);";
        this.lifeBackgroundBox_ = new Sprite(elementLifeBackgroundBox);
        this.lifeBackgroundBox_.setXY(16, 384 + 16);
        this.lifeBackgroundBox_.setImage("img/backgroundLife.png", 256, 64);
        this.jeu_.appendChild(this.lifeBackgroundBox_);
        let elementLifeCurrentBox = document.createElement("img");
        elementLifeCurrentBox.style.zIndex = "" + (this.defaultZIndex_ + 2);
        this.lifeCurrentBox_ = new Sprite(elementLifeCurrentBox);
        this.lifeCurrentBox_.setXY(16, 384 + 16);
        this.lifeCurrentBox_.setImage("img/currentLife.png", 32, 64);
        this.jeu_.appendChild(this.lifeCurrentBox_);
        let elementTimerBox = document.createElement("div");
        elementTimerBox.style.zIndex = "" + (this.defaultZIndex_ + 1);
        elementTimerBox.style.fontFamily = 'pixel';
        elementTimerBox.style.fontSize = "30px";
        elementTimerBox.style.textAlign = "right";
        this.timerBox_ = new Sprite(elementTimerBox);
        this.timerBox_.setWidth(150);
        this.timerBox_.setHeight(32);
        this.timerBox_.setXY(640 - 150 - 64, 480 - 16 - 32);
        this.jeu_.appendChild(this.timerBox_);
        let elementFlowerBox = document.createElement("div");
        elementFlowerBox.style.zIndex = "" + (this.defaultZIndex_ + 1);
        elementFlowerBox.style.lineHeight = "32px";
        elementFlowerBox.style.fontFamily = 'pixel';
        elementFlowerBox.style.fontFamily = 'pixel';
        elementFlowerBox.style.fontSize = "27px";
        elementFlowerBox.style.textAlign = "left";
        this.flowerBox_ = new Sprite(elementFlowerBox);
        this.flowerBox_.setWidth(350);
        this.flowerBox_.setHeight(32);
        this.flowerBox_.setXY(640 - 350, 384 + 16);
        this.jeu_.appendChild(this.flowerBox_);
        let elementEndingScore = document.createElement("div");
        elementEndingScore.style.zIndex = "" + (95);
        elementEndingScore.style.fontFamily = 'pixel';
        elementEndingScore.style.color = 'white';
        elementEndingScore.style.fontSize = "25px";
        elementEndingScore.style.textAlign = "left";
        this.endingScore_ = new Sprite(elementEndingScore);
        this.endingScore_.setWidth(350);
        this.endingScore_.setHeight(300);
        this.endingScore_.setXY(70, -18);
        let elementGlobalRank = document.createElement("div");
        elementGlobalRank.style.zIndex = "" + (95);
        elementGlobalRank.style.fontFamily = 'pixel';
        elementGlobalRank.style.color = 'white';
        elementGlobalRank.style.fontSize = "20px";
        elementGlobalRank.style.textAlign = "left";
        this.globalRank_ = new Sprite(elementGlobalRank);
        this.globalRank_.setWidth(350);
        this.globalRank_.setHeight(300);
        this.globalRank_.setXY(400, 15);
        let elementhideUI = document.createElement("img");
        elementhideUI.style.zIndex = "" + (this.defaultZIndex_ + 10);
        this.hideUIbottom_ = new Sprite(elementhideUI);
        this.hideUIbottom_.setImage("img/bannerEnding.png", 640, 96);
        this.hideUIbottom_.setWidth(640);
        this.hideUIbottom_.setHeight(96);
        this.hideUIbottom_.setXY(0, 384);
    }
    setVisualLife(value) {
        let newWidth = this.lifeBackgroundBox_.getWidth() * value;
        if (newWidth < 0) {
            newWidth = 0;
        }
        this.lifeCurrentBox_.setWidth(newWidth);
    }
    clearFlowers() {
    }
    setVisualTimer(text) {
        this.timerBox_.getElement().innerHTML = text;
    }
    setFlowerBox(currentFlowers, required) {
        if (currentFlowers == null) {
            this.flowerBox_.getElement().innerHTML = "";
        }
        else {
            this.flowerBox_.getElement().innerHTML = "Fleurs requises " + currentFlowers + "/" + required + "<br>Niveau " + this.jeu_.getCurrentLevel();
        }
    }
    setEndingUI(value) {
        if (value) {
            let totalGameFrames = 0;
            let textToShowEnding = "<ul>";
            for (let i = 0; i < this.jeu_.nbFramesPerLevel.length; i++) {
                totalGameFrames = totalGameFrames + this.jeu_.nbFramesPerLevel[i];
                textToShowEnding = textToShowEnding + "<li>Niveau " + i + ": <i>" + (this.jeu_.nbFramesPerLevel[i] / 60).toFixed(2) + "s</i></li>";
            }
            textToShowEnding = textToShowEnding + "</ul><br><br>Echecs: " + this.jeu_.totalDeaths_ + "<br>Score total: <i>" + ((totalGameFrames / 60).toFixed(2)) + "s</i>";
            this.endingScore_.getElement().innerHTML = textToShowEnding;
            this.jeu_.appendChild(this.endingScore_);
            this.retrieveGlobalRank();
            this.jeu_.appendChild(this.globalRank_);
            this.jeu_.appendChild(this.hideUIbottom_);
        }
        else {
            this.jeu_.removeChild(this.endingScore_);
            this.endingScore_.getElement().innerHTML = "";
            this.jeu_.removeChild(this.globalRank_);
            this.globalRank_.getElement().innerHTML = "";
            this.jeu_.removeChild(this.hideUIbottom_);
        }
    }
    retrieveGlobalRank() {
        let request = new XMLHttpRequest();
        let parameters = "getScore=1";
        request.open("get", "http://localhost/sae401/index.php?" + parameters);
        request.onreadystatechange = () => {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                const scores = JSON.parse(request.responseText);
                console.log(scores);
                let textToShowGlobalScore = "Meilleurs Temps<ul>";
                scores.forEach(score => {
                    textToShowGlobalScore = textToShowGlobalScore + "<li><i>" + ((score.score / 60).toFixed(2)) + "s</i> ";
                });
                textToShowGlobalScore = textToShowGlobalScore + "<ul>";
                this.globalRank_.getElement().innerHTML = textToShowGlobalScore;
            }
        };
        request.send();
    }
}
