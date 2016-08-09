$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/reading_group.csv",
        dataType: "text",
        success: function(data) {processReadingGroup(data,pageCategory);}
    });
});

function processReadingGroup(allText,pageCategory) {
    arrData = parseCsv(allText);

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var event = {date:data[0], time:data[1], presenters:data[2], presentersWebsites:data[3], paperAuthors:data[4], paperTitles:data[5], paperConferences:data[6], paperLinks:data[7], slides:data[8], location:data[9], category:data[10]};

        var allCats = event.category.split(',');
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
            //date/time
            var entry = '<tr><td><p class="lead">' + event.date + '<br />' + event.time + '</p></td>';
            
            //presenters
            var presenters = event.presenters.split('; ');
            var presentersWebsites = event.presentersWebsites.split('; ');
            alert(presenters)
            alert(presentersWebsites)

            entry = entry + '<td class="centered"><p class="lead">';
            for(var j=0; j<presenters.length; ++j) {
                if(presentersWebsites[j]) {
                    entry = entry + '<a href="' + presentersWebsites[j] + '" target="_blank">' + presenters[j] + '</a>';
                } else {
                    entry = entry + presenters[j];
                }
                if(j != presenters.length - 1) {
                    entry = entry + ', ';
                }
            }
            entry = entry + '</p></td>';
            
            //papers
            paperAuthors = event.paperAuthors.split('; ');
            paperTitles = event.paperTitles.split('; ');
            paperConferences = event.paperConferences.split('; ');
            paperLinks = event.paperLinks.split('; ');
            slides = event.slides.split('; ');
            
            entry = entry + '<td class="centered"><p class="lead">';
            for(var j=0; j<paperAuthors.length; ++j) {
                entry = entry + paperAuthors[j] + '. "';
                if(paperLinks[j]) {
                    entry = entry + '<a href="' + paperLinks[j] + '" target="_blank">' + paperTitles[j] + '</a>" ';
                } else {
                    entry = entry + paperTitles[j] + '" ';
                }
                entry = entry + paperConferences[j] + '.'
                if((slides.length > 1 && paperAuthors.length > 1) ||
                   (slides.length == 1 && j == paperAuthors.length - 1)) {
                    entry = entry + ' [<a href="' + slides[j] + '" target="_blank">slides</a>]'
                }
                if(j != paperAuthors.length-1) {
                    entry = entry + '<br />';
                }
            }
            entry = entry + '</p></td>';
            
            //location
            entry = entry + '<td class="centered"><p class="lead">' + event.location + '</p></td></tr>';
            
            $('#reading-group-tbody').append(entry);
        }
    }
}