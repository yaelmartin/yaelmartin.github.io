"use strict";
class Benchmark {
    constructor(jeu) {
        this.jeu_ = jeu;
    }
    bench() {
        this.gridX_ = Math.floor(this.jeu_.player_.gridX_);
        this.gridY_ = Math.floor(this.jeu_.player_.gridY_);
        this.surroundings1();
        this.surroundings2();
        this.surroundings3();
        this.surroundings4();
    }
    surroundings1() {
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            this.jeu_.getSurroundings(this.gridX_, this.gridY_);
        }
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.log(`Total time for 1000 iterations: ${elapsedTime} milliseconds`);
    }
    surroundings2() {
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            this.jeu_.getSurroundings2(this.gridX_, this.gridY_);
        }
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.log(`Total time for 1000 iterations: ${elapsedTime} milliseconds`);
    }
    surroundings3() {
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            this.jeu_.getSurroundings3(this.gridX_, this.gridY_);
        }
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
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
