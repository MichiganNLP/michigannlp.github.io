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
    
    categories.sort(compareCategories);
    
    //Outline at the top of the page
    for(var i=0; i<categories.length; ++i) {
        categories[i].publications.sort(comparePublications);
        
        if(i==0) {
            $('#downloads-outline').append('<p class="lead-nomargin"><a href="#' + categories[i].name + '"><b>'+categories[i].name+'</b></a></p>');
        } else {
            $('#downloads-outline').append('<p id="top-margin" class="lead-nomargin"><a href="#' + categories[i].name + '"><b>' +categories[i].name+'</b></a></p>');
        }
        for(var j=0; j<categories[i].publications.length; ++j) {
            publication = categories[i].publications[j];
            if(j != 0 && publication.downloadName == categories[i].publications[j-1].downloadName) {
                //duplicate, don't do anything
            } else {
                $('#downloads-outline').append('<p class="lead-nomargin">' + publication.downloadName + '</p>');
            }
        }
    }
    
    //All of the download information
    for(var i=0; i<categories.length; ++i) {
        $('#all-downloads').append('<h2 class="featurette-heading"><a name="' + categories[i].name + '">' + categories[i].name + '</a></h2>');
        
        entry = '';
        var index = 0; //keep track of how many downloads you've added
        for(var j=0; j<categories[i].publications.length; ++j) {
            publication = categories[i].publications[j];
            
            var secondPub = false;
            //Check to see if this is the same as the next download in the array (then combine the citations)
            if(j < categories[i].publications.length-1 && publication.downloadName == categories[i].publications[j+1].downloadName) {
                secondPublication = categories[i].publications[j+1];
                secondPub = true;
                
                j = j+1; //now skip the next download
            }
            
            if(index % 2 == 0) {
                if(index != 0) {
                    entry = entry + '</div>'; //end of row
                }
                entry = entry + '<div class="row">'; //start of row
            }
            
            //name
            entry = entry + '<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + publication.downloadName + '</h3></div><div class="panel-body">';
            
            //dates
            var dates = publication.downloadDate.split('; ');
            if(dates.length > 0 && dates[0]) {
                entry = entry + '<p class="lead"><em>';
            }
            for(var k=0; k<dates.length; ++k) {
                entry = entry + dates[k];
                if(k != dates.length-1 && dates[k]) {
                    entry = entry + '</br>';
                }
            }
            if(dates.length > 0 && dates[0]) {
                entry = entry + '</em></p>';
            }
            
            //description
            entry = entry + '<p class="lead">' + publication.downloadDescription;
            
            //download links
            var links = publication.downloadLink.split('; ');
            if(links.length > 0) {
                entry = entry + ' (';
            }
            for(var k=0; k<links.length; ++k) {
                entry = entry + '<a href="' + links[k] + '" target="_blank">download';
                if(links.length > 1) {
                    entry = entry + k; //number the download links
                }
                entry = entry + '</a>';
                if(k != links.length - 1) {
                    entry = entry + ', ';
                }
            }
            if(links.length > 0) {
                entry = entry + ')';
            }
            
            //citations
            if(publication.title) {
                entry = entry + showPublication(publication);
            }
            if(secondPub && secondPub.title) {
                entry = entry + showPublication(secondPublication);
            }
            
            entry = entry + '</p>';
            entry = entry + '</div></div></div>';
            
            index = index + 1;
        }
        
        entry = entry + '</div>'; //close row div
        $('#all-downloads').append(entry);
        $('#all-downloads').append('<p class="lead"><a href="#">Back to top</a></p>');
    }
}

function compareCategories(a, b) {
    if(a.name == "Other") { //Other should always be the last category
        return 1;
    }
    if(b.name == "Other") {
        return -1;
    }
    if(a.name > b.name) {
        return 1;
    } else if(a.name < b.name) {
        return -1;
    } else {
        return 0;
    }
}

function comparePublications(a, b) {
    if(a.downloadName == "Other") { //Other should always be the last category
        return 1;
    }
    if(b.downloadName == "Other") {
        return -1;
    }
    if(a.downloadName > b.downloadName) {
        return 1;
    } else if(a.downloadName < b.downloadName) {
        return -1;
    } else {
        return 0;
    }
}