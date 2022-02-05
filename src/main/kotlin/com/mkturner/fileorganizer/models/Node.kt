package com.mkturner.fileorganizer.models

import java.util.*

class Node<T>(
    val data: T
) {
    private val id: UUID = UUID.randomUUID()
    private var parentNode: Node<T>? = null
    private val children: MutableList<Node<T>> = mutableListOf()

    fun addChild(child: Node<T>): Unit {
        child.setParent(this)
        children.add(child)
    }
    fun getChildren(): List<Node<T>> = children

    fun getParent() : Node<T>? = parentNode
    fun setParent(parent: Node<T>) {
        if(parentNode == null) { parentNode = parent}
        // else throw error
    }
    /*fun removeParent() {
        parentNode = null
    }*/
}