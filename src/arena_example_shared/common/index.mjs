import { getTicks } from '/game/utils';

function isFirstTick() {
    return getTicks() === 1;
}

export { isFirstTick };
