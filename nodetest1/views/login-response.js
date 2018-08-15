var bodyParser = require('body-parser');
var express = require('express');
var lineReader = require('line-reader');
var fs = require('fs');

var name = 'login';
var html_file_name = name + '.html';
var response_name = name + '-response';

// Create the app.
var app = express();

// Use the bodyParser() middleware for all routes.
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/stylesheets/css", express.static(__dirname + "/stylesheets/css"));
app.use("/images", express.static(__dirname + "/images"));

// Read and send the HTML file.
app.get('/' + html_file_name,
    function(req, res) {
        var html = '';
        lineReader.eachLine(html_file_name,
            function(line, last) {
                html += line + '\n';

                if (last) {
                    res.send(html);
                    return false;
                } else {
                    return true;
                }
            });
    });

// Process the form data and send a response.
app.get('/' + response_name,
    function(req, res) {
        var username = req.param('username');
        var content = fs.readFileSync("Profile.html", "utf-8");
        res.send(content);
    }
);

app.get('/ajax-response',
    function(req, res) {
        var html = '';
        var text = document.getElementById("textarea").value;
        alert(text);
        lineReader.eachLine("/views/Profile.html",
            function(line, last) {
                html += line + '<br>';

                if (last) {
                    res.send(html);
                    return false;
                } else {
                    var final_text = "<div>" + text + "</div>" + html;
                    res.send(final_text);
                    return true;
                }
            });
    });

app.listen(8080, function() {
    console.log("listening to 8080");
});