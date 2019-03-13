$(document).ready(function() {
    pageCategory = $('meta[name=category]').attr("content");
    
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/publications.csv",
        dataType: "text",
        success: function(data) {processPublications(data);}
    });
});

function processPublications(allText) {
    arrData = parseCsv(allText);
    
    var rowNum = -1;
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
		var publication = {id:i, title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8], bibtex:data[9], abstract:data[10], poster:data[11], posterTitle:data[12],posterAuthors:data[13], posterConference:data[14], posterYear:data[15], posterLocation:data[16], pageCategory:data[17], download:data[18], downloadName:data[19], downloadDescription:data[20], downloadLink:data[21], downloadDate:data[22], downloadLinkNames:data[23], new:data[24], notes:data[25]};
        
        var allCats = publication.category.split(', ');
        for(var j=0; j<allCats.length; ++j) {
            if(allCats[j]=="MuSeNet") {
                entry = showPublication(publication,true);
                $('#musenet-publications').append(entry);
            }
        }
    }
}
