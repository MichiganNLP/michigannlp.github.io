$(document).ready(function() {
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/publications.csv",
        dataType: "text",
        success: function(data) {processPublications(data);}
    });
});

//Template:
//<h2 class="featurette-heading">2016</h2>
//<p class="lead">Chai, Joyce Y., Anoop Sarkar, and Rada Mihalcea. "What’s Hot in Human Language
//Technology: Highlights from NAACL HLT 2015." Thirtieth AAAI Conference on Artificial
//Intelligence. 2016. (<a href="">pdf</a>, <a href="">demo</a>, <a href="">data</a>, <a
//href="">software</a>)</p>
function processPublications(allText) {
    alert(allText);
    
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');
    var lines = [];
    
    var years = []; //each year has a number (ie. 2016) and a list of publications
    
    var rowNum = -1;
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        
        var publication = {citation:data[1], category:data[2], link:data[3], demo:data[4], data: data[5], software:data[6]};
        
        //Is this year already in the array?
        var found = false;
        for(j=0; j<years.length; ++j) {
            if(years[j].name==data[0]) {
                found = true;
                years[j].publications.push(publication);
            }
        }
        if(!found) {
            var year = {name:data[0], publications:[publication]};
            years.push(year);
        }
    }

    for(var i=0; i<years.length; ++i) {
        $('#publications').append('<h2 class="featurette-heading">' + years[i].name + '</h2>');
        for(var j=0; j<years[i].publications.length; ++j) {
            publication = years[i].publication[j];
            var entry = '<p class="lead">' + publication.citation;
            if(publication.link != "" || publication.demo != "" || publication.data != "" || publication.software != "") {
                entry = entry + '(';
                if(publications.link != "") {
                    entry = entry + '<a href="' + publication.link + ">pdf</a>";
                    if(publications.demo != "" || publications.data != "" || publications.software != "") {
                        entry = entry + ', ';
                    }
                }
                if(publications.demo != "") {
                    entry = entry + '<a href="' + publication.demo + ">demo</a>";
                    if(publications.data != "" || publications.software != "") {
                        entry = entry + ', ';
                    }
                }
                if(publications.data != "") {
                    entry = entry + '<a href="' + publication.data + ">data</a>";
                    if(publications.software != "") {
                        entry = entry + ', ';
                    }
                }
                if(publications.software != "") {
                    entry = entry + '<a href="' + publications.software + ">software</a>";
                }
                entry = entry + ')';
            }
            entry = entry + '</p>';
            $('#publications').append(entry);
        }
    }
}