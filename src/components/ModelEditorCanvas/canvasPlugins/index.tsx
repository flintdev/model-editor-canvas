import {ENGINE_MODE} from "../../../flint-react-canvas";

export const PLUGIN_EVENTS = {
    PLUGIN_NODE_CREATE: "pluginnode::create",
    PLUGIN_CONNECTION_CREATE: "pluginconnection::create",
    NODE_DOUBLECLICK: "node::doubleclick"
};

export const PLUGIN_ENGINE_MODE = {
    ...ENGINE_MODE,
    CREATING_CHAIN: "CREATING_CHAIN"
};