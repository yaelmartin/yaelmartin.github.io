"use strict";
class InputSystem {
    applyReleasedKey() {
        for (let index = 0; index < 4; index++) {
            if (this.needToSetToFalse[index]) {
                this.currentArrows[index] = false;
                this.needToSetToFalse[index] = false;
            }
        }
    }
    setArrowUpToFalse() {
        this.currentArrows[1] = false;
    }
    updateKeyPressed(event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "Down":
            case "ArrowDown":
                this.applyPressedNow(0);
                break;
            case "Up":
            case "ArrowUp":
                this.applyPressedNow(1);
                break;
            case "Left":
            case "ArrowLeft":
                this.applyPressedNow(2);
                break;
            case "Right":
            case "ArrowRight":
                this.applyPressedNow(3);
                break;
            default:
                return;
        }
    }
    updateKeyReleased(event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "Down":
            case "ArrowDown":
                this.applyReleasedNowOrFrameAfter(0);
                break;
            case "Up":
            case "ArrowUp":
                this.applyReleasedNowOrFrameAfter(1);
                break;
            case "Left":
            case "ArrowLeft":
                this.applyReleasedNowOrFrameAfter(2);
                break;
            case "Right":
            case "ArrowRight":
                this.applyReleasedNowOrFrameAfter(3);
                break;
            default:
                return;
        }
    }
    applyPressedNow(keyIndex) {
        this.currentArrows[keyIndex] = true;
        this.needToSetToFalse[keyIndex] = false;
    }
    applyReleasedNowOrFrameAfter(keyIndex) {
        if (this.currentArrows[keyIndex]) {
            this.needToSetToFalse[keyIndex] = true;
        }
        else {
            this.currentArrows[keyIndex] = false;
        }
    }
    startListening() {
        window.addEventListener("keydown", this.listenerKeyPressed_);
        window.addEventListener("keyup", this.listenerKeyReleased_);
    }
    stopListening() {
        window.removeEventListener("keydown", this.listenerKeyPressed_);
        window.removeEventListener("keyup", this.listenerKeyReleased_);
    }
    debugCurrentArrows() {
        return this.currentArrows.toString();
    }
    constructor(jeu) {
        this.needToSetToFalse = [false, false, false, false];
        this.currentArrows = [false, false, false, false];
        this.jeu_ = jeu;
        this.listenerKeyPressed_ = (event) => { this.updateKeyPressed(event); }, true;
        this.listenerKeyReleased_ = (event) => { this.updateKeyReleased(event); }, true;
    }
    getCorrectedArrowsInputs() {
        if (this.currentArrows[2] == this.currentArrows[3]) {
            return [this.currentArrows[0], this.currentArrows[1], false, false];
        }
        else {
            return this.currentArrows;
        }
    }
}
