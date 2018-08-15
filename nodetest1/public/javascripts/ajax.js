var bodyParser = require('body-parser');
var express    = require('express');
var lineReader = require('line-reader');

var name = 'ajax';

// Create the app.
var app = express();

// Use the bodyParser() middleware for all routes.
app.use(bodyParser());

// Access the current directory for static files.
app.use(express.static(__dirname));

// Read and send the HTML file.
app.get('/ajax.html', 
    function(req, res)
    {
        var html = '';
        lineReader.eachLine('ajax.html',
            function(line, last)
            {
                html += line + '\n';

                if (last) 
                { 
                    res.send(html);
                    return false; 
                }
                else
                {
                    return true;
                }
            });
    });

// Process the form data and send a response.
app.get('/ajax-response', 
    function(req, res)
    {
        var html = '';
        var text=document.getElementById("textarea").value;
        lineReader.eachLine("W3.CSS Template.html",
            function(line, last)
            {
                html += line + '<br>';
                
                if (last) 
                { 
                    res.send(html);
                    return false; 
                }
                else
                {
                    var final_text = "<div>"+text+"</div>"+html;
                    res.send(final_text);
                    return true;
                }
            });
    });

app.listen(8080);