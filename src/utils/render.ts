import Block from "./Block";

export function render (query:any, block: Block) {
    
    const root = document.querySelector(query);
    root?.appendChild(block.getContent())
    block.dispatchComponentDidMount()

    return root;
}
