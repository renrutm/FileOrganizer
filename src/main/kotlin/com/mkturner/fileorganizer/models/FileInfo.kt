package com.mkturner.fileorganizer.models

data class FileInfo(val path: String, val fileName: String, val isDirectory: Boolean) {
    val absolutePath = "$path/$fileName"
}