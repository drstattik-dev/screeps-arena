import { getTicks } from '/game/utils';

function loop() {
    console.log(`The time is ${getTicks()}`);
}

export { loop };
