$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/publications.csv",
        dataType: "text",
        success: function(data) {processDownloads(data,pageCategory);}
    });
});

function processDownloads(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    var categories = []; //each category has a name and a list of publications

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var publication = {title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8], pageCategory:data[9], download:data[10], downloadName:data[11], downloadDescription:data[12], downloadLink:data[13], downloadDate:data[14]};
        
        var allCats = publication.pageCategory.split(',');
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
        if(found==1 && publication.download=='TRUE') {
            var allCategories = publication.category.split(', ');
            for(var j=0; j<allCategories.length; ++j) {
                //is this category already in the categories array?
                var categoryFound = false;
                for(var k=0; k<categories.length; ++k) {
                    if(categories[k].name == allCategories[j]) {
                        categories[k].publications.push(publication);
                        categoryFound = true;
                    }
                }
                if(!categoryFound) {
                    category = {name:allCategories[j], publications:[publication]}
                    categories.push(category);
                }
            }
        }
    }
    
    for(var i=0; i<categories.length; ++i) {
        $('#downloads-outline').append('<p class="lead-nomargin"><b>'+categories[i].name+'</b></p>');
        for(var j=0; j<categories[i].publications.length; ++j) {
            publication = categories[i].publications[j];
            $('#downloads-outline').append('<p class="lead-nomargin"><a href="#' + publication.downloadName + '">' + publication.downloadName + '</a></p>');
        }
    }
}