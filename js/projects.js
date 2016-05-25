//global variables
var projects = []

$(document).ready(function() {
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/projects.csv",
        dataType: "text",
        success: function(data) {processProjects(data);}
    });
});

function processProjects(allText) {
    //http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
    strDelimiter = (",");
    
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
    );
    
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(allText)){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (strMatchedDelimiter.length &&(strMatchedDelimiter != strDelimiter)){
            arrData.push( [] );
        }
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                    "\""
                    );
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        var project = {name:data[0], people:data[1], data:data[2]};
        projects.push(project);
        $('#projects').append('<p class="lead"><a href="#">' + project.name + '</a></p>')
    }
}