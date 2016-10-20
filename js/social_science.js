$(document).ready(function() {
    pageCategory = $('meta[name=category]').attr("content");
    
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/publications.csv",
        dataType: "text",
        success: function(data) {processPublications(data);}
    });
    
    //Dynamically load people
     $.ajax({
        type: "GET",
        url: "../data/people.csv",
        dataType: "text",
        success: function(data) {processPeople(data,pageCategory);}
    });
});

function processPublications(allText) {
    arrData = parseCsv(allText);
    
    var rowNum = -1;
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var publication = {id:i; title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8], bibtex:data[9], abstract:data[10], pageCategory:data[11], download:data[12], downloadName:data[13], downloadDescription:data[14], downloadLink:data[15], downloadDate:data[16], downloadLinkNames:data[17]};
        
        var allCats = publication.category.split(', ');
        for(var j=0; j<allCats.length; ++j) {
            if(allCats[j]=="Computational Social Science") {
                entry = showPublication(publication,true);
                $('#publications').append(entry);
            }
        }
    }
}
