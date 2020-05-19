import React from "react";

export class Chain extends React.Component<any, any> {
    render() {
        const curvature = 0.5;
        let {x1, y1, x2, y2, nodeData} = this.props;
        let direction = '>';
        if (x1 > x2) {
            [x1, y1, x2, y2] = [x2, y2, x1, y1];
            direction = '<';
        }
        const hx1 = x1 + Math.abs(x2 - x1) * curvature;
        const hx2 = x2 - Math.abs(x2 - x1) * curvature;

        const path = `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
        // const path = `M ${x1},${y1} L ${(x1 + x2) / 2},${y1} L ${(x1 + x2) / 2},${y2} L ${x2},${y2}`;

        const pathID = `${x1}${y1}${x2}${y2}`;
        return (
            <div className={"chain"}>
                <svg>
                    <path d={path} id={pathID}></path>
                    {/*<text>*/}
                    {/*    <textPath xlinkHref={`#${pathID}`} startOffset="5%"*/}
                    {/*              dominantBaseline="middle">{direction}</textPath>*/}
                    {/*    <textPath xlinkHref={`#${pathID}`} startOffset="33%"*/}
                    {/*              dominantBaseline="middle">{direction}</textPath>*/}
                    {/*    <textPath xlinkHref={`#${pathID}`} startOffset="66%"*/}
                    {/*              dominantBaseline="middle">{direction}</textPath>*/}
                    {/*    <textPath xlinkHref={`#${pathID}`} startOffset="95%"*/}
                    {/*              dominantBaseline="middle">{direction}</textPath>*/}
                    {/*</text>*/}
                </svg>
            </div>
        );
    }
}