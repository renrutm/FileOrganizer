$(function() {
// $(document).ready(function () {
//     console.log("Got Here - static");
    buildNodeTree(nodes)

    //addToDOM(nodeTree)

// delegated handler
    $(".list-group-tree").on('click', "[data-toggle=collapse]", function(){
        $(this).toggleClass('in')
        $(this).next(".list-group.collapse").collapse('toggle');

        // next up, when you click, dynamically load contents with ajax - THEN toggle
        return false;
    })
});

function buildNodeTree() {
    //const rootNode = nodes.filter(findRootNode).pop()
    const nodeTree = {};

    nodes.forEach(addNode, nodeTree)
    // console.log("Test: " + rootNode.id + ";" + rootNode.fileName);

    console.log("Test: " + nodeTree.toString());

    buildHtmlTree(nodeTree);
    //return nodeTree;
}

function addNode(nodeValue) {
    const obj = {};

    obj.parentId = undefined;
    obj.id = nodeValue.id;
    obj.data = {
        "fileName": nodeValue.fileName,
        "path": nodeValue.path,
    }

    if(this[nodeValue.id] === undefined) {
        obj.children = []
    } else {
        obj.children = this[nodeValue.id].children
    }

    if(nodeValue.parentId !== "") { //root
        obj.parentId = nodeValue.parentId
    }

    if(this[nodeValue.parentId] === undefined) { //parent doesn't exist yet
        this[nodeValue.parentId] = {};
        this[nodeValue.parentId].children = [];
    }

    this[nodeValue.id] = obj
    this[nodeValue.parentId].children.push(this[nodeValue.id]);
}

function findRootNode(nodeValue, index, arr) {
    return nodeValue.parentId === "";
}


function buildHtmlTree(nodeTree) {

    /*
        find root node
            add parent node
            lopp through
     */


}

function addParentHtmlNode(currentDom, node) {
    currentDon.
}