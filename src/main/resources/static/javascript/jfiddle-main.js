$(function() {

// delegated handler
    $(".list-group-tree").on('click', "[data-toggle=collapse]", function(){
        $(this).toggleClass('in')
        $(this).next(".list-group.collapse").collapse('toggle');

        // next up, when you click, dynamically load contents with ajax - THEN toggle
        return false;
    })

});