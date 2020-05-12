import React from "react";
import {Block} from "../canvasComponets/Block";
import {
    Node,
    withEngineContext,
    NODE_DEFAULT_EVENTS,
    WINDOW_DEFAULT_EVENTS,
    NodeData,
    utils, Engine
} from "../../../flint-react-canvas";
import {PLUGIN_EVENTS} from "./index";
import {PLUGIN_COMPONENTS} from "../canvasComponets";

class DndCreateBlock extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            position: [0, 0],
            isMoving: false
        };
        this.engineRegister();
    }

    engineRegister() {
        const {onAfterAddEngine} = this.props;

        onAfterAddEngine(({engine}: { engine: Engine }) => {

            engine.on(WINDOW_DEFAULT_EVENTS.pointermove, (input: any) => {
                const {isMoving} = this.state;
                const {x, y} = input;
                if (isMoving) {
                    this.move(x, y);
                }
            });

            engine.on(PLUGIN_EVENTS.NODE_DOUBLECLICK, (data: any) => {
                const {nodeData, e} = data;
                const {onBlockDbClick} = this.props;
                const filterPositionInfo = (data: any) => {
                    const ret = utils.deepCopy(data) as NodeData;
                    delete ret.x;
                    delete ret.zIndex;
                    delete ret.y;
                    const sockets = ret.props.sockets;
                    ret.props.sockets = Object.keys(sockets).reduce((ret: any, k: string) => {
                        const socket = sockets[k];
                        delete socket.offsetHeight;
                        delete socket.offsetLeft;
                        delete socket.offsetTop;
                        delete socket.offsetWidth;
                        ret[k] = socket;
                        return ret;
                    }, {});
                    return ret;
                };
                onBlockDbClick(filterPositionInfo(nodeData));
            });

            engine.on(NODE_DEFAULT_EVENTS.NODE_SELECT, (data: any) => {
                const {nodeData, e} = data;
                const neighbors = engine.nodeToNeighbors[nodeData.nodeId] || [];
                neighbors.forEach((id: string) => {
                    const node = engine.nodes.get(id);
                    node!.onStart();
                });
            });

            engine.on(NODE_DEFAULT_EVENTS.NODE_TRANSLATE, (data: any) => {
                const {nodeData, dx, dy} = data;
                const nodeId = nodeData.nodeId;
                const neighbors = engine.nodeToNeighbors[nodeId] || [];
                neighbors.forEach((id: string) => {
                    const node = engine.nodes.get(id) as Node;
                    const oldNodeData = node.nodeData;
                    const newNodeData = {
                        ...oldNodeData,
                        props: {
                            ...oldNodeData.props,
                            x1: node._startPosition.props.x1 + (nodeId == node._startPosition.props.startNodeId ? dx : 0),
                            y1: node._startPosition.props.y1 + (nodeId == node._startPosition.props.startNodeId ? dy : 0),
                            x2: node._startPosition.props.x2 + (nodeId == node._startPosition.props.endNodeId ? dx : 0),
                            y2: node._startPosition.props.y2 + (nodeId == node._startPosition.props.endNodeId ? dy : 0),
                        }
                    };
                    node.updateNodeData(newNodeData);
                    engine.trigger(NODE_DEFAULT_EVENTS.NODE_RENDER, {
                        container: node.container,
                        component: engine.components.get(newNodeData.name),
                        nodeData: newNodeData
                    });
                });

            });

            engine.on(PLUGIN_EVENTS.PLUGIN_NODE_CREATE, (e: any) => {
                e.preventDefault();
                e.stopPropagation();

                engine.pointermove(e as any as PointerEvent);
                const {x, y} = engine.mouse;

                this.click(x, y);
            });
        });
    }

    click(x: any, y: any) {
        const {isMoving} = this.state;
        if (!isMoving) {
            this.setState({isMoving: true, position: [x, y], visible: true});
        } else {
            this.setState({isMoving: false, visible: false});
        }
    }

    move(x: any, y: any) {
        this.setState({position: [x, y]});
    }

    handleOnClick = async () => {
        const {position} = this.state;
        const {editor} = this.props;
        const engine = editor.getEngine();
        const [x, y] = position;
        this.click(x, y);
        engine.addNode({
            name: PLUGIN_COMPONENTS.Block.name, x: x, y: y, zIndex: 2,
            props: {
                blockName: "New Block",
                sockets: {
                    "input::0": {}
                }
            }
        });
    };

    render() {
        const {visible, position} = this.state;
        const [x, y] = position;
        return (
            <>
                {!!visible &&
                <div
                    style={{position: `fixed`, left: x, top: y}}
                    onClick={this.handleOnClick}
                >
                    <Block sockets={{"input::0": {}}} blockName={"New Block"}/>
                </div>}
            </>
        );
    }
}

export default withEngineContext(DndCreateBlock);