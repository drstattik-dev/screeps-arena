import { hello } from './common/hello.mjs';
import { isFirstTick } from './common/index.mjs';

// This example shows how to import shared functionality that can be used across arenas
function loop() {
    if (isFirstTick()) {
        console.log(hello());
    }
}

export { loop };
