import {ModelEditorCanvas} from "./components/ModelEditorCanvas"

interface OperationsInterface {
    getUUID?: () => string,
    updateBlockData?: (data: BlockData) => any
    initAddBlock?: (blockName: string) => void
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


export {
    OperationsInterface,
    BlockItem,
    BlockData,
    ModelEditorCanvas
}