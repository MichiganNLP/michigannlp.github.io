$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/workshops_conferences.csv",
        dataType: "text",
        success: function(data) {processConferences(data,pageCategory);}
    });
});

function processConferences(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    conferences = [];
    workshops = [];
        
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var event = {name:data[0], longName:data[1], link:data[2], location:data[3], date:data[4], type:data[5], category:data[6]};

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
            if(event.type=="Conference") {
                conferences.push(event);
            }
            if(event.type=="Workshop") {
                workshops.push(event);
            }
        }
    }
    
    for(var i=0; i<conferences.length; ++i) {
        var entry = '<li><p class="lead"><a href="' + conferences[i].link + '">' + conferences[i].name + '</a>: ' + conferences[i].longName + ' (' + conferences[i].location + ', ' + conferences[i].date + ')</p></li>';
        $('#conferences').append(entry);
    }
    for(var i=0; i<workshops.length; ++i) {
        var entry = '<li><p class="lead"><a href="' + workshops[i].link + '">' + workshops[i].name + '</a>: ' + workshops[i].longName + ' (' + workshops[i].location + ', ' + workshops[i].date + ')</p></li>';
        $('#workshops').append(entry);
    }
}