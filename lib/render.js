let isIniitalRender = true
let currentDynamicNodes = []
let newDynamicNodes = []
let renderedDOM = null

export function render(DOM, htmlResult){

    let fragment = document.createRange().createContextualFragment(htmlResult.template)

    console.log(htmlResult.dynamicNodes)
    if(isIniitalRender){
        /**
            if initial render just insert data into the dom
         */
            renderedDOM = document.querySelector(DOM)
            renderedDOM.innerHTML = htmlResult.template

        /**
            keep a record of dynamic nodes from initial render
         */
            currentDynamicNodes = [...getAllDynamicNodes(renderedDOM)]
            isIniitalRender = false

            return;
        
    }



    let newDynamicNodes = [...getAllDynamicNodes(fragment)]

    checkDynamicNodesForChanges(currentDynamicNodes,newDynamicNodes)

}


/**
* check the dynamic nodes on the page if their has been any change from previous render to current render
* if theres a change in nodeValue entry between renders, update the nodeValue in the DOM
*/

function checkDynamicNodesForChanges(currentNodes, newNodes){
    currentNodes.forEach((node,i)=> {
        console.log(node, newNodes[i]);
      (node.nodeValue !== newNodes[i].nodeValue) && (node.nodeValue = newNodes[i].nodeValue)
    })
}




/**
* Below functions are to return an array of elements that contain comments
* comments are used to find dynamic data, any node (textNode/elementNode)
* which is directly preceeded by a comment <!-- DYNAMIC [hash] --> is flagged as dynamic content that may change
*/ 
 
function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
}
function getAllDynamicNodes(rootElem) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {
        
        comments.push(curNode.previousSibling);
    }
    return comments;
}
