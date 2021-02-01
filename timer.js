/**
 * TCSS 491 - Winter 2021 - Professor Chris Marriott
 * Group: Gold 5
 * Members: Hung Thai, Dung Tran, Quoc Phung
 */

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;
    };

    tick() {
        var current = Date.now();
        var delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        var gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };
};