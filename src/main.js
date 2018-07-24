import Sketch from './sketch.js';
import { options } from './conf.js';

function main () {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const sketch = new Sketch(ctx, options.sketch);

    sketch.init().then(msg => console.log(msg)).catch(errorMsg => console.log(errorMsg));
};

function map (num, inMin, inMax, outMin, outMax) {
    // https://stackoverflow.com/a/23202637
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

main();
