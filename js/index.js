$(document).ready(function() {
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/recent_news.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processRecentNews(allText) {
    arrData = parseCsv(allText);
    
    var rowNum = -1;
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];

        $('#recent_news').append('<p class="recent-news-date">' + data[1] + '</p>');
        $('#recent_news').append('<p class="lead">' + data[2] + ' (see more <a href="' + data[3] + '">here</a>)</p>');
    }
}