export const canvasDataTwo = {
    "nodeDataList": [
        {
            "nodeId": "0803ma9kfog3kabysdg9",
            "name": "Block",
            "x": 4596.966127799357,
            "y": 3738.992232577882,
            "zIndex": 2,
            "props": {
                "blockName": "Pod",
                "sockets": [
                    {
                        "type": "input",
                        "id": "opf4lsaj8vkabysdg9",
                        "offsetLeft": 12,
                        "offsetWidth": 20,
                        "offsetTop": 22,
                        "offsetHeight": 20
                    },
                    {
                        "id": "7h7ithgy3rlkabysdg9",
                        "name": "apiVersion",
                        "dataType": "string",
                        "type": "output"
                    },
                    {
                        "id": "yir08f7qkxkabysglt",
                        "name": "kind",
                        "dataType": "string",
                        "type": "output"
                    },
                    {
                        "id": "fs8yv6xxpgmkabysgxa",
                        "name": "metadata",
                        "dataType": "$ref",
                        "type": "output"
                    }
                ]
            }
        },
        {
            "nodeId": "9bw63f8r9wkabysif8",
            "name": "Block",
            "x": 5085.182420576551,
            "y": 3730.8711492645493,
            "zIndex": 2,
            "props": {
                "blockName": "MetaData",
                "sockets": [
                    {
                        "type": "input",
                        "id": "0ut6zorwp1fmkabysif8",
                        "offsetLeft": 12,
                        "offsetWidth": 20,
                        "offsetTop": 22,
                        "offsetHeight": 20
                    },
                    {
                        "id": "s913immsljkabysif8",
                        "name": "annotation",
                        "dataType": "object",
                        "type": "output"
                    },
                    {
                        "id": "s913imm2sljkabysif8",
                        "name": "generation",
                        "dataType": "integer",
                        "type": "output"
                    },
                    {
                        "id": "s913imm2s3lj23kabysif8",
                        "name": "initializer",
                        "dataType": "$ref[]",
                        "type": "output"
                    },
                    {
                        "id": "s913imm2s3ljkabysif8",
                        "name": "ownerReference",
                        "dataType": "$ref[]",
                        "type": "output"
                    }
                ]
            }
        },
        {
            "nodeId": "vo3l76y3fkdkabzfz9v",
            "name": "Block",
            "x": 5540.779855469154,
            "y": 3776.7239658146627,
            "zIndex": 2,
            "props": {
                "blockName": "OwnerReference",
                "sockets": [
                    {
                        "type": "input",
                        "id": "2nutiliopczkabzfz9v",
                        "offsetLeft": 12,
                        "offsetWidth": 20,
                        "offsetTop": 22,
                        "offsetHeight": 20
                    },
                    {
                        "id": "lihhekg7agkabzfz9v",
                        "name": "controller",
                        "dataType": "boolean",
                        "type": "output"
                    }
                ]
            }
        },
        {
            "nodeId": "lyezzzh7eq8kac3163y",
            "name": "Chain",
            "x": 0,
            "y": 0,
            "props": {
                "x1": 5018.966127799357,
                "y1": 3858.992232577882,
                "x2": 5107.182420576551,
                "y2": 3762.8711492645493,
                "startNodeId": "0803ma9kfog3kabysdg9",
                "endNodeId": "9bw63f8r9wkabysif8",
                "startSocket": "fs8yv6xxpgmkabysgxa",
                "endSocket": "0ut6zorwp1fmkabysif8"
            },
            "zIndex": 1
        },
        {
            "nodeId": "4uir7bu1nkkac317o7",
            "name": "Chain",
            "x": 0,
            "y": 0,
            "props": {
                "x1": 5507.182420576551,
                "y1": 3871.8711492645493,
                "x2": 5562.779855469154,
                "y2": 3808.7239658146627,
                "startNodeId": "9bw63f8r9wkabysif8",
                "endNodeId": "vo3l76y3fkdkabzfz9v",
                "startSocket": "s913imm2s3ljkabysif8",
                "endSocket": "2nutiliopczkabzfz9v"
            },
            "zIndex": 1
        }
    ],
    "nodeToNeighbors": {
        "0803ma9kfog3kabysdg9": [
            "lyezzzh7eq8kac3163y"
        ],
        "9bw63f8r9wkabysif8": [
            "lyezzzh7eq8kac3163y",
            "4uir7bu1nkkac317o7"
        ],
        "vo3l76y3fkdkabzfz9v": [
            "4uir7bu1nkkac317o7"
        ]
    }
};

export const canvasData = {
    "nodeDataList": [
        {
            "nodeId": "0803ma9kfog3kabysdg9",
            "name": "Block",
            "x": 4576.099856023115,
            "y": 3885.1454980598774,
            "zIndex": 2,
            "props": {
                "blockName": "Pod",
                "sockets": [
                    {
                        "type": "input",
                        "id": "opf4lsaj8vkabysdg9"
                    },
                    {
                        "id": "7h7ithgy3rlkabysdg9",
                        "name": "apiVersion",
                        "dataType": "string",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 67,
                        "offsetHeight": 20
                    },
                    {
                        "id": "yir08f7qkxkabysglt",
                        "name": "kind",
                        "dataType": "string",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 92,
                        "offsetHeight": 20
                    },
                    {
                        "id": "fs8yv6xxpgmkabysgxa",
                        "name": "metadata",
                        "dataType": "$ref",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 117,
                        "offsetHeight": 20
                    }
                ]
            }
        },
        {
            "nodeId": "9bw63f8r9wkabysif8",
            "name": "Block",
            "x": 5061.283395525991,
            "y": 3582.7351305012576,
            "zIndex": 2,
            "props": {
                "blockName": "MetaData",
                "sockets": [
                    {
                        "type": "input",
                        "id": "0ut6zorwp1fmkabysif8"
                    },
                    {
                        "id": "s913immsljkabysif8",
                        "name": "annotation",
                        "dataType": "object",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 67,
                        "offsetHeight": 20
                    },
                    {
                        "id": "s913imm2sljkabysif8",
                        "name": "generation",
                        "dataType": "integer",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 92,
                        "offsetHeight": 20
                    },
                    {
                        "id": "s913imm2s3lj23kabysif8",
                        "name": "initializer",
                        "dataType": "$ref[]",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 117,
                        "offsetHeight": 20
                    },
                    {
                        "id": "s913imm2s3ljkabysif8",
                        "name": "ownerReference",
                        "dataType": "$ref[]",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 142,
                        "offsetHeight": 20
                    }
                ]
            }
        },
        {
            "nodeId": "vo3l76y3fkdkabzfz9v",
            "name": "Block",
            "x": 5547.610544144283,
            "y": 4189.497511632649,
            "zIndex": 2,
            "props": {
                "blockName": "OwnerReference",
                "sockets": [
                    {
                        "type": "input",
                        "id": "2nutiliopczkabzfz9v"
                    },
                    {
                        "id": "lihhekg7agkabzfz9v",
                        "name": "controller",
                        "dataType": "boolean",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 67,
                        "offsetHeight": 20
                    }
                ]
            }
        },
        {
            "nodeId": "mq86o5hjgmdkabzoa3k",
            "name": "Block",
            "x": 5533.970161780552,
            "y": 3329.5018068263207,
            "zIndex": 2,
            "props": {
                "blockName": "Initializer",
                "sockets": [
                    {
                        "type": "input",
                        "id": "2nutiliopczkabzfz9v"
                    },
                    {
                        "id": "lihhekg7agkabzfz9v",
                        "name": "labels",
                        "dataType": "object",
                        "type": "output",
                        "offsetLeft": 412,
                        "offsetWidth": 20,
                        "offsetTop": 67,
                        "offsetHeight": 20
                    }
                ]
            }
        },
        {
            "nodeId": "lyezzzh7eq8kac3163y",
            "name": "Chain",
            "x": 0,
            "y": 0,
            "props": {
                "x1": 4998.099856023115,
                "y1": 4012.1454980598774,
                "x2": 5083.283395525991,
                "y2": 3614.7351305012576,
                "startNodeId": "0803ma9kfog3kabysdg9",
                "endNodeId": "9bw63f8r9wkabysif8",
                "startSocket": "fs8yv6xxpgmkabysgxa",
                "endSocket": "0ut6zorwp1fmkabysif8"
            },
            "zIndex": 1
        },
        {
            "nodeId": "4uir7bu1nkkac317o7",
            "name": "Chain",
            "x": 0,
            "y": 0,
            "props": {
                "x1": 5483.283395525991,
                "y1": 3734.7351305012576,
                "x2": 5569.610544144283,
                "y2": 4221.497511632649,
                "startNodeId": "9bw63f8r9wkabysif8",
                "endNodeId": "vo3l76y3fkdkabzfz9v",
                "startSocket": "s913imm2s3ljkabysif8",
                "endSocket": "2nutiliopczkabzfz9v"
            },
            "zIndex": 1
        },
        {
            "nodeId": "3bapih0qjhrkac319e4",
            "name": "Chain",
            "x": 0,
            "y": 0,
            "props": {
                "x1": 5483.283395525991,
                "y1": 3709.7351305012576,
                "x2": 5555.970161780552,
                "y2": 3361.5018068263207,
                "startNodeId": "9bw63f8r9wkabysif8",
                "endNodeId": "mq86o5hjgmdkabzoa3k",
                "startSocket": "s913imm2s3lj23kabysif8",
                "endSocket": "2nutiliopczkabzfz9v"
            },
            "zIndex": 1
        }
    ],
    "nodeToNeighbors": {
        "0803ma9kfog3kabysdg9": [
            "lyezzzh7eq8kac3163y"
        ],
        "9bw63f8r9wkabysif8": [
            "lyezzzh7eq8kac3163y",
            "4uir7bu1nkkac317o7",
            "3bapih0qjhrkac319e4"
        ],
        "vo3l76y3fkdkabzfz9v": [
            "4uir7bu1nkkac317o7"
        ],
        "mq86o5hjgmdkabzoa3k": [
            "3bapih0qjhrkac319e4"
        ]
    }
};