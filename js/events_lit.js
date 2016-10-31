allMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];

$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/recent_news.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data,pageCategory);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processRecentNews(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    var dates = []; //each date has a month (integer), a year, and a list of news events (news)
        
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var news = {date:data[0], description:data[1], link:data[2], category:data[3]};

	if(!news.description) {
	    continue;
	}	

        var allCats = news.category.split(',');
        var found = 0;
        //Is the document category in this array?
        for(var j=0; j<allCats.length; j++) {
            if(allCats[j][0]==' ') {
                allCats[j] = allCats[j].substr(1);
            }
            if(pageCategory==allCats[j]) {
                found = 1;
                break;
            }
        }
        if(found==1) {
            var news_date = news.date.split('/');
            var currentMonth = news_date[0];
            var currentYear = news_date[2];
            
            //is this month and year already in the dates array?
            var dateFound = false;
            for(var j=0; j<dates.length; j++) {
                if(dates[j].month == currentMonth && dates[j].year == currentYear) {
                    dates[j].news.push(news);
                    dateFound = true;
                    break;
                }
            }
            if(!dateFound) {
                var date = {month:currentMonth, year:currentYear, news:[news]};
                dates.push(date);
            }
        }
    }
    
    for(var j=0; j<dates.length; j++) {
        $('#lit_events_recent_news').append('<h2 class="featurette-heading">' + allMonths[dates[j].month-1] + ' ' + dates[j].year + '</h2>');
        for (var k=0; k<dates[j].news.length; k++) {
            news = dates[j].news[k];
            
            var entry = '<p class="recent-news-date">' + news.date + '</p><p class="lead">' + news.description;
            if(news.link) {
                entry = entry + ' (<a href="' + news.link + '">link</a>)</p>';
            }
            entry = entry + '</p>';
        
            $('#lit_events_recent_news').append(entry);
        }
    }
}
