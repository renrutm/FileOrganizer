package com.mkturner.fileorganizer.controllers

import com.mkturner.fileorganizer.models.SimpleNode
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class IndexController {

    @RequestMapping("/gotoresult")
    fun index() = getNodeList()

    @RequestMapping("/gotoresult-mvc")
    fun indexMVC(model: Model): String {
        model.addAttribute("nodes", getNodeList())
        return "resultmvc.html"
    };

    @RequestMapping("/gotoresult-jfiddle")
    fun indexJFiddle(model: Model): String {
        model.addAttribute("nodes", getNodeList())
        return "jfiddle-example.html"
    };

    private fun getNodeList(): List<SimpleNode> {
        /*
                root
          child1    child2   child3
        gc1a gc1b     gc2a    gc3a gc3b gc3c
                       ggc2a
         */

        val root = SimpleNode("", "", "/", true)
        val child1 = SimpleNode(root.id, "/", "child1", true)
        val child2 = SimpleNode(root.id, "/", "child2", true)
        val child3 = SimpleNode(root.id, "/", "child3", true)
        val gc1a = SimpleNode(child1.id, "/child1/", "gc1a", false)
        val gc1b = SimpleNode(child1.id, "/child1/", "gc1b", false)
        val gc2a = SimpleNode(child2.id, "/child2", "gc2a", true)
        val gc3a = SimpleNode(child3.id, "/child3/", "gc3a", false)
        val gc3b = SimpleNode(child3.id, "/child3/", "gc3b", false)
        val gc3c = SimpleNode(child3.id, "/child3/", "gc3c", false)
        val ggc2a = SimpleNode(gc2a.id, "/child2/gc2a/", "ggc2a", false)

        return listOf(root, child1, child2, child3, gc1a, gc1b, gc2a, gc3a, gc3b, gc3c, ggc2a)
    }
}