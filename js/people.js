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
//<div class="col-md-3">
//<img src="images/laura.jpg" class="profile_pic" alt="Laura Wendlandt">
//<p class="lead"><b>Laura Wendlandt</b></p>
//<p class="lead">PhD Student, Computer Science and Engineering</p>
//<p class="lead">wenlaura at umich.edu</p>
//<div>
function processPeople(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');
    var lines = [];
    
    var rowNum = -1;
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        
        if(i % 4 == 0) { //append new row
            rowNum = rowNum + 1;
            $('#people').append('<div class="row" id="row' + rowNum +'">');
        }

        if(data.length==headers.length) {
            $('#row' + rowNum).append('<div class="col-md-3"><img src="images/'+ data[1] + '" class="profile_pic" alt="' + data[2] + '">' +
                '<p class="lead"><b>' + data[2] + '</b></p>' + '<p class="lead">' + data[3] + '</p>' +
                '<p class="lead">' + data[4] + ' at umich.edu</p>' + '</div>');
        }
    }
}