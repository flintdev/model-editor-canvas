import * as React from 'react';

import {canvasData} from './data';
import {ModelEditorCanvas} from "../dist";

export default class App extends React.Component<any, any> {
    operations: any;

    constructor(props: any) {
        super(props);
        this.operations = {};
        this.state = {
            blockData: ""
        };
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleBlockDbClick = this.handleBlockDbClick.bind(this);
    }

    handleBlockDbClick(data: any) {
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

    render() {
        return (
            <div className="fit-parent" style={{display: "flex"}}>
                <div style={{width: `80%`}}>
                    <ModelEditorCanvas
                        operations={this.operations}
                        editorData={canvasData}
                        onSaved={(data: any) => console.log('>>> ModelEditorCanvas.onSave.data', data)}
                        onBlockDbClick={this.handleBlockDbClick}
                        onSchemaBtnClick={() => { }}
                    />
                </div>
                <div style={{width: `20%`, display: "flex", flexDirection: "column"}}>
                    <div>
                        <button onClick={this.handleEditSave}>save</button>
                    </div>
                    <textarea style={{flexGrow: 1}} value={this.state.blockData} onChange={this.handleEditChange}
                              onBlur={this.handleEditSave}>
                    </textarea>
                </div>
            </div>
        );
    }
}

