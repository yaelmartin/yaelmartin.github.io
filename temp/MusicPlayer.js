"use strict";
class MusicPlayer {
    constructor(audioElementId) {
        this.audioElement = document.getElementById(audioElementId);
        this.audioElement.addEventListener('ended', this.handleAudioEnded.bind(this));
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
    handleAudioEnded() {
        this.audioElement.currentTime = 0;
        this.audioElement.play();
    }
}
