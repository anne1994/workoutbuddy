var request;

function doAJAX() {
    alert("Do Ajax");
    request = new XMLHttpRequest();
    request.open("GET", "/ajax-response");
    request.onreadystatechange = displayFile;
    request.send(null);
}

function displayFile() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var text = request.responseText;
            text = text.replace(/\n/g, "<br />");
            alert("im here");
            document.getElementById("lower").innerHTML =
                "<p>" + text + "</p>";
        }
    }
}