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
    } else {
        this.nodes.root = obj;
    }

    if(this[nodeValue.parentId] === undefined) { //parent doesn't exist yet
        this[nodeValue.parentId] = {};
        this[nodeValue.parentId].children = [];
    } //else {
        this[nodeValue.id] = obj
        this[nodeValue.parentId].children.push(this[nodeValue.id]);
        // this[nodeValue.parentId].children.push(obj);
    // }
}

function findRootNode(nodeValue, index, arr) {
    return nodeValue.parentId === "";
}

function buildNodeTree(dom, node) {
    // find root

    if(node.children.length > 0) {
        addNodeWithChildrenHtml(dom, node)
    } else {
        addChildlessNodeHtml(dom, node)
    }
    /*
            if(children) // branch
                addNodeWithChildrenHtml(rootDom, root)

            else // leaf
               addChildlessNodeHtml(rootDom, root)
     */

}

function addNodeWithChildrenHtml(parentDom, node) {

    parentDom.prepend(getParentContainerHtml(node));
    for(const child in node.children) {
        if(child.children.length > 0) {
            addNodeWithChildrenHtml(parentDom, child)
        } else {
            addChildlessNodeHtml(parentDom, child)
        }
    }


    /*
        addparentHtml(node)
        loop through children
            if child has children
                addNodeWithChildrenHtml(parent)
            else
                addChildlessNodeHtml(parentDom, childnode)
    /*
    <a href="javascript:void(0);" class="list-group-item" data-toggle="collapse">
        <i class="fa fa-chevron"></i>
        <span class="badge">1</span>
        Item 1
    </a>
    <div class="list-group collapse">
    </div>
     */
}
function getParentContainerHtml(node) {
    const html = "<a href=\"javascript:void(0);\" class=\"list-group-item\" data-toggle=\"collapse\">\n" +
        "        <i class=\"fa fa-chevron\"></i>\n" +
        "        <span class=\"badge\">1</span>\n" +
        "        ${node.fileName}\n" +
        "    </a>\n" +
        "    <div id=\"${node.id}\" class=\"list-group collapse\">\n" +
        "    </div>"
    return html;
}

function addChildlessNodeHtml(parentDom, node) {
    const html = "<a href=\"javascript:void(0);\" class=\"list-group-item\"><span class=\"badge\">0</span>${node.fileName}</a>\n";
    return html;
    /*
        <a href="javascript:void(0);" class="list-group-item"><span class="badge">0</span>Item 1.1.1</a>
     */
}