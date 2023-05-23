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
    benchDistance() {
        let x1 = 54564563215.2465;
        let x2 = -515121.3212;
        let y1 = 768465.1554;
        let y2 = -8784.452;
        let distance = 5;
        let startTime = performance.now();
        for (let i = 0; i < 1000000; i++) {
            this.jeu_.distanceBetweenPoints(x1, y1, x2, y2) < 5;
        }
        let endTime = performance.now();
        let elapsedTime = endTime - startTime;
        console.log(`Total time for 1000 iterations: ${elapsedTime} milliseconds`);
        startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            this.jeu_.distanceBetweenPointsIslessThan(x1, y1, x2, y2, 5);
        }
        endTime = performance.now();
        elapsedTime = endTime - startTime;
        console.log(`Total time for 1000 iterations: ${elapsedTime} milliseconds`);
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
