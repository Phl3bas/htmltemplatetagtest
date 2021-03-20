import {getAllDynamicNodes} from '../utils/getAllDynamicNodes'

let isIniitalRender = true
let currentDynamicNodes = []
let newDynamicNodes = []
let renderedDOM = null

export function render(DOM, htmlResult){

    var clone = htmlResult.template.firstElementChild.cloneNode(true);
    console.log(htmlResult.dynamicNodes)

    if(isIniitalRender){
        /**
            if initial render just insert data into the dom
         */
            renderedDOM = document.querySelector(DOM)
            renderedDOM.appendChild(clone)

        /**
            keep a record of dynamic nodes from initial render
         */
            currentDynamicNodes = [...getAllDynamicNodes(renderedDOM)]
            isIniitalRender = false

            return;
        
    }



    let newDynamicNodes = [...getAllDynamicNodes(clone)]

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




