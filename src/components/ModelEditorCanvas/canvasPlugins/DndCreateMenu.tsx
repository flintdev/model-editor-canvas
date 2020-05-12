import React from "react";

import {withEngineContext, WINDOW_DEFAULT_EVENTS} from "../../../flint-react-canvas";
import {PLUGIN_COMPONENTS} from "../canvasComponets";


class DndCreateMenu extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            position: [0, 0],
            isMoving: false,
            timeout: null,
            nodeData: null
        };
        this.init();
        this.timeoutHide = this.timeoutHide.bind(this);
        this.cancelHide = this.cancelHide.bind(this);
        this.handleRemoveNode = this.handleRemoveNode.bind(this);
        this.handleClone = this.handleClone.bind(this);
    }

    init() {
        const {onAfterAddEngine} = this.props;

        onAfterAddEngine(({engine}: any) => {

            engine.on(WINDOW_DEFAULT_EVENTS.contextmenu, (data: any) => {
                const {e, nodeData} = data;
                this.setState({nodeData});
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

    handleOnClick = async () => {
        const {position} = this.state;
        const [x, y] = position;
        this.click(x, y);
    };

    timeoutHide() {
        const timeout = setTimeout(() => {
            this.setState({visible: false, isMoving: false});
        }, 1000);
        this.setState({timeout});
    }

    cancelHide() {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
    }

    handleRemoveNode() {
        const {editor} = this.props;
        const {nodeData} = this.state;
        const engine = editor.getEngine();

        engine.removeNode(nodeData.nodeId);
    }

    handleClone() {
        const {editor} = this.props;
        const {nodeData} = this.state;
        const engine = editor.getEngine();

        const node = engine.nodes.get(nodeData.nodeId);

        if (node.nodeData.name === PLUGIN_COMPONENTS.Chain.name) {
            console.warn('>>> handleClone.warn\n', `Can not clone "nodeData.name=${node.nodeData.name}"`);
            return;
        }
        const {x, y} = node.nodeData;
        const newNodeData = {
            ...node.nodeData,
            x: x + 10,
            y: y + 10,
            nodeId: null
        };

        engine.addNode(newNodeData);
    }

    render() {
        const {visible, position, nodeData} = this.state;
        const [x, y] = position;
        return (
            <>
                {!!visible &&
                <div
                    style={{position: `fixed`, left: x, top: y, zIndex: 9000}}
                    onClick={this.handleOnClick}
                    onMouseOver={this.cancelHide}
                    onMouseLeave={this.timeoutHide}
                >
                    <div className="menu paper">
                        <div className={"menu-title"}>{nodeData.name}</div>
                        <span className="menu-button" onClick={this.handleRemoveNode}>remove</span>
                        <span className="menu-button" onClick={this.handleClone}>clone</span>
                    </div>
                </div>}
            </>
        );
    }
}

export default withEngineContext(DndCreateMenu);