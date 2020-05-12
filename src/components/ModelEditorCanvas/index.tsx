import React from "react";
import {Canvas, Editor} from "../../flint-react-canvas";
import ToolBar from "./canvasPlugins/ToolBar";
import {PLUGIN_EVENTS} from "./canvasPlugins";
import {PLUGIN_COMPONENTS} from "./canvasComponets";
import DndCreateBlock from "./canvasPlugins/DndCreateBlock";
import DndCreateChain from "./canvasPlugins/DndCreateChain";
import DndCreateMenu from "./canvasPlugins/DndCreateMenu";
import "./App.css";

export default class ModelEditorCanvas extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const {operations, editorData, onSaved, onBlockDbClick, onSchemaBtnClick} = this.props;
        return (
            <Editor>
                <ToolBar onSaved={onSaved} operations={operations}/>
                <Canvas
                    initData={editorData}
                    pluginEvents={PLUGIN_EVENTS}
                    pluginComponents={PLUGIN_COMPONENTS}
                >
                    <DndCreateBlock onBlockDbClick={onBlockDbClick}/>
                    <DndCreateChain/>
                    <DndCreateMenu/>
                </Canvas>
            </Editor>
        );
    }
}
