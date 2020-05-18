import React from "react";
import ReactDOM from "react-dom";

import {Node, withEngineContext, WINDOW_DEFAULT_EVENTS, Engine} from "../../../flint-react-canvas";
import {Chain} from "../canvasComponets/Chain";
import {PLUGIN_EVENTS, PLUGIN_ENGINE_MODE} from "./index";
import {PLUGIN_COMPONENTS} from "../canvasComponets";
import {getRefNameByBlock} from "../parser/graphToBlockTree";

class DndCreateChain extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            position: [0, 0],
            isMoving: false,
            initXY: {x: 100, y: 100},
            endXY: {x: 100, y: 100}
        };
        this.engineRegister();
    }

    engineRegister() {
        const {onAfterAddEngine} = this.props;

        onAfterAddEngine(({engine}: {engine: Engine}) => {

            const getXY = (nodeData: any, socketId: string) => {
                const {offsetLeft, offsetWidth, offsetTop, offsetHeight} = nodeData.props.sockets.find(socket => socket.id === socketId);

                return {
                    x: nodeData.x + offsetLeft + offsetWidth / 2,
                    y: nodeData.y + offsetTop + offsetHeight / 2
                };
            };

            const connected = (startNodeId: string, endNodeId: string, startSocket: string, endSocket: string) => {
                return Array.from(engine.nodes.values()).reduce((ret, node: Node) => {
                    if (node.nodeData.name === PLUGIN_COMPONENTS.Chain.name) {
                        const {startNodeId: a, endNodeId: b, startSocket: c, endSocket: d} = node.nodeData.props;
                        return ret ||
                            (startNodeId === a && endNodeId === b && startSocket === c && endSocket === d) ||
                            (startNodeId === b && endNodeId === a && startSocket === d && endSocket === c);
                    }
                    return ret;
                }, false);
            };

            engine.on(WINDOW_DEFAULT_EVENTS.pointermove, (input: any) => {
                const {x, y} = input;
                const {isMoving} = this.state;
                if (isMoving) {
                    this.setEndXY(x + 1, y + 1);
                }
            });

            engine.on(WINDOW_DEFAULT_EVENTS.click, (input: any) => {
                const {x, y} = input;
                if (engine.mode === PLUGIN_ENGINE_MODE.CREATING_CHAIN) {
                    engine.mode = PLUGIN_ENGINE_MODE.READY;
                    engine.modedata = null;

                    this.setInitXY(x, y);
                    this.setEndXY(x, y);
                    this.click(x, y);
                }
            });

            engine.on(PLUGIN_EVENTS.PLUGIN_CHAIN_RERENDER, (data: any) => {
                const {nodeData, socketId} = data;
                (engine.nodeToNeighbors[nodeData.nodeId] || []).forEach((chainId: string) => {
                    const chain = engine.nodes.get(chainId);
                    if (chain) {
                        const {startNodeId, startSocket} = chain.nodeData.props;
                        if (startNodeId === nodeData.nodeId && startSocket === socketId) {
                            const node = engine.nodes.get(nodeData.nodeId);
                            if (node) {
                                const {x, y} = getXY(node.nodeData, socketId);
                                const newNodeData = {
                                    ...chain.nodeData,
                                    props: {
                                        ...chain.nodeData.props,
                                        x1: x,
                                        y1: y
                                    }
                                };
                                chain.updateNodeData(newNodeData);
                                const Component = PLUGIN_COMPONENTS.Chain.component;
                                ReactDOM.render(<Component {...newNodeData?.props} engine={engine} nodeData={newNodeData}/>, chain.container);
                            }
                        }
                    }
                });
            });

            engine.on(PLUGIN_EVENTS.PLUGIN_CHAIN_CANCEL, () => {
                engine.mode = PLUGIN_ENGINE_MODE.READY;
                engine.modedata = null;
            });

            engine.on(PLUGIN_EVENTS.PLUGIN_CHAIN_CREATE, (data: any) => {
                const {e, socket, nodeData} = data;
                e.preventDefault();
                e.stopPropagation();
                if (engine.mode === PLUGIN_ENGINE_MODE.READY) {
                    engine.mode = PLUGIN_ENGINE_MODE.CREATING_CHAIN;

                    engine.pointermove(e as any as PointerEvent);

                    const {x: x1, y: y1} = getXY(nodeData, socket.id);
                    const {id, type} = socket;
                    engine.modedata = {
                        startNode: nodeData,
                        startSocket: id,
                        startType: type,
                        x1,
                        y1
                    };

                    this.setEndXY(x1, y1);
                    this.setInitXY(x1, y1);
                    this.click(x1, y1);
                } else {
                    engine.mode = PLUGIN_ENGINE_MODE.READY;

                    const endNode = nodeData;
                    const {id, type} = socket;
                    let endSocket = id;
                    let {x1, y1, startNode, startSocket, startType} = engine.modedata;

                    let {x: x2, y: y2} = getXY(nodeData, socket.id);
                    this.click(x2, y2);
                    let startNodeId = startNode.nodeId;
                    let endNodeId = endNode.nodeId;

                    if (startType === "input") {
                        [startNodeId, endNodeId, startSocket, endSocket, x1, y1, x2, y2] = [endNodeId, startNodeId, endSocket, startSocket, x2, y2, x1, y1];
                    }
                    if (startType !== type && !connected(startNodeId, endNodeId, startSocket, endSocket)) {
                        const newNodeData = engine.addNode({
                            nodeId: "",
                            name: PLUGIN_COMPONENTS.Chain.name, x: 0, y: 0, props: {
                                x1, y1, x2, y2,
                                startNodeId, endNodeId, startSocket, endSocket,
                            }, zIndex: 1
                        });
                        if (newNodeData!.nodeId) {
                            engine.addNeighbor(newNodeData!.nodeId, startNode.nodeId);
                            engine.addNeighbor(newNodeData!.nodeId, endNode.nodeId);
                        }
                        const nodeDataList: any[] = [];
                        engine.nodes.forEach((node: Node) => nodeDataList.push(node.nodeData));
                        const refsMapping = getRefNameByBlock(nodeDataList);
                        engine.trigger(PLUGIN_EVENTS.NODE_UPDATE_BLOCKNAME, refsMapping);
                    } else {

                    }

                    engine.modedata = null;
                }
            });
        });
    }

    setInitXY(x: any, y: any) {
        this.setState({initXY: {x, y}});
    }

    setEndXY(x: any, y: any) {
        this.setState({endXY: {x, y}});
    }

    click(x: any, y: any) {
        const {isMoving} = this.state;
        if (!isMoving) {
            this.setState({isMoving: true, position: [x, y], visible: true});
        } else {
            this.setState({isMoving: false, visible: false});
        }
    }

    handleOnClick = async () => {
        const {editor} = this.props;
        const engine = editor.getEngine();
        const {position} = this.state;
        const [x, y] = position;
        this.click(x, y);
        engine.trigger(PLUGIN_EVENTS.PLUGIN_CHAIN_CANCEL, {})
    };

    render() {
        const {visible, position, initXY, endXY} = this.state;
        return (
            <>
                {!!visible &&
                <div
                    onClick={this.handleOnClick}
                >
                    <Chain x1={initXY.x} y1={initXY.y} x2={endXY.x} y2={endXY.y}/>
                </div>}
            </>
        );
    }
}

export default withEngineContext(DndCreateChain);