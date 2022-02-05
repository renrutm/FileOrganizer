package com.mkturner.fileorganizer.models

import java.util.*

data class SimpleNode(
    val parentId: String?,
    val path: String,
    val fileName: String,
    val isDirectory: Boolean,
){
    val id = UUID.randomUUID().toString()
}