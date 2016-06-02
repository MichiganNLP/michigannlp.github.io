//global variables
var category; //the category of the page (ie. LIT, Girls Encoded)

$(document).ready(function() {
    category = $('meta[name=category]').attr("content");

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
        
        var news = {date:data[0], description:data[1], link:data[2], category:data[3]};

        var allCats = news.category.split(',');
        var found = 0;
        //Is the document category in this array?
        for(var j=0; j<allCats.length; j++) {
            if(allCats[j][0]==' ') {
                allCats[j] = allCats[j].substr(1);
            }
            if(category==allCats[j]) {
                found = 1;
                break;
            }
        }
        if(found==1) {
            alert("it's a match!");
            var entry = '<p class="recent-news-date">' + news.date + '</p><p class="lead">' + news.description;
            if(news.link) {
                entry = entry + ' (see more <a href="' + news.link + '">here</a>)</p>';
            }
            entry = entry + '</p>';
        
            $('#recent_news').append(entry);
        }
    }
}