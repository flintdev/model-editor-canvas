import React from "react";
import {SocketIO} from "./SocketIO";
import {PLUGIN_ENGINE_MODE, PLUGIN_EVENTS} from "../canvasPlugins";
import {utils, NODE_DEFAULT_EVENTS, NodeData, Node} from "../../../flint-react-canvas";
import {Paper} from "@material-ui/core";
import {getRefNameByBlock} from "../parser/graphToBlockTree";

export class Block extends React.PureComponent<any, any> {
    sockets: any;

    constructor(props: any) {
        super(props);
        this.handleClickSocket = this.handleClickSocket.bind(this);
        this.handleBlockDbClick = this.handleBlockDbClick.bind(this);
        this.handleBlockClick = this.handleBlockClick.bind(this);
        this.refRender = this.refRender.bind(this);
        this.sockets = this.props.sockets;
        this.state = {
            refsMapping: {}
        };
    }

    componentDidMount() {
        const {nodeData, engine} = this.props;
        if (engine) {
            engine.trigger(NODE_DEFAULT_EVENTS.NODE_TRANSLATE, {nodeData, dx: 0, dy: 0});
            engine.on(PLUGIN_EVENTS.NODE_UPDATE_BLOCKNAME, (refsMapping) => {
                this.setState({
                    refsMapping: refsMapping
                });
            });
            setTimeout(() => {
                const nodeDataList: any[] = [];
                engine.nodes.forEach((node: Node) => nodeDataList.push(node.nodeData));
                this.setState({
                    refsMapping: getRefNameByBlock(nodeDataList)
                })
            }, 0);
        }
    }

    handleClickSocket(e: any, socket: any) {
        const {nodeData, engine} = this.props;
        if (engine) {
            const node = engine.nodes.get(nodeData.nodeId);
            const isSocketHasChain = (engine.nodeToNeighbors[nodeData.nodeId] || []).reduce((ret: boolean, id: string) => {
                const chain = engine.nodes.get(id);
                if (chain && chain.nodeData.props.startSocket === ``) {
                    ret = ret || true;
                }
                return ret;
            }, false);
            if (!isSocketHasChain && node) {
                engine.trigger(PLUGIN_EVENTS.PLUGIN_CHAIN_CREATE, {
                    e,
                    socket,
                    nodeData: node.nodeData
                });
            }
        }
    }

    refRender(ref: any, socket: any) {
        const {nodeData, engine} = this.props;
        if (engine) {
            setTimeout(() => {
                const {id} = socket;
                const node = engine.nodes.get(nodeData.nodeId);
                if (node) {
                    const {offsetLeft, offsetWidth, offsetTop, offsetHeight} = ref;
                    const sockets = nodeData.props.sockets;
                    const socketIndex = sockets.findIndex(socket => socket.id == id);
                    sockets[socketIndex] = {
                        ...socket,
                        offsetLeft,
                        offsetWidth,
                        offsetTop,
                        offsetHeight,
                    };
                    const newNodeData = {
                        ...node.nodeData,
                        props: {
                            ...node.nodeData.props,
                            sockets: sockets
                        }
                    };
                    node.updateNodeData(newNodeData);
                    engine.trigger(PLUGIN_EVENTS.PLUGIN_CHAIN_RERENDER, {nodeData, socketId: id})
                }
            }, 0);
        }
    }

    handleBlockDbClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const {nodeData, engine} = this.props;
        const node = engine.nodes.get(nodeData.nodeId);
        engine.trigger(PLUGIN_EVENTS.NODE_DOUBLECLICK, {nodeData: node.nodeData, e});
    }

    handleBlockClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const {nodeData, engine} = this.props;
        const node = engine.nodes.get(nodeData.nodeId);
        if (engine.mode === PLUGIN_ENGINE_MODE.CREATING_CHAIN) {
            engine.trigger(PLUGIN_EVENTS.PLUGIN_CHAIN_CREATE, {
                e,
                socket: node.nodeData.props.sockets.find(socket => socket.type === "input"),
                nodeData: node.nodeData
            });
        }
    }

    getBlockItemColor(dataType: string) {
        const map = {
            "integer": "green",
            "string": "blue",
            "object": "purple",
            "boolean": "brown"
        } as any;
        return map[dataType] || "grey";
    }

    getSocketStyle(socketType: string, visibility: boolean) {
        const map = {
            "input": {alignSelf: `flex-start`, marginLeft: `-10px`, visibility: visibility ? "hidden" : "hidden"},
            // "input": { position: `absolute`, top: `50%`, marginLeft: `-15px` },
            "output": {alignSelf: `flex-end`, marginRight: `-10px`, visibility: visibility ? "visible" : "hidden"}
        } as any;
        return map[socketType] as any;
    }

    getDataTypeDisplay = (nodeData, socketId, dataType) => {
        if (!nodeData) {
            return dataType;
        }
        const {nodeId} = nodeData;
        const {refsMapping} = this.state;
        const ret = refsMapping[`${nodeId}::${socketId}`];
        return ret ? dataType.replace("$ref", ret) : dataType;
    };

    render() {
        const {nodeData, engine, sockets, blockName} = this.props;

        return (
            <Paper className={"block paper"} onDoubleClick={this.handleBlockDbClick} style={{border: `2px solid grey`}} onClick={this.handleBlockClick}>
                {!!sockets && sockets.map((socket, i) => {
                    const {type, id, name = "default", dataType = "$ref", required = false} = socket;
                    const isChain = dataType.indexOf("$ref") !== -1;

                    return (
                        <div key={i} style={{
                            marginBottom: 5,
                            display: "flex",
                            borderBottom: type === "input" ? `2px solid grey` : ""
                        }}>
                            {type === "output" && <div className={"block-item"}>
                                <span className={"block-item-name"} style={{fontWeight: required ? "bold" : "unset"}}>
                                    {name}
                                </span>
                                <span className={"block-item-type"} style={{color: this.getBlockItemColor(dataType)}}>
                                    {this.getDataTypeDisplay(nodeData, id, dataType)}
                                </span>
                            </div>}
                            {<SocketIO
                                style={this.getSocketStyle(type, (type === "input" || isChain))}
                                socketId={id}
                                socketType={type}
                                socket={socket}
                                refRender={this.refRender}
                                handleClickSocket={this.handleClickSocket}
                            />}
                            {
                                type === "input" && (
                                    <div className={"block-title"}>
                                        <span>{blockName}</span>
                                    </div>
                                )
                            }
                        </div>
                    );
                })}
            </Paper>
        );
    }
}