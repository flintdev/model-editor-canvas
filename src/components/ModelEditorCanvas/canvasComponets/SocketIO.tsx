import React from "react";

export class SocketIO extends React.Component<any, any> {

    render() {
        const {refRender, handleClickSocket, socketType, socketId, style, socketsData} = this.props;
        return (
            <div
                className={"socket"}
                onClick={(e) => handleClickSocket(e, socketType, socketId)}
                ref={ref => refRender && ref && refRender(ref, socketType, socketId, socketsData)}
                style={{...(style || {})}}
            >

            </div>
        );
    }
}