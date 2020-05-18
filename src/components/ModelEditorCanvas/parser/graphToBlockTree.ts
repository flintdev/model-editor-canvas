import {PLUGIN_COMPONENTS} from "../canvasComponets";
import {utils} from "@flintdev/flint-react-canvas/dist";

export const getRefNameByBlock = (nodeDataList: any[]) => {
    const blockIdToNames = nodeDataList
        .filter((node: any) => node.name === PLUGIN_COMPONENTS.Block.name)
        .reduce((ret, block) => {
            const {nodeId, props} = block;
            const {blockName = ""} = props;
            ret[nodeId] = blockName;
            return ret;
        }, {});
    return nodeDataList
        .filter((node: any) => node.name === PLUGIN_COMPONENTS.Chain.name)
        .reduce((ret: any, chain: any) => {
            const {endNodeId, endSocket, startNodeId, startSocket} = chain.props;
            ret[`${startNodeId}::${startSocket}`] = blockIdToNames[endNodeId];
            return ret;
        }, {});
};

export const graphToBlockTree = (data: any) => {
    const {nodeDataList} = data;
    const refsMapping = getRefNameByBlock(nodeDataList);
    return {
        canvasData: data,
        blockData: nodeDataList
            .filter((node: any) => node.name === PLUGIN_COMPONENTS.Block.name)
            .map((block: any) => {
                const {nodeId} = block;
                const {blockName, sockets} = block.props;
                const refs = {};
                const blockItems = sockets
                    .reduce((ret, socket) => {
                        const {type, name = "", id = ""} = socket;
                        if (type === "input") return ret;
                        const ref = refsMapping[`${nodeId}::${id}`];
                        if (ref) {
                            refs[name] = ref;
                        }
                        delete socket.offsetHeight;
                        delete socket.offsetLeft;
                        delete socket.offsetTop;
                        delete socket.offsetWidth;
                        const tmp = utils.deepCopy(socket);
                        delete tmp.type;
                        ret.push(tmp);
                        return ret;
                    }, []);
                return {
                    name: blockName,
                    items: blockItems,
                    refs
                };
            })
    };
};
