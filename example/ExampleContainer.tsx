import * as React from 'react';

import {canvasData, canvasDataTwo} from './data';
import {ModelEditorCanvas, OperationsInterface, BlockData, getInitialEditorData} from "../dist";
import {Button} from "@material-ui/core";

export default class App extends React.Component<any, any> {
    operations: OperationsInterface;

    constructor(props: any) {
        super(props);
        this.operations = {};
        this.state = {
            blockData: "",
            editorData: null
        };
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleBlockDbClick = this.handleBlockDbClick.bind(this);
        this.handleGetUUID = this.handleGetUUID.bind(this);
    }

    handleBlockDbClick(data: BlockData) {
        console.log('>>> ModelEditorCanvas.onBlockDbClick.data', data);
        this.setState({blockData: JSON.stringify(data, null, 4)});
    }

    handleEditChange(e: any) {
        this.setState({blockData: e.target.value});
    }

    handleEditSave(e: any) {
        if (this.operations.updateBlockData && !!this.state.blockData) {
            this.operations.updateBlockData(JSON.parse(this.state.blockData));
        }
    }

    handleGetUUID() {
        if (this.operations.getUUID) {
            console.log('>>> operations.getUUID', this.operations.getUUID());
        }
    }

    handleSwitch = () => {
        this.setState({editorData: canvasDataTwo});
    };

    render() {
        const {editorData} = this.state;
        return (
            <div className="fit-parent" style={{display: "flex"}}>
                <div style={{width: `80%`}}>
                    <ModelEditorCanvas
                        operations={this.operations}
                        editorData={editorData || getInitialEditorData("init")}
                        onSaved={(data: any) => console.log('>>> ModelEditorCanvas.onSave.data', data)}
                        onBlockDbClick={this.handleBlockDbClick}
                        onSchemaBtnClick={() => { }}
                    />
                </div>
                <div style={{width: `20%`, display: "flex", flexDirection: "column"}}>
                    <div>
                        <Button onClick={this.handleEditSave}>save</Button>
                        <Button onClick={this.handleGetUUID}>uuid</Button>
                        <Button onClick={this.handleSwitch}>switch</Button>
                    </div>
                    <textarea style={{flexGrow: 1}} value={this.state.blockData} onChange={this.handleEditChange}
                              onBlur={this.handleEditSave}>
                    </textarea>
                </div>
            </div>
        );
    }
}

