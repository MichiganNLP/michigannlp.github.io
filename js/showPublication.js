//Template:
//<h2 class="featurette-heading">2016</h2>
//<h2 class="featurette-heading">2016</h2>
//<p class="lead-slim"><b>What’s Hot in Human Language Technology: Highlights from NAACL HLT 2015</b>(<a href="">pdf</a>, <a href="">demo</a>, <a href="">data</a>, <a href="">software</a>)</p>
//<p class="lead-slim-indent">Joyce Y. Chai, Anoop Sarkar, Rada Mihalcea</p>
//<p class="lead-slim-indent"><em>30th AAAI Conference on Artificial Intelligence, 2016</em></p>

//@param includeDownloadLink
//  Boolean - should you link to the downloads page? (if you're already on the downloads page, no; if not, maybe?)

function showPublication(publication,includeDownloadLink) {
    var entry = '<p class="lead-slim"><b>' + publication.title + '</b>';
    if(publication.link || publication.demo || publication.data || publication.software) {
        entry = entry + ' ('
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
    entry = entry + '</p><p class="lead-slim-indent">' + publication.authors + '</p>'

    if(includeDownloadLink && publication.download=="TRUE") {
        entry = entry + '<p class="lead-slim-indent"><em>' + publication.publication + '</em></p>';
        entry = entry + '<p class="lead-slim-bottom">**More detailed resources for this paper can be found on the <a href="downloads.html">downloads</a> page.</p>';
    } else {
        entry = entry + '<p class="lead-slim-indent-bottom"><em>' + publication.publication + '</em></p>';
    }

    return entry;
}