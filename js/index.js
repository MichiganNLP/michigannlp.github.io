$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "data/recent_news.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data,pageCategory);}
    });

    //Dynamically load slideshow
    $.ajax({
        type: "GET",
        url: "data/slideshow.csv",
        dataType: "text",
        success: function(data) {processSlideshow(data);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processRecentNews(allText,pageCategory) {
    arrData = parseCsv(allText);

    var appended = 0; //Only append the first four recent events
    var last = false;

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];

        if (data.length == 1) {
            continue;
        }

        var news = {date:data[0], description:data[1], link:data[2], category:data[3]};

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
            var entry = '<p class="recent-news-date">' + news.date + '</p><p class="lead">' + news.description;
            if(news.link) {
                entry = entry + ' (<a href="' + news.link + '" target="_blank">link</a>)</p>';
            }
            entry = entry + '</p>';

            if(appended < 8) { //Only show the most recent entries on the home page
                $('#recent_news').append(entry);
                appended = appended + 1;
            }
        }

	//A little bit hack-y
	if(appended == 8 && !last) {
	    last = true;
    	    var pageCategory = $('meta[name=category]').attr("content");
    	    if(pageCategory == "LIT") {
                $('#recent_news').append('<p id="italics" class="lead">See more news <a href="news.html">here</a>.</p>');
            }
            if(pageCategory == "Girls Encoded") {
        	$('#recent_news').append('<p id="italics" class="lead">See more news <a href="girls_encoded_events.html">here</a>.</p>');
    	    }
	}
    }
}

function processSlideshow(allText) {
    arrData = parseCsv(allText);

    sortedArr = arrData.slice(1).sort(function (a, b) {
        return parseInt(a[2]) > parseInt(b[2]) ? 1 : -1});

    var dataAdded = 0;
    var slideshow = '';
    for (var i=0; i<sortedArr.length; i++) {
        var data = sortedArr[i];

        if (data.length != 3 || data[2].length == 0) {
            continue;
        }

        var image = {path:data[0], alt:data[1], position:parseInt(data[2])};

        if (image.position === 0) {
            slideshow += '<div class="item active"><img src="images/slideshow/' + image.path + '" alt="' + image.alt + '"></div>\n';
        } else {
            slideshow += '<div class="item"><img src="images/slideshow/' + image.path + '" alt="' + image.alt + '"></div>\n';
        }
        dataAdded++;
    }

    var indicators = '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
    for (var i=1; i<dataAdded; i++) {
        indicators += '<li data-target="#myCarousel" data-slide-to=' + i.toString() + '></li>';
    }

    $('.carousel-indicators').append(indicators);
    $('.carousel-inner').append(slideshow);
}
