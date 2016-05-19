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

        $('#recent_news').append('<p class="recent-news-date">'+data[1]+'</p>');
        $('#recent_news').append('<p class="lead">' + data[2] + ' (see more <a href="' + data[3] + '">here</a>)</p>');
    }
}