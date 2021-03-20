/**
* Below functions are to return an array of elements that contain comments
* comments are used to find dynamic data, any node (textNode/elementNode)
* which is directly preceeded by a comment <!-- DYNAMIC [hash] --> is flagged as dynamic content that may change
*/ 
 
function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
}
export function getAllDynamicNodes(rootElem) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {
        
        comments.push(curNode.previousSibling);
    }
    return comments;
}
