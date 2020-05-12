export const canvasData = {
    "nodeDataList": [
        {
            "name": "Block",
            "x": 6907.34765625,
            "y": 5105.62060546875,
            "zIndex": 2,
            "props": {
                "blockName": "New Block",
                "sockets": {
                    "input::0": {
                        "offsetLeft": 12,
                        "offsetWidth": 20,
                        "offsetTop": 22,
                        "offsetHeight": 20
                    },
                    "output::b2f5n5rcwika2gvl4n": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 67,
                        "offsetHeight": 20
                    },
                    "output::l1o56usd4pka2gvlgc": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 92,
                        "offsetHeight": 20
                    },
                    "output::82f4aib9bn7ka2gvlrs": {
                        "blockItemName": "default",
                        "dataType": "$ref",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 117,
                        "offsetHeight": 20
                    },
                    "output::ynn86t5053ka2gvm4a": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 142,
                        "offsetHeight": 20
                    },
                    "output::we6bnx5m7wka2gvmfq": {
                        "blockItemName": "default",
                        "dataType": "$ref[]",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 167,
                        "offsetHeight": 20
                    }
                }
            },
            "nodeId": "hgj85fsn648ka2gvjcx"
        },
        {
            "name": "Block",
            "x": 7384.00390625,
            "y": 5007.68017578125,
            "zIndex": 2,
            "props": {
                "blockName": "New Block",
                "sockets": {
                    "input::0": {
                        "offsetLeft": 12,
                        "offsetWidth": 20,
                        "offsetTop": 22,
                        "offsetHeight": 20
                    },
                    "output::dttqluqku79ka2gvukg": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 67,
                        "offsetHeight": 20
                    },
                    "output::oi56bndwyuka2gvuv8": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 92,
                        "offsetHeight": 20
                    },
                    "output::qikstkksgyhka2gvvhk": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 117,
                        "offsetHeight": 20
                    }
                }
            },
            "nodeId": "p0yeacip1woka2gvk1w"
        },
        {
            "name": "Block",
            "x": 7528.28857421875,
            "y": 5396.58251953125,
            "zIndex": 2,
            "props": {
                "blockName": "New Block",
                "sockets": {
                    "input::0": {
                        "offsetLeft": 12,
                        "offsetWidth": 20,
                        "offsetTop": 22,
                        "offsetHeight": 20
                    },
                    "output::qmfgwfuryzka2gvw81": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 67,
                        "offsetHeight": 20
                    },
                    "output::kjo7wzbhymdka2gvwkp": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 92,
                        "offsetHeight": 20
                    },
                    "output::t0sw6yv31ka2gvx17": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 117,
                        "offsetHeight": 20
                    },
                    "output::vu6mrb1ryyka2gvxej": {
                        "blockItemName": "default",
                        "dataType": "string",
                        "offsetLeft": 312,
                        "offsetWidth": 20,
                        "offsetTop": 142,
                        "offsetHeight": 20
                    }
                }
            },
            "nodeId": "p9567wuqnfcka2gvktt"
        },
        {
            "name": "Chain",
            "x": 0,
            "y": 0,
            "props": {
                "x1": 7229.34765625,
                "y1": 5232.62060546875,
                "x2": 7406.00390625,
                "y2": 5039.68017578125,
                "startNodeId": "hgj85fsn648ka2gvjcx",
                "endNodeId": "p0yeacip1woka2gvk1w",
                "startSocket": "output::82f4aib9bn7ka2gvlrs",
                "endSocket": "input::0"
            },
            "zIndex": 1,
            "nodeId": "f8gdl7vj03cka2gvsej"
        },
        {
            "name": "Chain",
            "x": 0,
            "y": 0,
            "props": {
                "x1": 7229.34765625,
                "y1": 5282.62060546875,
                "x2": 7550.28857421875,
                "y2": 5428.58251953125,
                "startNodeId": "hgj85fsn648ka2gvjcx",
                "endNodeId": "p9567wuqnfcka2gvktt",
                "startSocket": "output::we6bnx5m7wka2gvmfq",
                "endSocket": "input::0"
            },
            "zIndex": 1,
            "nodeId": "kumkmwx0jbeka2gvtv1"
        }
    ],
    "nodeToNeighbors": {
        "hgj85fsn648ka2gvjcx": [
            "f8gdl7vj03cka2gvsej",
            "kumkmwx0jbeka2gvtv1"
        ],
        "p0yeacip1woka2gvk1w": [
            "f8gdl7vj03cka2gvsej"
        ],
        "p9567wuqnfcka2gvktt": [
            "kumkmwx0jbeka2gvtv1"
        ]
    }
};