import {Block} from "./Block";
import {Chain} from "./Chain";
import {SocketIO} from "./SocketIO";

export const PLUGIN_COMPONENTS = {
    Block: {
        component: Block,
        name: "Block"
    },
    Chain: {
        component: Chain,
        name: "Chain"
    },
    SocketIO: {
        component: SocketIO,
        name: "SocketIO"
    }
};

