"use strict";
class MusicPlayer {
    constructor(audioElementId, loop) {
        this.audioElement = document.getElementById(audioElementId);
        if (loop) {
            this.audioElement.addEventListener('ended', this.handleAudioEnded.bind(this));
        }
    }
    play() {
        this.audioElement.play();
    }
    pause() {
        this.audioElement.pause();
    }
    playAt(seconds) {
        this.audioElement.currentTime = seconds;
        this.audioElement.play();
    }
    volume(multiplier) {
        this.audioElement.volume = multiplier;
    }
    handleAudioEnded() {
        this.audioElement.currentTime = 0;
        this.audioElement.play();
    }
}
