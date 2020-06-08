import React from "react";
import {
    withEngineContext,
    Engine,
    NODE_DEFAULT_EVENTS,
    NodeData,
    Node,
    ENGINE_DEFAULT_EVENTS
} from "../../../flint-react-canvas";
import {PLUGIN_EVENTS} from "./index";
import {PLUGIN_COMPONENTS} from "../canvasComponets";
import {getRefNameByBlock, graphToBlockTree} from "../parser/graphToBlockTree";
import {Button, IconButton, Tooltip} from "@material-ui/core";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import {utils} from "@flintdev/flint-react-canvas/dist";

class ToolBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.init();
        this.handleCreateNode = this.handleCreateNode.bind(this);
        this.handleRemoveAllNodes = this.handleRemoveAllNodes.bind(this);
        this.handleSaveCanvas = this.handleSaveCanvas.bind(this);
        this.handleUpdateBlockData = this.handleUpdateBlockData.bind(this);
        this.handleZoomFitAllNodes = this.handleZoomFitAllNodes.bind(this);
    }

    init() {
        const {onAfterAddEngine} = this.props;

        onAfterAddEngine(({engine}: any) => {
            engine.on(NODE_DEFAULT_EVENTS.NODE_SELECT, ({nodeData}: any) => {
                this.setState({selectedNodeId: nodeData.nodeId});
            });
            engine.on(ENGINE_DEFAULT_EVENTS.ENGINE_LOAD_FROM_JSON, (data: any) => {
                setTimeout(() => {
                    this.handleZoomFitAllNodes();
                },0 )
            });
        });
    }

    componentDidMount() {
        const {operations} = this.props;
        operations.updateBlockData = this.handleUpdateBlockData;
        operations.getUUID = utils.getUUId;
    }

    getBorder() {
        const {editor} = this.props;
        const engine: Engine = editor.getEngine();

        let [left, top, right, bottom] = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];
        engine.nodes.forEach((node: Node) => {
            if (node.nodeData.name === PLUGIN_COMPONENTS.Block.name) {
                const {x, y} = node.nodeData;
                left = Math.min(left, x);
                top = Math.min(top, y);
                right = Math.max(right, x + node.container.clientWidth);
                bottom = Math.max(bottom, y + node.container.clientHeight);
            }
        });

        return [left, top, right, bottom];
    }

    handleUpdateBlockData(blockData: any) {

        const {editor} = this.props;
        const engine: Engine = editor.getEngine();
        const node = engine.nodes.get(blockData.nodeId);
        if (node) {
            const removeChainBySocketDataType = (newBlockData) => {
                const {nodeId, props} = newBlockData;
                const {sockets} = props;
                (engine.nodeToNeighbors[nodeId] || []).forEach((id: string) => {
                    const chain = engine.nodes.get(id);
                    if (chain) {
                        const startSocket = chain.nodeData.props.startSocket;
                        const startNodeId = chain.nodeData.props.startNodeId;
                        if (startNodeId === nodeId) {
                            const isSocketExist = sockets.find(socket => socket.id === startSocket);
                            if (!isSocketExist) {
                                engine.removeNode(id);
                            } else if (isSocketExist.dataType && isSocketExist.dataType.indexOf("$ref") === -1) {
                                engine.removeNode(id);
                            }
                        }
                    }
                });
            };
            const {name, items} = blockData;
            items.map(item => item.type = "output");
            const inputSocket = node.nodeData.props.sockets.find(socket => socket.type === "input");
            const newBlockData = {
                ...node.nodeData,
                props: {
                    blockName: name,
                    sockets: [
                        inputSocket,
                        ...items
                    ]
                }
            };
            removeChainBySocketDataType(newBlockData);

            node.updateNodeData(newBlockData);
            engine.trigger(NODE_DEFAULT_EVENTS.NODE_RENDER, {
                container: node.container,
                component: engine.components.get(newBlockData.name),
                nodeData: newBlockData
            });

            const nodeDataList: any[] = [];
            engine.nodes.forEach((node: Node) => nodeDataList.push(node.nodeData));
            const refsMapping = getRefNameByBlock(nodeDataList);
            engine.trigger(PLUGIN_EVENTS.NODE_UPDATE_BLOCKNAME, refsMapping)
        }
    }

    handleCreateNode(e: React.MouseEvent) {
        const {editor} = this.props;
        const engine = editor.getEngine();
        engine.trigger(PLUGIN_EVENTS.PLUGIN_NODE_CREATE, e);
    }

    handleRemoveAllNodes(e: React.MouseEvent) {
        const {editor} = this.props;
        const engine = editor.getEngine();
        engine.removeAllNodes();
    }

    handleSaveCanvas() {
        const {editor} = this.props;
        const engine: Engine = editor.getEngine();
        const blocks: any[] = [];
        const chains: any[] = [];
        engine.nodes.forEach((val, key, map) => {
            const {nodeData} = val;
            if (nodeData.name === PLUGIN_COMPONENTS.Block.name) {
                blocks.push(nodeData);
            } else if (nodeData.name === PLUGIN_COMPONENTS.Chain.name) {
                chains.push(nodeData);
            }
        });
        const editorData = {
            nodeDataList: [...blocks, ...chains],
            nodeToNeighbors: engine.nodeToNeighbors
        };
        this.props.onSaved(utils.deepCopy(graphToBlockTree(editorData)));

    }

    handleZoomFitAllNodes() {
        const {editor} = this.props;
        const engine: Engine = editor.getEngine();
        if (engine.nodes.size === 0) return;

        const [left, top, right, bottom] = this.getBorder();

        const width = Math.abs(left - right);
        const height = Math.abs(top - bottom);
        const [x0, y0] = [(left + right) / 2, (top + bottom) / 2];

        const [clientWidth, clientHeight] = [engine.container.clientWidth, engine.container.clientHeight];

        const [kWidth, kHeight] = [clientWidth / width, clientHeight / height];
        const k = Math.min(kWidth, kHeight, 1);

        engine.transform.x = clientWidth / 2 - x0 * k;
        engine.transform.y = clientHeight / 2 - y0 * k;
        engine.zoom(k, 0, 0);
        engine.update();
    }

    render() {
        return (
            <div className="topDock">
                <Tooltip title="add">
                    <IconButton onClick={this.handleCreateNode}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="zoom fit">
                    <IconButton onClick={this.handleZoomFitAllNodes}>
                        <ZoomOutMapIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="save">
                    <IconButton onClick={this.handleSaveCanvas}>
                        <SaveIcon/>
                    </IconButton>
                </Tooltip>

                <div style={{flexGrow: 1}}></div>

                <Tooltip title="remove all">
                    <IconButton onClick={this.handleRemoveAllNodes}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withEngineContext(ToolBar);