//Template:
//<h2 class="featurette-heading">2016</h2>
//<p class="lead">Chai, Joyce Y., Anoop Sarkar, and Rada Mihalcea. "What’s Hot in Human Language
//Technology: Highlights from NAACL HLT 2015." Thirtieth AAAI Conference on Artificial
//Intelligence. 2016. (<a href="">pdf</a>, <a href="">demo</a>, <a href="">data</a>, <a
//href="">software</a>)</p>
function showPublication(publication) {
    var entry = '<p class="lead">' + publication.citation;
    if(publication.link || publication.demo || publication.data || publication.software) {
        entry = entry + ' (';
        if(publication.link) {
            entry = entry + '<a href="' + publication.link + '">pdf</a>';
            if(publication.demo || publication.data || publication.software) {
                entry = entry + ', ';
            }
        }
        if(publication.demo) {
            entry = entry + '<a href="' + publication.demo + '">demo</a>';
            if(publication.data || publication.software) {
                entry = entry + ', ';
            }
        }
        if(publication.data) {
            entry = entry + '<a href="' + publication.data + '">data</a>';
            if(publication.software) {
                entry = entry + ', ';
            }
        }
        if(publication.software) {
            entry = entry + '<a href="' + publication.software + '">software</a>';
        }
        entry = entry + ')';
    }
    entry = entry + '</p>';

    return entry;
}