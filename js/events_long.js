$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/events.csv",
        dataType: "text",
        success: function(data) {processEvents(data,pageCategory);}
    });
});

//TEMPLATE:
//<div class="row">
//    <div class="col-sm-6">
//        <div class="panel panel-default">
//        <div class="panel-heading">
//        <h3 class="panel-title">CS KickStart</h3>
//        </div>
//        <div class="panel-body">
//        <img id="events-left-image" src="images/cskickstart.png" alt="CS Kickstart Logo">
//         Description
//        </div>
//        </div>
//    </div>
//
//    <div class="col-sm-6">
//        <div class="panel panel-default">
//        <div class="panel-heading">
//        <h3 class="panel-title">GEECS</h3>
//        </div>
//        <div class="panel-body">
//        <img id="events-left-image" src="images/geecs.png" alt="gEECS Logo">
//         Description
//        </div>
//        </div>
//    </div>
//</div>
function processEvents(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    var added = 0;
    var entry = "";
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var event = {title:data[0], description:data[1], image:data[2], image_alt:data[3], category:data[4]};

        var allCats = event.category.split(',');
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
            if(added % 2 == 0) {
                if(added != 0) {
                    entry = entry + '</div>'; //end row
                }
                entry = entry + '<div class="row">'; //start row
            }
        
            entry = entry + '<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + event.title + '</h3></div><div class="panel-body">'
            if(event.image) {
                entry = entry + '<img id="events-left-image" src="images/' + event.image + '" alt="' + event.image_alt + '">';
            }
            entry = entry + event.description + '</div></div></div>';
            
            added = added + 1;
        }
    }
    
    entry = entry + '</div>'; //end row
    $('#event_panels').append(entry);
}