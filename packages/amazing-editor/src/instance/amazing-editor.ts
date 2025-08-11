import type { Descendant } from "slate"

export class AmazingEditor{
    static emptyValue:Descendant[] = [
        {
            type:"paragraph",
            children:[{text:""}]
        }
    ]   
}