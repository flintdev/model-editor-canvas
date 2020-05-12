import {PLUGIN_COMPONENTS} from "../canvasComponets";

export const graphToBlockTree = (data: any) => {
    const {nodeDataList} = data;
    const nodeIdToBlockName: any = {};
    const socketIdToBlockItemName: any = {};
    return {
        canvasData: data,
        blockData: nodeDataList
            .filter((block: any) => block.name === PLUGIN_COMPONENTS.Block.name)
            .map((block: any) => {
                const {nodeId} = block;
                const {blockName, sockets} = block.props;
                nodeIdToBlockName[nodeId] = blockName;
                const blockItems = Object.keys(sockets)
                    .filter(k => {
                        const [socketType, socketId] = k.split("::");
                        return socketType === "output";
                    })
                    .map((k: string) => {
                        const socket = sockets[k];
                        const {blockItemName, dataType, required = false} = socket;
                        socketIdToBlockItemName[`${nodeId}::${k}`] = blockItemName;
                        return {
                            name: blockItemName,
                            dataType,
                            required
                        };
                    });
                return {
                    name: blockName,
                    items: blockItems
                };
            }),
        refs: nodeDataList
            .filter((block: any) => block.name === PLUGIN_COMPONENTS.Chain.name)
            .reduce((ret: any, chain: any) => {
                const {endNodeId, endSocket, startNodeId, startSocket} = chain.props;
                const startBlockItemName = socketIdToBlockItemName[`${startNodeId}::${startSocket}`];
                const endBlockName = nodeIdToBlockName[endNodeId];
                ret[startBlockItemName] = endBlockName;
                return ret;
            }, {}),
    };
};