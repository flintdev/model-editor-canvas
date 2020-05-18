import {ENGINE_MODE} from "../../../flint-react-canvas";

export const PLUGIN_EVENTS = {
    PLUGIN_NODE_CREATE: "pluginnode::create",
    PLUGIN_CHAIN_CREATE: "pluginchain::create",
    NODE_DOUBLECLICK: "node::doubleclick",
    NODE_UPDATE_BLOCKNAME: "node:updateblockname",
    PLUGIN_CHAIN_RERENDER: "pluginchain::rerender",
    PLUGIN_CHAIN_CANCEL: "pluginchain::cancel",
};

export const PLUGIN_ENGINE_MODE = {
    ...ENGINE_MODE,
    CREATING_CHAIN: "CREATING_CHAIN"
};