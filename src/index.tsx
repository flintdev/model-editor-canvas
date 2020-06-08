import {ModelEditorCanvas} from "./components/ModelEditorCanvas"
import { utils } from "./flint-react-canvas"

interface OperationsInterface {
    getUUID?: () => string,
    updateBlockData?: (data: BlockData) => any
}

interface BlockItem {
    id: string,
    name: string,
    dataType: "string" | "integer" | "object" | "boolean" | "string[]" | "integer[]" | "$ref" | "$ref[]",
    required?: boolean,
}

interface BlockData {
    blockId: string,
    name: string,
    items: BlockItem[],
    refs: {[k: string]: string}
}

const getInitialEditorData = (blockName: string) => {
    return {
        "nodeDataList": [
          {
            "nodeId": utils.getUUId(),
            "name": "Block",
            "x": 3200.4978100702856,
            "y": 2221.1887281616123,
            "zIndex": 2,
            "props": {
              "blockName": blockName,
              "sockets": [
                {
                  "type": "input",
                  "id": utils.getUUId(),
                }
              ]
            }
          }
        ],
        "nodeToNeighbors": {}
      }
}

export {
    OperationsInterface,
    BlockItem,
    BlockData,
    ModelEditorCanvas,
    getInitialEditorData
}