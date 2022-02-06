$(function() {
// $(document).ready(function () {
//     console.log("Got Here - static");
    buildNodeTree(this, nodes)

    //addToDOM(nodeTree)

// delegated handler
    $(".list-group-tree").on('click', "[data-toggle=collapse]", function(){
        $(this).toggleClass('in')
        $(this).next(".list-group.collapse").collapse('toggle');

        // next up, when you click, dynamically load contents with ajax - THEN toggle
        return false;
    })
});

function buildNodeTree(dom) {
    //const rootNode = nodes.filter(findRootNode).pop()
    const nodeTree = {};

    nodes.forEach(addNode, nodeTree)
    // console.log("Test: " + rootNode.id + ";" + rootNode.fileName);

    console.log("Test: " + nodeTree.toString());

    buildHtmlTree(nodeTree.rootNode);
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
        this.rootNode = obj;
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

function buildHtmlTree(node) {

    const rootWidget = $('div.container');
    // const newWidget = test();

    if(node.children.length > 0) {
        rootWidget.append(getNodeWithChildrenWidget(rootWidget, node));
    } else {
        rootWidget.append(getChildlessNodeWidget(node));
    }

    /*
            if(children) // branch
                getNodeWithChildrenWidget(rootDom, root)

            else // leaf
               getChildlessNodeWidget(rootDom, root)
     */

}

/*function test() {
    const widget = $('<a/>', {
        href: "javascript:void(0);",
        class: "list-group-item",
        "data-toggle": "collapse",
        text: "test-filename"
    });

    widget.append(
        $("<i/>", {
            class: "fa fa-chevron"
        })
    ).after(
        $('<span/>', {
            class: "badge",
            text: "0"
        })
    );

    widget.append(
        $('<div/>', {
            id: "test-node",
            class: "list-group collapse"
        })
    );
    return widget;
}*/


function getNodeWithChildrenWidget(outerDiv, node) {
    outerDiv.append(getNodeLabelWidget(node));
    let collapsibleDiv = getCollapsibleWidget(node);

    for(const childIndex in node.children) {
        let child = node.children[childIndex];

        let childWidget = undefined;
        if(child.children.length > 0) {
            // childWidget = getNodeWithChildrenWidget(collapsibleDiv, child);
            getNodeWithChildrenWidget(collapsibleDiv, child);
        } else {
            childWidget = getChildlessNodeWidget(child);
            collapsibleDiv.append(childWidget)
        }
    }

    outerDiv.append(collapsibleDiv);
    // return newDiv;
    /*
        addparentHtml(node)
        loop through children
            if child has children
                getNodeWithChildrenWidget(parent)
            else
                getChildlessNodeWidget(parentDom, childnode)
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
function getNodeLabelWidget(node) {
    let widget = $('<a/>', {
        href: "javascript:void(0);",
        class: "list-group-item",
        "data-toggle": "collapse"
    });

    widget.append(
        $("<i/>", {
            class: "fa fa-chevron"
        })
    );

    widget.append(
        $('<span/>', {
            class: "badge",
            text: "0"
        })
    )

    // widget.append($("<b>" + node.data.fileName + "</b>"))
    widget.append($('<text>', {
        text: node.data.fileName
    }))

    // widget.text()

    return widget;
/*
    const html = "<a href=\"javascript:void(0);\" class=\"list-group-item\" data-toggle=\"collapse\">\n" +
        "        <i class=\"fa fa-chevron\"></i>\n" +
        "        <span class=\"badge\">1</span>\n" +
        "        ${node.fileName}\n" +
        "    </a>\n" +
        "    <div id=\"${node.id}\" class=\"list-group collapse\">\n" +
        "    </div>"
    return html;*/
}

function getCollapsibleWidget(node) {
    return $('<div/>', {
            // id: ,
            class: "list-group collapse"
        });
}

function getChildlessNodeWidget(node) {
    return $('<a/>', {
        href: "javascript:void(0);",
        class: "list-group-item"
    }).append(
        $("<i/>", {
            class: "fa fa-file-o"
        })
    ).append(
        $('<span/>', {
            class: "badge",
            text: "0"
        })
    ).append($('<text/>', {
        text: node.data.fileName
    }));
}

/*
    <a href="javascript:void(0);" class="list-group-item"><span class="badge">0</span>Item 1.1.1</a>
 */

    /*
    return $('<div/>', {
                class : "sudoku-outer-grid-cell"
            }
        ).append(
            $('<div/>', {
                class : "sudoku-grid-container"
            }).append(
                $('<div/>', {
                    id: key,
                    class: "sudoku-grid"
                })
            )
        );
     */