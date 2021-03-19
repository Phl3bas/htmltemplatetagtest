export function html(strings, ...variables){

    let dynamicNodes = [];


    const template = strings.reduce((acc, item, i)=>{
        const {string: resolvedString, hash} = resolveDynamicContentToString(variables, i)
        if(hash) {
            dynamicNodes = [...dynamicNodes, createDynamicNode(variables[i],hash)]
        }
        return `${acc}${item}${resolvedString}`
    }, ``)

    
    return {
        template,
        dynamicNodes
    }
}


function createDynamicNode(node, hash){
    return {
        currentValue: node,
        isHTMLElement: null,
        isTextNode: null,
        isAttributeNode: null,
        nodeType: null,
        parentNode: null,
        children: [],
        hash: hash
    }
}

function resolveDynamicContentToString(variables, index){
    const h = index in variables ? hash(variables[index], Math.random() * 1000) : null
    const res = index in variables ? tagDynamicContent(variables[index], h) : ''

    return {
        string: res,
        hash: h
    }
}


function tagDynamicContent(content,hash){
    return content + `<!-- ಠ_ಠ I'm watching you - [${hash}] -->`
}

function hash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};


// TODO

/**
 *  HTML function needs to return a class/object that has the properties
 * HTMLRETURNTYPE {
 *  template: StaticStringTemplate (fully rendered string template with initalvalues and comment tags);
 *  dynamic: DynamicNode[]
 * }
 * 
 * DynamicNode {
 *  nodeType: text|htmlElement|attribute
 *  parentNode: *HTMLElement
 *  children: Node
 *  hash: StringTemplateHash (hash value in the string template which is in the comment preceeding the dynamic element)
 * 
 * }
 * 
 */
