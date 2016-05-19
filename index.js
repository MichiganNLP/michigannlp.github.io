$(document).ready(function() {
     $.ajax({
        type: "GET",
        url: "recent_news.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processRecentNews(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        alert(data.length);
        alert(headers.length);
        if (data.length == headers.length) {
            $('#recent_news').append('<p class="recent-news-date">');
            $('#recent_news').append(data[1]);
            $('#recent_news').append('</p>');
            $('#recent_news').append('<p class="lead">');
            $('#recent_news').append(data[2]);
            $('#recent_news').append('(see more <a href="');
            $('#recent_news').append(data[3]);
            $('#recent_news').append('">here</a>)</p>');
        }
    }
}