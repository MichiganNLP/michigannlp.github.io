$(document).ready(function() {
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/people.csv",
        dataType: "text",
        success: function(data) {processPeople(data);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processPeople(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');
    var lines = [];
    
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        
        if(i % 4 == 0) { //append new row
            $('#people').append('<div class="row" id="row' + i +'">');
        }

        if(data.length==headers.length) {
            $('#row' + i).append('<img src="images/' + data[1] + '" class="profile_pic" alt="' + data[2] + '">');
            $('#row' + i).append('<p class="lead"><b>' + data[2] + '</b></p>');
            $('#row' + i).append('<p class="lead">' + data[3] + '</p>');
            $('#row' + i).append('<p class="lead">' + data[4] + ' at umich.edu</p>');
        }
    }
}