//global variables
var pageCategory; //the category of the page (ie. LIT, Girls Encoded)

$(document).ready(function() {
    pageCategory = $('meta[name=category]').attr("content");
    
    //Dynamically load people
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
    arrData = parseCsv(allText);
    
    var rowNum = -1;
    var entriesAdded = 0;
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
    
        var person = {image:data[0], name:data[1], description:data[2], uniqname:data[3], link:data[4], category:data[5]};

        var allCats = person.category.split(',');
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
            entry = '<div class="col-md-3"><img src="images/'+ person.image + '" class="profile_pic" alt="' + person.name + '"><p class="lead"><b>';
            if(person.link) {
                entry = entry + '<a href="' + person.link + '">' + person.name + '</a>';
            } else {
                entry = entry + person.name;
            }
            entry = entry + '</b></p>' + '<p class="lead">' + person.description + '</p><p class="lead">' + person.uniqname + ' at umich.edu</p>' + '</div>';
            
            entriesAdded = entriesAdded + 1;
            if(entriesAdded % 4 == 1) { //append new row
                rowNum = rowNum + 1;
                $('#people').append('<div class="row" id="row' + rowNum +'">');
            }
            
            $('#row' + rowNum).append(entry);
        }
    }
}