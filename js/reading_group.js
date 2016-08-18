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
    
    var semesters = []; //each semester has a name and a list of events

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var event = {date:data[0], time:data[1], presenters:data[2], presentersWebsites:data[3], paperAuthors:data[4], paperTitles:data[5], paperConferences:data[6], paperLinks:data[7], slides:data[8], location:data[9], category:data[10], semester:data[11]};

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
            //Is this semester already in the array?
            var found = false;
            for(var j=0; j<semesters.length; j++) {
                if(semesters[j].name==event.semester) {
                    found = true;
                    semesters[j].events.push(event);
                    break;
                }
            }
            if(!found) {
                var semester = {name:event.semester, events:[event]};
                semesters.push(semester);
            }
            
        }
    }
    
    //sort the semester list
    semesters.sort(compareSemesters);
    
    //now display all of the semester information
    for(var i=0; i<semesters.length; ++i) {
        $('#reading-group').append('<h2 class="featurette-heading">' + semesters[i].name + '</h2>');
        var entry = '<table id="reading-group-table"><tbody id="reading-group-tbody"><tr><th id="col1" class><p class="lead"><b>Date / Time</b></p></th><th id="col2" class="centered"><p class="lead"><b>Presenter</b></p></th><th id="col3" class="centered"><p class="lead"><b>Paper</b></p></th><th id="col4" class="centered"><p class="lead"><b>Location</b></p></th></tr>'

        for(var j=0; j<semesters[i].events.length; ++j) {
            event = semesters[i].events[j];
            
            //date/time
            entry = entry + '<tr><td><p class="lead">' + event.date + '<br />' + event.time + '</p></td>';
            
            //presenters
            var presenters = event.presenters.split('; ');
            var presentersWebsites = event.presentersWebsites.split('; ');

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
                if(slides.length > 1 && paperAuthors.length > 1) {
                    entry = entry + ' [<a href="' + slides[j] + '" target="_blank">slides</a>]';
                }
                if(slides.length == 1 && j == paperAuthors.length-1 && slides[0]) {
                    entry = entry + ' [<a href="' + slides[0] + '" target="_blank">slides</a>]';
                }
                if(j != paperAuthors.length-1) {
                    entry = entry + '<br />';
                }
            }
            entry = entry + '</p></td>';
            
            //location
            entry = entry + '<td class="centered"><p class="lead">' + event.location + '</p></td></tr>';
        }
        
        entry = entry + '</tbody></table>';
        $('#reading-group').append(entry);
    }
}

function compareSemesters(a, b) {
    a_components = a.name.split(' ');
    b_components = b.name.split(' ');
    
    //If the years are different, show the most recent year first
    if(a_components[1] != b_components[1]) {
        return a_components[1] - b_components[1];
    } else if(a_components[1] == "Winter") {
        return -1;
    } else if(a_components[1] == "Spring") {
        return 1;
    } else {
        return 0;
    }
}