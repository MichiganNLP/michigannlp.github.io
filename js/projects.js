$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/projects.csv",
        dataType: "text",
        success: function(data) {processProjects(data,pageCategory);}
    });
});

function processProjects(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    var current = [];
    var past = [];

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var project = {name:data[0], description:data[1], link:data[2], newTab:data[3], current:data[4], category:data[5]};
        
        var allCats = project.category.split(',');
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
            if(project.current=="TRUE") {
                current.push(project);
            } else {
                past.push(project);
            }
        }
    }
    
    entry = '';
    for(var i=0; i<current.length; ++i) {
        if(i % 2 == 0) {
            if(i != 0) {
                entry = entry + '</div>'; //end of row
            }
            entry = entry + '<div class="row">'; //start of row
        }
            
        entry = entry + '<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + current[i].name + '</h3></div><div class="panel-body"><p class="lead">' + current[i].description + '</p>';
        if(current[i].link && current[i].newTab=='TRUE') {
            entry = entry + '<p class="lead">Please see more <a href="' + current[i].link + '" target="_blank">here</a>.</p>';
        }
        if(current[i].link && current[i].newTab!='TRUE') {
            entry = entry + '<p class="lead">Please see more <a href="' + current[i].link + '">here</a>.</p>';
        }
        
        entry = entry + '</div></div></div>';
    }
    entry = entry + '</div>'; //close row div
    $('#current-projects').append(entry);
    
    entry = '';
    for(var i=0; i<past.length; ++i) {
        if(i % 2 == 0) {
            if(i != 0) {
                entry = entry + '</div>'; //end of row
            }
            entry = entry + '<div class="row">'; //start of row
        }
            
        entry = entry + '<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + past[i].name + '</h3></div><div class="panel-body"><p class="lead">' + past[i].description + '</p>';
        if(past[i].link && past[i].newTab=='TRUE') {
            entry = entry + '<p class="lead">Please see more <a href="' + past[i].link + '" target="_blank">here</a>.</p>';
        }
        if(past[i].link && past[i].newTab!='TRUE') {
            entry = entry + '<p class="lead">Please see more <a href="' + past[i].link + '">here</a>.</p>';
        }
        
        entry = entry + '</div></div></div>';
    }
    entry = entry + '</div>'; //close row div
    $('#past-projects').append(entry);
}