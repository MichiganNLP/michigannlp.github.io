$(document).ready(function() {
    //Dynamically load people
    alert("running");
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
//</div>
function processPeople(allText) {
    alert(allText);
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');
    var lines = [];
    
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        
        if(i % 4 == 0) { //append new row
            $('#people').append('<div class="row" id="row' + i +'">);
        }

        if(data.length==headers.length) {
            $('#row' + i).append('<img src="images/' + data[1] + '" class="profile_pic" alt="' + data[2] + '">');
            $('#row' + i).append('<p class="lead"><b>' + data[2] + '</b></p>');
            $('#row' + i).append('<p class="lead">' + data[3] + '</p>');
            $('#row' + i).append('<p class="lead">' + data[4] + ' at umich.edu</p>');
        }
    }
}