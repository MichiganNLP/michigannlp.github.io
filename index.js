$(document).ready(function() {
                  

  });

jQuery(document).ready(function(){
                       $.ajax({
                              type: "GET",
                              url: "recent_news.csv",
                              dataType: "text",
                              success: function(data) {processData(data);}
                              });
                       });

//from http://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript
function processData(allText) {
    alert(allText);
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            $('#recent_news').append('<p class="recent-news-date">');
            $('#recent_news').append(data[0]);
            $('#recent_news').append('</p>');
            $('#recent_news').append('<p class="lead">');
            $('#recent_news').append(data[1]);
            $('#recent_news').append('(see more <a href="');
            $('#recent_news').append(data[2]);
            $('#recent_news').append('">here</a>)</p>');
        }
    }
}