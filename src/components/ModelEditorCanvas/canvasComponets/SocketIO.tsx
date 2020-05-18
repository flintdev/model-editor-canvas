import React from "react";

export class SocketIO extends React.Component<any, any> {

    render() {
        const {refRender, handleClickSocket, style, socket} = this.props;
        return (
            <div
                className={"socket"}
                onClick={(e) => handleClickSocket(e, socket)}
                ref={ref => refRender && ref && refRender(ref, socket)}
                style={{...(style || {})}}
            >

            </div>
        );
    }
}