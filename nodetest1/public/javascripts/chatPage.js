
$(document).ready(function () {
    $("#text").resizable({
        minWidth: 153,
        maxWidth: 75%,
        minHeight: 50,
        maxHeight: 75,
    });
    $("textarea").addClass("ui-widget")
        .addClass("ui-widget-content")
        .addClass("ui-corner-all");
});
