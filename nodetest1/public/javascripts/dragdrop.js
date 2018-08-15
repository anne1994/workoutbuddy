/*function init() {
    cloneDragMe();

    $("#dragMe").draggable();
    $("#target").droppable();

    $("#target").bind("drop", highlightTarget);
    $("#target").bind("dropout", resetTarget);

}

function highlightTarget(event, ui) {
    $("#target").addClass("ui-state-highlight")
        .html("Dropped")
}

function resetTarget(event, ui) {
    $("#target").removeClass("ui-state-highlight")
        .html("Drop on me");
}*/


$(function() {
    $("#dragMe").draggable();
    $("#target").droppable({
        drop: function(event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
                .html("Dropped!");
        }
    });
});