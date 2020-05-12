import React from "react";
import {SocketIO} from "./SocketIO";
import {PLUGIN_EVENTS} from "../canvasPlugins";
import {utils, NODE_DEFAULT_EVENTS, NodeData, Engine} from "../../../flint-react-canvas";
import {Paper} from "@material-ui/core";

export class Block extends React.PureComponent<any, any> {
    sockets: any;

    constructor(props: any) {
        super(props);
        this.handleClickSocket = this.handleClickSocket.bind(this);
        this.handleBlockDbClick = this.handleBlockDbClick.bind(this);
        this.refRender = this.refRender.bind(this);
        this.sockets = {};
    }

    componentDidMount() {
        const {nodeData, engine} = this.props;
        if (engine) {
            engine.trigger(NODE_DEFAULT_EVENTS.NODE_TRANSLATE, {nodeData, dx: 0, dy: 0});
        }
    }

    handleClickSocket(e: any, socketType: string, socketId: string) {
        const {nodeData, engine} = this.props;
        if (engine) {
            const node = engine.nodes.get(nodeData.nodeId);
            const isSocketHasChain = (engine.nodeToNeighbors[nodeData.nodeId] || []).reduce((ret: boolean, id: string) => {
                const chain = engine.nodes.get(id);
                if (chain && chain.nodeData.props.startSocket === `${socketType}::${socketId}`) {
                    ret = ret || true;
                }
                return ret;
            }, false);
            if (!isSocketHasChain && node) {
                engine.trigger(PLUGIN_EVENTS.PLUGIN_CONNECTION_CREATE, {
                    e,
                    socketType,
                    socketId,
                    nodeData: node.nodeData
                });
            }
        }
    }

    refRender(ref: any, socketType: string, socketId: string, socketsData: any) {
        const {nodeData, engine} = this.props;
        if (engine) {
            setTimeout(() => {
                const node = engine.nodes.get(nodeData.nodeId);
                this.sockets[`${socketType}::${socketId}`] = {
                    ...socketsData,
                    offsetLeft: ref.offsetLeft,
                    offsetWidth: ref.offsetWidth,
                    offsetTop: ref.offsetTop,
                    offsetHeight: ref.offsetHeight,
                };
                const newNodeData = {
                    ...node.nodeData,
                    props: {
                        ...node.nodeData.props,
                        sockets: this.sockets
                    }
                };
                node.updateNodeData(newNodeData);
            }, 0);
        }
    }

    handleAddSocket(e: React.MouseEvent, socketType: string) {
        e.stopPropagation();
        const {nodeData, engine} = this.props;
        const node = engine.nodes.get(nodeData.nodeId);
        this.sockets[`${socketType}::${utils.getUUId()}`] = {blockItemName: "default", dataType: "string"};
        const newNodeData = {
            ...node.nodeData,
            props: {
                ...node.nodeData.props,
                sockets: this.sockets
            }
        };
        node.updateNodeData(newNodeData);
        engine.trigger(NODE_DEFAULT_EVENTS.NODE_RENDER, {
            container: node.container,
            component: engine.components.get(newNodeData.name),
            nodeData: newNodeData
        });
    }

    handleBlockDbClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const {nodeData, engine} = this.props;
        const node = engine.nodes.get(nodeData.nodeId);
        engine.trigger(PLUGIN_EVENTS.NODE_DOUBLECLICK, {nodeData: node.nodeData, e});
    }

    getSocketNames(sockets: any) {
        return Object.keys(sockets).map(s => {
            const [socketType, socketId] = s.split("::");
            return {socketType, socketId};
        });
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
            "input": {alignSelf: `flex-start`, marginLeft: `-10px`, visibility: visibility ? "visible" : "hidden"},
            // "input": { position: `absolute`, top: `50%`, marginLeft: `-15px` },
            "output": {alignSelf: `flex-end`, marginRight: `-10px`, visibility: visibility ? "visible" : "hidden"}
        } as any;
        return map[socketType] as any;
    }

    render() {
        const {nodeData, engine, sockets, blockName} = this.props;
        const socketNames = this.getSocketNames(sockets);

        return (
            <Paper className={"block paper"} onDoubleClick={this.handleBlockDbClick} style={{border: `2px solid grey`}}>
                {!!socketNames && socketNames.map(({socketType, socketId}, i) => {
                    const socketsData = sockets[`${socketType}::${socketId}`];
                    const {blockItemName = "default", dataType = "string", required = false} = socketsData;
                    const isChain = dataType.indexOf("$ref") !== -1;
                    return (
                        <div key={i} style={{
                            marginBottom: 5,
                            display: "flex",
                            borderBottom: socketType === "input" ? `2px solid grey` : ""
                        }}>
                            {socketType === "output" && <div className={"block-item"}>
                                <span className={"block-item-name"}><span
                                    style={{color: "red"}}>{required ? '*' : ''}</span>{blockItemName}</span>
                                <span className={"block-item-type"}
                                      style={{color: this.getBlockItemColor(dataType)}}>{dataType}</span>
                            </div>}
                            {<SocketIO
                                style={this.getSocketStyle(socketType, (socketType === "input" || isChain))}
                                socketId={socketId}
                                socketType={socketType}
                                socketsData={socketsData}
                                refRender={this.refRender}
                                handleClickSocket={this.handleClickSocket}
                            />}
                            {
                                socketType === "input" && (
                                    <div className={"block-title"}>
                                        <span>{blockName}</span>
                                    </div>
                                )
                            }
                        </div>
                    );
                })}
                {/*<button className={"block-adder"} onClick={(e) => this.handleAddSocket(e, "output")}>+</button>*/}
            </Paper>
        );
    }
}