"use strict";
class Benchmark {
    constructor(jeu) {
        this.jeu_ = jeu;
    }
    bench() {
        this.gridX_ = Math.floor(this.jeu_.player_.gridX_);
        this.gridY_ = Math.floor(this.jeu_.player_.gridY_);
        this.surroundings4();
    }
    surroundings4() {
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            this.jeu_.getSurroundings4(this.gridX_, this.gridY_);
        }
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.log(`Total time for 1000 iterations: ${elapsedTime} milliseconds`);
    }
}
