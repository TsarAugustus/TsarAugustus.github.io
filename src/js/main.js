import { tick } from './tick.js';
import { createUI } from './createUI.js';

let primeList = [];

function init() {
    primeList = primeGenerator(100);
    const gameSpeed = 1000;
    createUI();
    
    setInterval(function() {
        tick();
    }, gameSpeed);
}

function isPrime(num) {
    for ( var i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
}

function primeGenerator(n) {
    var arr = [2];
    for ( var i = 3; i < n; i+=2 ) {
        if ( isPrime(i) ) {
            arr.push(i);
        }
    }
    return arr;
}

window.onload = function() { init() };