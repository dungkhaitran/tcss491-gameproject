// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// add global parameters here

const PARAMS = {
    DEBUG: true,
    SCALE: 3,
    BITWIDTH: 16
};

const FACING_SIDE = {
    RIGHT: 0,
    LEFT: 1,
    COUNT: 2
};

const MIN_WALK = 4.453125;
const MAX_WALK = 93.75;
const MAX_RUN = 153.75;
const ACC_WALK = 133.59375;
const ACC_RUN = 200.390625;
const DEC_REL = 182.8125;
const DEC_SKID = 365.625;
const MIN_SKID = 33.75;

const STOP_FALL = 1575;
const WALK_FALL = 1800;
const RUN_FALL = 2025;
const STOP_FALL_A = 450;
const WALK_FALL_A = 421.875;
const RUN_FALL_A = 562.5;

const MAX_FALL = 270;



const MAX_WIDTH = 5000;
const HP_MAIN = 50000;

const STATE = {
    IDLE: 0,
    MOVING: 1,
    ATTACKING: 2,
    JUMPING: 3,
    HIT: 4,
    DEAD:5,
    ATTACKING2: 6,
    VANISH: 7,
    ARISE: 8,
    AMBUSH: 9,
    FALL: 10,
    COUNT: 11
}

const GAME_STATE = {
    ONGOING: 0
    , LOSE: 1
    , WIN: 2
}